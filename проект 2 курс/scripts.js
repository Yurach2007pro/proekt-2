let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

const cartCountElement = document.getElementById('cart-count');
const cartTableBody = document.getElementById('cart-body');
const totalAmountElement = document.getElementById('total-amount');

// Функция добавляет продукт в корзину
function addToCart(productId) {
    let foundItemIndex = cartItems.findIndex(item => item.id === productId);

    if (foundItemIndex !== -1) {
        // Если такой товар уже есть в корзине, увеличиваем количество
        cartItems[foundItemIndex].quantity++;
    } else {
        // Иначе добавляем новый элемент
        cartItems.push({id: productId, quantity: 1});
    }

    saveCart();
    updateCartUI();
}

// Сохранение корзины в Local Storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Функция для обновления интерфейса корзины
function updateCartUI() {
    cartCountElement.textContent = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
    renderCartTable();
    calculateTotal();
}

// Рендер таблицы корзины
function renderCartTable() {
    cartTableBody.innerHTML = '';

    for (let item of cartItems) {
        const pricePerUnit = 69990; // Предположим цену за единицу товара фиксированную
        const row = `
            <tr class="cart-item">
                <td>Продукт №${item.id}</td>
                <td>₽${pricePerUnit}</td>
                <td><input type="number" value="${item.quantity}" class="cart-quantity-input"/></td>
                <td>₽${item.quantity * pricePerUnit}</td>
            </tr>
        `;
        cartTableBody.insertAdjacentHTML("beforeend", row);
    }
}

// Расчёт общей суммы
function calculateTotal() {
    const total = cartItems.reduce((acc, curr) => acc + (curr.quantity * 69990), 0);
    totalAmountElement.textContent = `Итого: ₽${total}`;
}

// Функция очистки корзины
function clearCart() {
    cartItems = [];
    saveCart();
    updateCartUI();
}

// Загрузка сохранённой корзины при загрузке страницы
window.onload = function() {
    updateCartUI();
};

// Функционал добавления товара в корзину с другой страницы
function addToCartFromProductPage() {
    const productId = location.href.split('?')[1]; // Получаем ID из URL
    addToCart(productId.replace('id=', '')); // Парсим ID и добавляем в корзину
}