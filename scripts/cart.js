// Sistema de carrinho de compras
let cart = [];

// Função para adicionar produto ao carrinho
function addToCart(product) {
    // Verificar se o produto já existe no carrinho com as mesmas especificações
    const existingItem = cart.find(item => 
        item.id === product.id && 
        item.selectedSize === product.selectedSize && 
        item.selectedColor === product.selectedColor
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            selectedSize: product.selectedSize,
            selectedColor: product.selectedColor,
            selectedColorValue: product.selectedColorValue,
            quantity: 1
        });
    }

    updateCartUI();
    showNotification('Produto adicionado ao carrinho!');
}

// Função para remover produto do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    showNotification('Produto removido do carrinho!');
}

// Função para atualizar a interface do carrinho
function updateCartUI() {
    updateCartCount();
    updateCartItems();
    updateCartTotal();
}

// Função para atualizar o contador do carrinho
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (!cartCount) return;

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Mostrar/ocultar contador baseado na quantidade
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Função para atualizar os itens do carrinho
function updateCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--dark-gray);">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <p>Seu carrinho está vazio</p>
                <p style="font-size: 0.9rem;">Adicione produtos para começar suas compras!</p>
            </div>
        `;
        return;
    }

    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-details">
                    Tamanho: ${item.selectedSize} | Cor: ${item.selectedColor}
                </div>
                <div class="cart-item-details">
                    Quantidade: ${item.quantity}
                </div>
                <div class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });
}

// Função para atualizar o total do carrinho
function updateCartTotal() {
    const cartTotalElement = document.getElementById('cart-total');
    if (!cartTotalElement) return;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = total.toFixed(2).replace('.', ',');
}

// Função para alternar a visibilidade do carrinho
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    if (!cartModal) return;

    const isVisible = cartModal.style.display === 'block';
    
    if (isVisible) {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    } else {
        cartModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        updateCartUI(); // Atualizar carrinho ao abrir
    }
}

// Função para finalizar pedido via WhatsApp
function finalizarPedido() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    // Gerar mensagem para WhatsApp
    let mensagem = '*🛍️ NOVO PEDIDO - DYMELTI MARTINEZ*\n\n';
    mensagem += '*📋 PRODUTOS:*\n';
    
    cart.forEach((item, index) => {
        mensagem += `${index + 1}. *${item.name}*\n`;
        mensagem += `   • Tamanho: ${item.selectedSize}\n`;
        mensagem += `   • Cor: ${item.selectedColor}\n`;
        mensagem += `   • Quantidade: ${item.quantity}\n`;
        mensagem += `   • Preço: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n\n`;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    mensagem += `*💰 TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
    mensagem += '*💳 PAGAMENTO:* Via WhatsApp + Frete\n\n';
    mensagem += '*📦 Aguardo informações sobre entrega!*';

    // Codificar mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Número do WhatsApp (remover caracteres especiais)
    const whatsappNumber = '5562998806950';
    
    // Gerar link do WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${mensagemCodificada}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Mostrar confirmação
    showNotification('Redirecionando para WhatsApp...');
    
    // Limpar carrinho após envio (opcional)
    setTimeout(() => {
        if (confirm('Pedido enviado! Deseja limpar o carrinho?')) {
            clearCart();
        }
    }, 2000);
}

// Função para limpar o carrinho
function clearCart() {
    cart = [];
    updateCartUI();
    toggleCart(); // Fechar carrinho
    showNotification('Carrinho limpo!');
}

// Função para mostrar notificações
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gradient);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: bold;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;

    // Adicionar animação CSS
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Remover notificação após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Função para salvar carrinho no localStorage (opcional, mas útil)
function saveCartToStorage() {
    try {
        localStorage.setItem('dymelti_cart', JSON.stringify(cart));
    } catch (error) {
        console.log('Erro ao salvar carrinho:', error);
    }
}

// Função para carregar carrinho do localStorage (opcional)
function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('dymelti_cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartUI();
        }
    } catch (error) {
        console.log('Erro ao carregar carrinho:', error);
        cart = [];
    }
}

// Função para calcular desconto (para futuras promoções)
function applyDiscount(discountPercent) {
    if (cart.length === 0) return;

    cart.forEach(item => {
        item.originalPrice = item.originalPrice || item.price;
        item.price = item.originalPrice * (1 - discountPercent / 100);
    });

    updateCartUI();
    showNotification(`Desconto de ${discountPercent}% aplicado!`);
}

// Função para remover desconto
function removeDiscount() {
    cart.forEach(item => {
        if (item.originalPrice) {
            item.price = item.originalPrice;
            delete item.originalPrice;
        }
    });

    updateCartUI();
    showNotification('Desconto removido!');
}

// Event listeners para fechar modais clicando fora
document.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cart-modal');
    const productModal = document.getElementById('product-modal');
    
    // Fechar carrinho se clicar fora dele
    if (event.target === cartModal) {
        toggleCart();
    }
    
    // Fechar modal de produto se clicar fora dele
    if (event.target === productModal) {
        closeProductModal();
    }
});

// Event listener para tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const cartModal = document.getElementById('cart-modal');
        const productModal = document.getElementById('product-modal');
        
        if (cartModal && cartModal.style.display === 'block') {
            toggleCart();
        }
        
        if (productModal && productModal.style.display === 'block') {
            closeProductModal();
        }
    }
});

// Salvar carrinho sempre que houver mudanças
const originalAddToCart = addToCart;
const originalRemoveFromCart = removeFromCart;

// Sobrescrever funções para incluir salvamento automático
window.addToCart = function(product) {
    originalAddToCart(product);
    saveCartToStorage();
};

window.removeFromCart = function(index) {
    originalRemoveFromCart(index);
    saveCartToStorage();
};