// Dados dos produtos (em uma aplicação real, viria de uma API)
const products = [
    {
        id: 1,
        name: "Vestido Elegante",
        description: "Vestido longo em tecido premium com detalhes exclusivos",
        price: 299.90,
        images: ["https://via.placeholder.com/400x400/8b5cf6/ffffff?text=Vestido+1"],
        sizes: ["P", "M", "G", "GG"],
        colors: ["Preto", "Azul", "Roxo"],
        available: true
    },
    {
        id: 2,
        name: "Blusa Casual",
        description: "Blusa confortável perfeita para o dia a dia",
        price: 159.90,
        images: ["https://via.placeholder.com/400x400/3b82f6/ffffff?text=Blusa+1"],
        sizes: ["P", "M", "G"],
        colors: ["Branco", "Preto", "Azul"],
        available: true
    },
    {
        id: 3,
        name: "Saia Premium",
        description: "Saia midi com tecido de alta qualidade",
        price: 199.90,
        images: ["https://via.placeholder.com/400x400/1e1b4b/ffffff?text=Saia+1"],
        sizes: ["P", "M", "G", "GG"],
        colors: ["Preto", "Marinho"],
        available: false
    },
    {
        id: 4,
        name: "Conjunto Moderno",
        description: "Conjunto duas peças com design contemporâneo",
        price: 399.90,
        images: ["https://via.placeholder.com/400x400/8b5cf6/ffffff?text=Conjunto+1"],
        sizes: ["P", "M", "G"],
        colors: ["Preto", "Roxo", "Azul"],
        available: true
    }
];

// Estado do carrinho
let cart = [];

// Renderizar produtos
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}" onerror="this.style.display='none'">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                <div class="product-actions">
                    ${product.available ? 
                        `<button class="btn btn-primary" onclick="event.stopPropagation(); quickAddToCart(${product.id})">Adicionar</button>` :
                        `<button class="btn" disabled>Indisponível</button>`
                    }
                    <button class="btn btn-secondary" onclick="event.stopPropagation(); openProductModal(${product.id})">Ver Detalhes</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Adicionar produto ao carrinho rapidamente
function quickAddToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.available) return;

    const cartItem = {
        id: Date.now(),
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: product.sizes[0],
        color: product.colors[0],
        quantity: 1
    };

    cart.push(cartItem);
    updateCartUI();
    showNotification('Produto adicionado ao carrinho!');
}

// Abrir modal do produto
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="modal-product-images">
            <div class="modal-main-image">
                <img src="${product.images[0]}" alt="${product.name}" id="mainImage">
            </div>
            <div class="modal-image-thumbnails">
                ${product.images.map((img, index) => `
                    <div class="modal-thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${img}', this)">
                        <img src="${img}" alt="Imagem ${index + 1}">
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="modal-product-info">
            <h3>${product.name}</h3>
            <p class="modal-product-description">${product.description}</p>
            <div class="modal-product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
            
            ${product.available ? `
                <div class="product-options">
                    <div class="option-group">
                        <label class="option-label">Tamanho:</label>
                        <div class="option-buttons">
                            ${product.sizes.map(size => `
                                <button class="option-btn" onclick="selectOption(this, 'size')" data-value="${size}">${size}</button>
                            `).join('')}
                        </div>
                    </div>
                    <div class="option-group">
                        <label class="option-label">Cor:</label>
                        <div class="option-buttons">
                            ${product.colors.map(color => `
                                <button class="option-btn" onclick="selectOption(this, 'color')" data-value="${color}">${color}</button>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary" style="width: 100%; padding: 15px; font-size: 18px;" onclick="addToCartFromModal(${product.id})">
                    Adicionar ao Carrinho
                </button>
            ` : `
                <button class="btn" disabled style="width: 100%; padding: 15px; font-size: 18px;">
                    Produto Indisponível
                </button>
            `}
        </div>
    `;

    // Selecionar primeira opção de cada tipo
    setTimeout(() => {
        const firstSizeBtn = modalBody.querySelector('[data-value="' + product.sizes[0] + '"]');
        const firstColorBtn = modalBody.querySelector('[data-value="' + product.colors[0] + '"]');
        if (firstSizeBtn) firstSizeBtn.click();
        if (firstColorBtn) firstColorBtn.click();
    }, 100);

    modal.classList.add('open');
}

// Fechar modal do produto
function closeProductModal() {
    document.getElementById('productModal').classList.remove('open');
}

// Alterar imagem principal
function changeMainImage(src, thumbnail) {
    document.getElementById('mainImage').src = src;
    document.querySelectorAll('.modal-thumbnail').forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
}

// Selecionar opção
function selectOption(button, type) {
    const group = button.parentElement;
    group.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

// Adicionar ao carrinho do modal
function addToCartFromModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.available) return;

    const selectedSize = document.querySelector('.option-btn.selected[data-value]')?.dataset.value || product.sizes[0];
    const selectedColor = document.querySelector('.option-btn.selected[data-value]:not([data-value="' + selectedSize + '"])')?.dataset.value || product.colors[0];

    const cartItem = {
        id: Date.now(),
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor,
        quantity: 1
    };

    cart.push(cartItem);
    updateCartUI();
    closeProductModal();
    showNotification('Produto adicionado ao carrinho!');
}

// Toggle carrinho
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
}

// Atualizar UI do carrinho
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Atualizar contador
    cartCount.textContent = cart.length;

    // Atualizar itens
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        cartTotal.textContent = '0,00';
        checkoutBtn.disabled = true;
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-details">Tamanho: ${item.size} | Cor: ${item.color}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remover</button>
                </div>
            </div>
        </div>
    `).join('');

    // Calcular total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2).replace('.', ',');
    checkoutBtn.disabled = false;
}

// Atualizar quantidade
function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(itemId);
        return;
    }

    updateCartUI();
}

// Remover do carrinho
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
    showNotification('Produto removido do carrinho!');
}

// Finalizar pedido
function checkout() {
    if (cart.length === 0) return;

    let message = '*PEDIDO DYMELTI MARTINEZ*\n\n';
    message += '*Produtos:*\n';
    
    cart.forEach(item => {
        message += `• ${item.name}\n`;
        message += `  Tamanho: ${item.size} | Cor: ${item.color}\n`;
        message += `  Quantidade: ${item.quantity}\n`;
        message += `  Preço: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n\n`;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `*Total: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
    message += '*Forma de Pagamento:* Via WhatsApp + Frete\n\n';
    message += 'Gostaria de finalizar este pedido!';

    const whatsappUrl = `https://wa.me/5562998806950?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Mostrar notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #10b981, #059669);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: bold;
        transform: translateX(100%);
        transition: transform 0.3s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Fechar modal ao clicar fora
document.getElementById('productModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeProductModal();
    }
});

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartUI();
});

// Fechar carrinho com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const cartSidebar = document.getElementById('cartSidebar');
        const productModal = document.getElementById('productModal');
        
        if (cartSidebar.classList.contains('open')) {
            toggleCart();
        }
        if (productModal.classList.contains('open')) {
            closeProductModal();
        }
    }
});