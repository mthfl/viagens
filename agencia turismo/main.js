const destinations = [
    {
        id: 1,
        name: 'Paris, França',
        description: 'Explore a cidade do amor com nossos pacotes incríveis',
        price: 2500,
        image: './img/paris.jpg'
    },
    {
        id: 2,
        name: 'Cancún, México',
        description: 'Praias paradisíacas e cultura maia espetacular',
        price: 3200,
        image: './img/cancun.jpg'
    },
    {
        id: 3,
        name: 'Tokyo, Japão',
        description: 'Descubra a fusão perfeita entre tradição e modernidade',
        price: 4000,
        image: './img/tokyo.avif'
    },
    {
        id: 4,
        name: 'Cristo Redentor, Brasil',
        description: 'Uma das Novas Sete Maravilhas do Mundo com vistas deslumbrantes do Rio de Janeiro.',
        price: 1500,
        image: './img/cristo-redentor-3.jpg'
    },
    {
        id: 5,
        name: 'Cataratas do Iguaçu, Brasil',
        description: 'Uma das maiores quedas dágua do mundo, rodeada por uma rica biodiversidade.',
        price: 1800,
        image: './img/cataratas-do-iguacu-8.jpg'
    },
    {
        id: 6,
        name: 'Pão de Açúcar, Brasil',
        description: 'Vista panorâmica incrível do Rio de Janeiro e da Baía de Guanabara.',
        price: 1200,
        image: 'img/deriva-continental_site.png'
    },
    {
        id: 7,
        name: 'Lençóis Maranhenses, Brasil',
        description: 'Dunas de areia branca e lagoas de água doce em um cenário único.',
        price: 2000,
        image: 'img/passeio-de-buggy-tutoia-1024x667.jpg'
    },
    {
        id: 8,
        name: 'Ouro Preto, Brasil',
        description: 'Arquitetura colonial e igrejas barrocas em uma cidade histórica.',
        price: 1600,
        image: 'img/1920px-Conjunto_arquitetônico_e_urbanístico_de_Ouro_Preto.png'
    },
    {
        id: 9,
        name: 'Chapada Diamantina, Brasil',
        description: 'Um paraíso para os amantes da natureza, com trilhas e cachoeiras.',
        price: 2200,
        image: 'img/chapada-diamantina-bahia.jpg'
    }
];
const createToast = (message, type = 'success') => {
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.classList.add(
        'fixed', 'top-4', 'right-4', 'z-50', 'px-4', 'py-3', 'rounded-lg', 'shadow-lg', 
        'transition-all', 'duration-300', 'transform', 'translate-x-full',
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    );
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    toast.offsetHeight;
    toast.classList.remove('translate-x-full');
    
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};



