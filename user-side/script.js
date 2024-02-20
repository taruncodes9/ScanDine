let cart = [];
let total = 0;

function addToCart(item, price) {
    const existingItem = cart.find(cartItem => cartItem.item === item);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ item, price, quantity: 1 });
    }

    total += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total');
    cartItems.innerHTML = '';

    cart.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.item} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItems.appendChild(listItem);
    });

    totalAmount.textContent = total.toFixed(2);
}

function checkout() {
    saveOrderToLocalStorage();
    sendOrderToAdmin();
    
    alert(`Order placed!\nTotal Amount: $${total.toFixed(2)}`);
    
    cart = [];
    total = 0;
    updateCart();
}

function saveOrderToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function clearOrderFromLocalStorage() {
    localStorage.removeItem('cart');
}

function sendOrderToAdmin() {
    const orderDetails = {
        items: cart.map(item => ({ name: item.item, quantity: item.quantity })),
        total: total.toFixed(2),
    };

    localStorage.setItem('adminOrder', JSON.stringify(orderDetails));
}

// Function to load items from Local Storage when the page loads
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        updateCart();
    }
}

function clearCart() {
    cart = [];
    total = 0;
    updateCart();
    clearOrderFromLocalStorage();
}

function toggleNav() {
    var sidenav = document.getElementById("sidenav");
    if (sidenav.style.width === "0px" || !sidenav.style.width) {
        sidenav.style.width = "300px";
    } else {
        sidenav.style.width = "0";
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  


// Call loadCartFromLocalStorage when the page loads
loadCartFromLocalStorage();
