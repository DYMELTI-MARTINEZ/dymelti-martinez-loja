// Funcionalidades principais da loja DYMELTI MARTINEZ

// Inicialização quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Carregar produtos na página
    renderProducts();
    
    // Carregar carrinho salvo (se existir)
    loadCartFromStorage();
    
    // Inicializar navegação suave
    initSmoothScrolling();
    
    // Inicializar funcionalidades mobile
    initMobileFeatures();
    
    // Inicializar lazy loading para imagens
    initLazyLoading();
    
    console.log('🛍️ DYMELTI MARTINEZ - Loja Virtual carregada com sucesso!');
});

// Navegação suave entre seções
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Funcionalidades para dispositivos móveis
function initMobileFeatures() {
    // Menu mobile (se necessário no futuro)
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    // Header que esconde/mostra ao rolar (opcional)
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Otimizar cliques em dispositivos touch
    document.addEventListener('touchstart', function() {}, { passive: true });
}

// Lazy loading para imagens
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        // Observar todas as imagens com loading="lazy"
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Função para alternar tema (futuro)
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

// Carregar tema salvo
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Função para compartilhar produto
function shareProduct(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const shareData = {
        title: `${product.name} - DYMELTI MARTINEZ`,
        text: product.description,
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData);
    } else {
        // Fallback para navegadores que não suportam Web Share API
        const shareText = `Confira este produto da DYMELTI MARTINEZ: ${product.name} - ${window.location.href}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText);
            showNotification('Link copiado para área de transferência!');
        } else {
            // Fallback ainda mais antigo
            const textarea = document.createElement('textarea');
            textarea.value = shareText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showNotification('Link copiado para área de transferência!');
        }
    }
}

// Função para adicionar aos favoritos (futuro)
function toggleFavorite(productId) {
    let favorites = JSON.parse(localStorage.getItem('dymelti_favorites') || '[]');
    
    const index = favorites.indexOf(productId);
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('Removido dos favoritos!');
    } else {
        favorites.push(productId);
        showNotification('Adicionado aos favoritos!');
    }
    
    localStorage.setItem('dymelti_favorites', JSON.stringify(favorites));
    updateFavoriteButtons();
}

// Atualizar botões de favoritos
function updateFavoriteButtons() {
    const favorites = JSON.parse(localStorage.getItem('dymelti_favorites') || '[]');
    
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const productId = parseInt(btn.dataset.productId);
        const isFavorite = favorites.includes(productId);
        
        btn.classList.toggle('active', isFavorite);
        btn.innerHTML = isFavorite ? 
            '<i class="fas fa-heart"></i>' : 
            '<i class="far fa-heart"></i>';
    });
}

// Função para tracking de analytics (futuro)
function trackEvent(eventName, eventData) {
    // Aqui você pode integrar com Google Analytics, Facebook Pixel, etc.
    console.log(`Analytics Event: ${eventName}`, eventData);
    
    // Exemplo para Google Analytics (se configurado)
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Função para otimizar performance
function optimizePerformance() {
    // Preload das imagens importantes
    const preloadImages = [
        'public/logo.png',
        'public/banner.jpg'
    ];
    
    preloadImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // Lazy loading para elementos não críticos
    const lazyElements = document.querySelectorAll('.lazy-element');
    
    if ('IntersectionObserver' in window) {
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    elementObserver.unobserve(entry.target);
                }
            });
        });
        
        lazyElements.forEach(el => elementObserver.observe(el));
    }
}

// Função para verificar conexão com internet
function checkConnection() {
    if (!navigator.onLine) {
        showNotification('Sem conexão com internet. Algumas funcionalidades podem não funcionar.');
    }
}

// Event listeners para conexão
window.addEventListener('online', () => {
    showNotification('Conexão restaurada!');
});

window.addEventListener('offline', () => {
    showNotification('Conexão perdida. Trabalhando offline.');
});

// Função para validar formulários (futuro)
function validateForm(formData) {
    const errors = [];
    
    // Validações básicas
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Email inválido');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para formatar preço
function formatPrice(price) {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
}

// Função para formatar telefone
function formatPhone(phone) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

// Função para debounce (otimização de performance)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Função para throttle (limitação de execução)
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Animações de entrada para elementos
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

// Função para lidar com erros de imagem
function handleImageError(img) {
    img.style.display = 'none';
    
    // Criar placeholder
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.style.cssText = `
        width: 100%;
        height: 200px;
        background: var(--light-gray);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--dark-gray);
        font-size: 3rem;
        border-radius: 8px;
    `;
    placeholder.innerHTML = '<i class="fas fa-image"></i>';
    
    img.parentNode.insertBefore(placeholder, img);
}

// Configurar todos os event listeners de imagem
function setupImageErrorHandling() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => handleImageError(img));
    });
}

// Função para scroll suave para o topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Criar botão de voltar ao topo
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gradient);
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    button.addEventListener('click', scrollToTop);
    document.body.appendChild(button);
    
    // Mostrar/ocultar baseado no scroll
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    }, 100));
}

// Função para inicializar todas as funcionalidades
function initializeAll() {
    optimizePerformance();
    checkConnection();
    setupImageErrorHandling();
    animateOnScroll();
    createBackToTopButton();
    loadSavedTheme();
}

// Executar inicialização após DOM carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    initializeAll();
}

// Service Worker para cache (futuro)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado com sucesso:', registration);
            })
            .catch(error => {
                console.log('Falha no registro do SW:', error);
            });
    });
}

// Exportar funções globais necessárias
window.toggleCart = toggleCart;
window.closeProductModal = closeProductModal;
window.finalizarPedido = finalizarPedido;
window.shareProduct = shareProduct;
window.toggleFavorite = toggleFavorite;
window.scrollToTop = scrollToTop;