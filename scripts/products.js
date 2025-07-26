// Dados dos produtos da loja
const products = [
    {
        id: 1,
        name: "Vestido Elegante",
        description: "Vestido elegante perfeito para ocasiões especiais. Feito com tecido de alta qualidade e acabamento impecável.",
        price: 129.90,
        images: [
            "https://via.placeholder.com/400x400/6b46c1/ffffff?text=Vestido+1",
            "https://via.placeholder.com/400x400/3b82f6/ffffff?text=Vestido+2",
            "https://via.placeholder.com/400x400/a78bfa/ffffff?text=Vestido+3"
        ],
        sizes: ["P", "M", "G", "GG"],
        colors: [
            { name: "Roxo", value: "#6b46c1" },
            { name: "Azul", value: "#3b82f6" },
            { name: "Preto", value: "#1f2937" }
        ],
        available: true,
        category: "vestidos"
    },
    {
        id: 2,
        name: "Blusa Casual",
        description: "Blusa casual confortável para o dia a dia. Combina com qualquer look e proporciona muito conforto.",
        price: 79.90,
        images: [
            "https://via.placeholder.com/400x400/3b82f6/ffffff?text=Blusa+1",
            "https://via.placeholder.com/400x400/6b46c1/ffffff?text=Blusa+2"
        ],
        sizes: ["P", "M", "G"],
        colors: [
            { name: "Azul", value: "#3b82f6" },
            { name: "Branco", value: "#ffffff" },
            { name: "Rosa", value: "#ec4899" }
        ],
        available: true,
        category: "blusas"
    },
    {
        id: 3,
        name: "Calça Jeans Premium",
        description: "Calça jeans de corte moderno com excelente caimento. Ideal para compor looks casuais e elegantes.",
        price: 159.90,
        images: [
            "https://via.placeholder.com/400x400/1f2937/ffffff?text=Calca+1",
            "https://via.placeholder.com/400x400/374151/ffffff?text=Calca+2",
            "https://via.placeholder.com/400x400/6b7280/ffffff?text=Calca+3"
        ],
        sizes: ["36", "38", "40", "42", "44"],
        colors: [
            { name: "Azul Escuro", value: "#1e3a8a" },
            { name: "Preto", value: "#1f2937" },
            { name: "Azul Claro", value: "#3b82f6" }
        ],
        available: true,
        category: "calcas"
    },
    {
        id: 4,
        name: "Conjunto Esportivo",
        description: "Conjunto esportivo feminino confortável para atividades físicas e momentos de lazer.",
        price: 99.90,
        images: [
            "https://via.placeholder.com/400x400/a78bfa/ffffff?text=Conjunto+1",
            "https://via.placeholder.com/400x400/6b46c1/ffffff?text=Conjunto+2"
        ],
        sizes: ["P", "M", "G", "GG"],
        colors: [
            { name: "Roxo", value: "#6b46c1" },
            { name: "Rosa", value: "#ec4899" },
            { name: "Cinza", value: "#6b7280" }
        ],
        available: false, // Produto esgotado
        category: "esportivo"
    },
    {
        id: 5,
        name: "Saia Midi Fluida",
        description: "Saia midi com tecido fluido e movimento perfeito. Elegante e versátil para diversas ocasiões.",
        price: 89.90,
        images: [
            "https://via.placeholder.com/400x400/ec4899/ffffff?text=Saia+1",
            "https://via.placeholder.com/400x400/3b82f6/ffffff?text=Saia+2",
            "https://via.placeholder.com/400x400/6b46c1/ffffff?text=Saia+3"
        ],
        sizes: ["P", "M", "G"],
        colors: [
            { name: "Rosa", value: "#ec4899" },
            { name: "Azul", value: "#3b82f6" },
            { name: "Preto", value: "#1f2937" }
        ],
        available: true,
        category: "saias"
    },
    {
        id: 6,
        name: "Blazer Executivo",
        description: "Blazer executivo de corte impecável. Perfeito para ambientes corporativos e eventos formais.",
        price: 199.90,
        images: [
            "https://via.placeholder.com/400x400/1f2937/ffffff?text=Blazer+1",
            "https://via.placeholder.com/400x400/374151/ffffff?text=Blazer+2"
        ],
        sizes: ["P", "M", "G", "GG"],
        colors: [
            { name: "Preto", value: "#1f2937" },
            { name: "Marinho", value: "#1e3a8a" },
            { name: "Cinza", value: "#6b7280" }
        ],
        available: true,
        category: "blazers"
    }
];

