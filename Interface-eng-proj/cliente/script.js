// Elementos DOM
const productList = document.getElementById('product-list');
const cartAside = document.getElementById('cart-aside');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountSpan = document.getElementById('cart-count');
const cartTotalSpan = document.getElementById('cart-total');
const cartIcon = document.getElementById('cart-icon');
const finishPurchaseBtn = document.getElementById('finish-purchase-btn');
const cancelPurchaseBtn = document.getElementById('cancel-purchase-btn');

let cart = []; // Array que armazena os produtos no carrinho
let allProducts = []; // Para armazenar todos os produtos da API

// --- Configuração da API ---
// ATENÇÃO: SUBSTITUA ESTA URL PELA URL REAL DA SUA API
const API_URL = 'http://localhost:3000/produtos'; 
// Exemplo: 'http://localhost:3000/produtos'

// --- Funções de Renderização e Utilidade ---

// Função para formatar preço em Reais
const formatCurrency = (value) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
};

// 1. Cria o Card de Produto
const createProductCard = (product) => {
    const card = document.createElement('div');
    card.className = 'card';
    
    // ATENÇÃO: Certifique-se de que os nomes dos atributos (imgem, nome, descricao, preco)
    // correspondem EXATAMENTE ao que sua API retorna.
    card.innerHTML = `
        <img src="${product.imgem}" alt="${product.nome}">
        <h4>${product.nome}</h4>
        <p>${product.descricao}</p>
        <div class="price">${formatCurrency(product.preco)}</div>
        <button data-id="${product.id}" class="add-to-cart-btn">Adicionar ao Carrinho</button>
    `;
    
    productList.appendChild(card);
};

// 2. BUSCA OS PRODUTOS DA SUA API REAL
const fetchProducts = async () => {
    try {
        productList.innerHTML = '<p>Carregando produtos...</p>'; // Feedback de carregamento
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            // Lança um erro se a resposta não for 200-299
            throw new Error(`Erro de rede ou API: ${response.status}`);
        }
        
        const products = await response.json();
        
        // Armazena todos os produtos para uso posterior no carrinho
        allProducts = products; 
        
        productList.innerHTML = ''; // Limpa o feedback de carregamento
        products.forEach(createProductCard);

    } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
        productList.innerHTML = `<p style="color: red;">Não foi possível carregar os produtos. Verifique a URL da API.</p>`;
    }
};

// 3. Renderiza o Carrinho
const renderCart = () => {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="color: var(--orange);">O carrinho está vazio.</p>';
        cartAside.classList.add('hidden');
        cartCountSpan.textContent = 0;
        return;
    }

    cart.forEach(item => {
        total += item.preco * item.quantity;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <div class="item-info">
                <div class="item-name">${item.nome}</div>
                <div class="item-price">${formatCurrency(item.preco)}</div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    cartTotalSpan.textContent = formatCurrency(total);
    cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartAside.classList.remove('hidden'); // Exibe o carrinho se tiver itens
};

// --- Lógica do Carrinho ---

const addToCart = (productId) => {
    // Busca o produto na lista de produtos carregada da API (allProducts)
    const product = allProducts.find(p => p.id === parseInt(productId));
    if (!product) return;

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // Usa os atributos recebidos da API
        cart.push({ 
            id: product.id,
            nome: product.nome, 
            preco: product.preco, 
            quantity: 1 
        });
    }
    
    renderCart();
};

const updateCartQuantity = (productId, change) => {
    const itemIndex = cart.findIndex(item => item.id === parseInt(productId));
    if (itemIndex === -1) return;

    cart[itemIndex].quantity += change;

    if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1); // Remove se a quantidade for zero ou menos
    }

    renderCart();
};

const finishPurchase = () => {
    alert("Compra Finalizada! O carrinho será esvaziado.");
    cart = []; // Carrinho some/zera
    renderCart();
};

const cancelPurchase = () => {
    const confirmCancel = confirm("Deseja realmente cancelar a compra? Todos os itens serão removidos.");
    if (confirmCancel) {
        cart = []; // Carrinho some/zera
        renderCart();
        alert("Compra Cancelada.");
    }
};


// --- Event Listeners ---

// 1. Evento para adicionar ao carrinho (usa delegação de eventos)
productList.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const productId = e.target.dataset.id;
        addToCart(productId);
    }
});

// 2. Evento para alterar quantidade no carrinho
cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('increase-btn')) {
        const productId = e.target.dataset.id;
        updateCartQuantity(productId, 1);
    } else if (e.target.classList.contains('decrease-btn')) {
        const productId = e.target.dataset.id;
        updateCartQuantity(productId, -1);
    }
});

// 3. Evento para finalizar ou cancelar
finishPurchaseBtn.addEventListener('click', finishPurchase);
cancelPurchaseBtn.addEventListener('click', cancelPurchase);

// 4. Evento para mostrar/esconder carrinho
cartIcon.addEventListener('click', () => {
    // Só alterna a visibilidade se houver itens no carrinho
    if (cart.length > 0) {
        cartAside.classList.toggle('hidden');
    }
});

// --- Inicialização ---
// Chama a função para buscar os produtos da API quando a página é carregada
document.addEventListener('DOMContentLoaded', fetchProducts);