const createToastContainer = () => {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.classList.add('fixed', 'top-4', 'right-4', 'space-y-2');
    document.body.appendChild(container);
    return container;
};
const destinationsContainer = document.getElementById('destinations');
const searchInput = document.getElementById('searchInput');
const destinationModal = document.getElementById('destinationModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalDescription = document.getElementById('modalDescription');
const bookButton = document.getElementById('bookButton');
const closeModal = document.getElementById('closeModal');
const cartButton = document.getElementById('cartButton');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const payNowButton = document.getElementById('payNowButton');
const clearCartButton = document.getElementById('clearCartButton');

let selectedDestination = null;
const cart = [];

function renderDestinations(filteredDestinations) {
    destinationsContainer.innerHTML = '';
    filteredDestinations.forEach(dest => {
        const destCard = document.createElement('div');
        destCard.className = 'card-hover card-shine bg-white rounded-xl overflow-hidden shadow-lg';
        destCard.innerHTML = `
            <img src="${dest.image}" alt="${dest.name}" class="w-full h-64 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">${dest.name}</h3>
                <p class="text-gray-600 mb-4">${dest.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-2xl font-bold text-[var(--dark-blue)]">R$ ${dest.price.toLocaleString()}</span>
                    <button class="button-animation bg-[var(--gold)] text-[var(--dark-blue)] px-4 py-2 rounded-full font-semibold">
                        Reservar
                    </button>
                </div>
            </div>
        `;
        destCard.setAttribute('data-id', dest.id);
        destCard.addEventListener('click', () => openModal(dest));
        destinationsContainer.appendChild(destCard);
    });
}

function openModal(destination) {
    modalTitle.textContent = destination.name;
    modalImage.src = destination.image;
    modalDescription.textContent = destination.description;
    destinationModal.classList.remove('hidden');
    selectedDestination = destination;
    bookButton.onclick = addToCart;
}

function addToCart() {
    if (!selectedDestination) return;

    cart.push({
        id: selectedDestination.id,
        name: selectedDestination.name,
        price: selectedDestination.price,
        image: selectedDestination.image
    });

    cartCount.textContent = cart.length;
    destinationModal.classList.add('hidden');
    updateCartItems();
    cartModal.classList.remove('hidden');

    createToast(`${selectedDestination.name} adicionado ao carrinho!`);
}

function updateCartItems() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center p-2 border-b';
        li.innerHTML = `
            <div class="flex items-center space-x-2">
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                <span>${item.name}</span>
            </div>
            <div class="flex items-center space-x-2">
                <span>R$ ${item.price.toLocaleString()}</span>
                <button class="text-red-500 hover:text-red-700" onclick="removeFromCart(${index})">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `;
        cartItems.appendChild(li);
        total += item.price;
    });

    const totalElement = document.createElement('li');
    totalElement.className = 'flex justify-between items-center p-2 font-bold';
    totalElement.innerHTML = `
        <span>Total:</span>
        <span>R$ ${total.toLocaleString()}</span>
    `;
    cartItems.appendChild(totalElement);
    
    cartCount.textContent = cart.length;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartItems();
    createToast('Item removido do carrinho');
}

function clearCart() {
    cart.length = 0;
    updateCartItems();
    createToast('Carrinho limpo!');
}