// Função para renderizar os produtos na página
function renderProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Função para criar um card de produto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => openProductModal(product);

    card.innerHTML = `
        <div class="product-image">
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
            <div class="product-actions">
                <button class="view-product-btn" ${!product.available ? 'disabled' : ''}>
                    ${product.available ? '<i class="fas fa-eye"></i> Ver Produto' : '<i class="fas fa-times"></i> Indisponível'}
                </button>
            </div>
        </div>
    `;

    return card;
}

// Função para abrir o modal do produto
function openProductModal(product) {
    if (!product.available) return;

    const modal = document.getElementById('product-modal');
    const modalMainImage = document.getElementById('modal-main-image');
    const modalThumbnails = document.getElementById('modal-thumbnails');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalProductDescription = document.getElementById('modal-product-description');
    const sizeSelect = document.getElementById('size-select');
    const colorPicker = document.getElementById('color-picker');
    const addCartBtn = document.getElementById('modal-add-cart');

    // Configurar informações básicas
    modalProductName.textContent = product.name;
    modalProductPrice.textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
    modalProductDescription.textContent = product.description;

    // Configurar imagem principal
    modalMainImage.src = product.images[0];
    modalMainImage.alt = product.name;

    // Configurar miniaturas
    modalThumbnails.innerHTML = '';
    product.images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image;
        thumbnail.alt = `${product.name} ${index + 1}`;
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.onclick = () => {
            modalMainImage.src = image;
            // Remover classe active de todas as miniaturas
            modalThumbnails.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            // Adicionar classe active à miniatura clicada
            thumbnail.classList.add('active');
        };
        modalThumbnails.appendChild(thumbnail);
    });

    // Configurar opções de tamanho
    sizeSelect.innerHTML = '<option value="">Selecione o tamanho</option>';
    product.sizes.forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
    });

    // Configurar opções de cor
    colorPicker.innerHTML = '';
    product.colors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.className = 'color-option';
        colorOption.style.backgroundColor = color.value;
        colorOption.title = color.name;
        colorOption.onclick = () => {
            // Remover seleção de todas as cores
            colorPicker.querySelectorAll('.color-option').forEach(c => c.classList.remove('selected'));
            // Adicionar seleção à cor clicada
            colorOption.classList.add('selected');
        };
        colorPicker.appendChild(colorOption);
    });

    // Configurar botão de adicionar ao carrinho
    addCartBtn.onclick = () => {
        const selectedSize = sizeSelect.value;
        const selectedColor = colorPicker.querySelector('.color-option.selected');

        if (!selectedSize) {
            alert('Por favor, selecione um tamanho.');
            return;
        }

        if (!selectedColor) {
            alert('Por favor, selecione uma cor.');
            return;
        }

        const selectedColorName = selectedColor.title;
        
        addToCart({
            ...product,
            selectedSize,
            selectedColor: selectedColorName,
            selectedColorValue: selectedColor.style.backgroundColor
        });

        // Fechar modal após adicionar
        closeProductModal();
    };

    // Mostrar modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Função para fechar o modal do produto
function closeProductModal() {
    const modal = document.getElementById('product-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Função para filtrar produtos por categoria (para futuras implementações)
function filterProducts(category) {
    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = '';

    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Função para buscar produtos (para futuras implementações)
function searchProducts(query) {
    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = '';

    const searchResults = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );

    if (searchResults.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: var(--dark-gray);">Nenhum produto encontrado.</p>';
        return;
    }

    searchResults.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Função para obter produto por ID
function getProductById(id) {
    return products.find(product => product.id === id);
}