function openPaymentModal() {
    const paymentModal = document.getElementById('paymentModal');
    const destinationsContainer = document.getElementById('paymentDestinationsContainer');
    const totalPriceElement = document.getElementById('paymentTotalPrice');

    destinationsContainer.innerHTML = '';
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    cart.forEach(item => {
        const destinationElement = document.createElement('div');
        destinationElement.className = 'flex items-center space-x-4 p-2 bg-white rounded-lg shadow';
        destinationElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded">
            <div class="flex-1">
                <h4 class="font-semibold">${item.name}</h4>
                <p class="text-gray-600">R$ ${item.price.toLocaleString()}</p>
            </div>
        `;
        destinationsContainer.appendChild(destinationElement);
    });

    totalPriceElement.textContent = `R$ ${total.toLocaleString()}`;
    paymentModal.classList.remove('hidden');
}

function processPayment(e) {
    e.preventDefault();
    
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const cardholderName = document.querySelector('input[placeholder="Nome completo"]').value;
    const cardNumber = document.querySelector('input[placeholder="1234 5678 9012 3456"]').value;

    if (!startDate || !endDate) {
        createToast('Por favor, preencha as datas de início e fim.', 'error');
        return;
    }

    const receiptDestinations = document.getElementById('receiptDestinations');
    const receiptTotalPrice = document.getElementById('receiptTotalPrice');
    
    receiptDestinations.innerHTML = '';
    
    cart.forEach(item => {
        const destinationElement = document.createElement('div');
        destinationElement.className = 'flex items-center space-x-4 p-2 bg-white rounded-lg shadow mb-2';
        destinationElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded">
            <div class="flex-1">
                <h4 class="font-semibold">${item.name}</h4>
                <p class="text-gray-600">R$ ${item.price.toLocaleString()}</p>
            </div>
        `;
        receiptDestinations.appendChild(destinationElement);
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    receiptTotalPrice.textContent = `R$ ${total.toLocaleString()}`;

    document.getElementById('receiptCardholderName').textContent = cardholderName;
    document.getElementById('receiptLastFourDigits').textContent = cardNumber.slice(-4);
    document.getElementById('receiptCheckIn').textContent = formatDate(startDate);
    document.getElementById('receiptCheckOut').textContent = formatDate(endDate);
    document.getElementById('receiptTransactionDate').textContent = formatDate(new Date());

    document.getElementById('paymentModal').classList.add('hidden');
    document.getElementById('receiptModal').classList.remove('hidden');

    clearCart();
    createToast(`Pagamento realizado com sucesso para ${cart.length} reservas!`);
}

document.getElementById('confirmPaymentBtn').addEventListener('click', function() {
    const cardholderName = document.querySelector('input[placeholder="Nome completo"]').value;
    const cardNumber = document.querySelector('input[placeholder="1234 5678 9012 3456"]').value;
    const expirationDate = document.querySelector('input[placeholder="MM/AA"]').value;
    const cvv = document.querySelector('input[placeholder="123"]').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!cardholderName || !cardNumber || !expirationDate || !cvv || !startDate || !endDate) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    console.log('Pagamento confirmado:', {
        cardholderName,
        cardNumber,
        expirationDate,
        cvv,
        startDate,
        endDate
    });

    document.getElementById('receiptCardholderName').innerText = cardholderName;
    document.getElementById('receiptLastFourDigits').innerText = cardNumber.slice(-4);
    document.getElementById('receiptCheckIn').innerText = startDate;
    document.getElementById('receiptCheckOut').innerText = endDate;
    document.getElementById('receiptTransactionDate').innerText = new Date().toLocaleString();

    document.getElementById('receiptModal').classList.remove('hidden');
    
    document.getElementById('paymentModal').classList.add('hidden');
});

document.getElementById('closeReceiptModal').addEventListener('click', function() {
    document.getElementById('receiptModal').classList.add('hidden');
});
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'pt', 'a4');
    
    doc.setFontSize(20);
    doc.setTextColor(26, 35, 126);
    doc.text('Confirmação de Reservas', 40, 40);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Data da Transação: ${document.getElementById('receiptTransactionDate').textContent}`, 40, 70);
    doc.text(`Check-in: ${document.getElementById('receiptCheckIn').textContent}`, 40, 90);
    doc.text(`Check-out: ${document.getElementById('receiptCheckOut').textContent}`, 40, 110);

    let yPosition = 150;
    cart.forEach((item, index) => {
        doc.setFontSize(14);
        doc.setTextColor(48, 63, 159);
        doc.text(`Destino ${index + 1}: ${item.name}`, 40, yPosition);
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Valor: R$ ${item.price.toLocaleString()}`, 40, yPosition + 20);
        
        yPosition += 50;
    });

    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    doc.setFontSize(16);
    doc.setTextColor(26, 35, 126);
    doc.text(`Total: R$ ${total.toLocaleString()}`, 40, yPosition + 20);

    doc.setFontSize(14);
    doc.setTextColor(48, 63, 159);
    doc.text('Informações do Pagamento', 40, yPosition + 60);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Nome no Cartão: ${document.getElementById('receiptCardholderName').textContent}`, 40, yPosition + 80);
    doc.text(`Cartão: •••• •••• •••• ${document.getElementById('receiptLastFourDigits').textContent}`, 40, yPosition + 100);

    doc.save(`reservas-multiplas-${new Date().getTime()}.pdf`);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
}

clearCartButton.addEventListener('click', clearCart);
payNowButton.addEventListener('click', () => {
    if (cart.length === 0) {
        createToast('Seu carrinho está vazio!', 'error');
        return;
    }
    openPaymentModal();
});

closeModal.addEventListener('click', () => destinationModal.classList.add('hidden'));
document.getElementById('closeCartModal').addEventListener('click', () => cartModal.classList.add('hidden'));
document.getElementById('closePaymentModal').addEventListener('click', () => document.getElementById('paymentModal').classList.add('hidden'));
document.getElementById('closeReceiptModal').addEventListener('click', () => document.getElementById('receiptModal').classList.add('hidden'));

document.getElementById('downloadReceipt').addEventListener('click', generatePDF);

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredDestinations = destinations.filter(dest => 
        dest.name.toLowerCase().includes(query) || 
        dest.description.toLowerCase().includes(query)
    );
    renderDestinations(filteredDestinations);
});

renderDestinations(destinations);

    document.getElementById('paymentForm').addEventListener('submit', processPayment);