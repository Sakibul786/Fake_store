const API = "https://fakestoreapi.com/products";

const productContainer = document.getElementById("products");
const search = document.getElementById("search");
const category = document.getElementById("category");

const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");

const cartSidebar = document.getElementById("cartSidebar");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalPrice = document.getElementById("totalPrice");

const clearCart = document.getElementById("clearCart");
const checkoutBtn = document.getElementById("checkoutBtn");

let allProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ---------------- Fetch Products ----------------

async function getProducts() {
    try {
        const response = await fetch(API);
        const data = await response.json();

        allProducts = data;

        displayProducts(allProducts);
    } catch (err) {
        productContainer.innerHTML =
            "<h2 style='text-align:center;color:red'>Failed to load products.</h2>";
        console.error(err);
    }
}

// ---------------- Fetch Categories ----------------

async function getCategories() {
    try {
        const response = await fetch(API + "/categories");
        const data = await response.json();

        data.forEach(cat => {
            category.innerHTML += `
                <option value="${cat}">
                    ${cat}
                </option>
            `;
        });
    } catch (err) {
        console.log(err);
    }
}

// ---------------- Display Products ----------------

function displayProducts(products) {

    productContainer.innerHTML = "";

    products.forEach(product => {

        productContainer.innerHTML += `

        <div class="card">

            <img src="${product.image}" alt="${product.title}">

            <h3>${product.title}</h3>

            <p class="price">$${product.price}</p>

            <p class="rating">
                ⭐ ${product.rating.rate}
            </p>

            <button onclick="addToCart(${product.id})">
                Add To Cart
            </button>

        </div>

        `;
    });
}

// ---------------- Add To Cart ----------------

function addToCart(id) {

    const product = allProducts.find(item => item.id === id);

    const exists = cart.find(item => item.id === id);

    if (exists) {
        exists.quantity++;
    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();
    updateCartCount();
    displayCart();

}

// ---------------- Increase ----------------

function increase(id) {

    const item = cart.find(product => product.id === id);

    item.quantity++;

    saveCart();
    updateCartCount();
    displayCart();

}

// ---------------- Decrease ----------------

function decrease(id) {

    const item = cart.find(product => product.id === id);

    if (item.quantity > 1) {

        item.quantity--;

    } else {

        removeItem(id);
        return;

    }

    saveCart();
    updateCartCount();
    displayCart();

}

// ---------------- Remove ----------------

function removeItem(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();
    updateCartCount();
    displayCart();

}

// ---------------- Save ----------------

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

}

// ---------------- Cart Count ----------------

function updateCartCount() {

    let total = 0;

    cart.forEach(item => {

        total += item.quantity;

    });

    cartCount.innerText = total;

}

// ---------------- Display Cart ----------------

function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<h3>Your cart is empty.</h3>";

        totalPrice.innerText = "0.00";

        return;

    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="cartItem">

            <img src="${item.image}">

            <div>

                <h4>${item.title}</h4>

                <p>$${item.price}</p>

                <h4>Quantity : ${item.quantity}</h4>

                <button onclick="increase(${item.id})">+</button>

                <button onclick="decrease(${item.id})">-</button>

                <button onclick="removeItem(${item.id})">
                    Remove
                </button>

            </div>

        </div>

        `;

    });

    totalPrice.innerText = total.toFixed(2);

}

// ---------------- Search ----------------

search.addEventListener("keyup", () => {

    const value = search.value.toLowerCase();

    const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(value)
    );

    displayProducts(filtered);

});

// ---------------- Category ----------------

category.addEventListener("change", () => {

    if (category.value === "all") {

        displayProducts(allProducts);

        return;

    }

    const filtered = allProducts.filter(product =>
        product.category === category.value
    );

    displayProducts(filtered);

});

// ---------------- Sidebar ----------------

cartBtn.addEventListener("click", () => {

    cartSidebar.classList.add("show");

    displayCart();

});

closeCart.addEventListener("click", () => {

    cartSidebar.classList.remove("show");

});

// ---------------- Clear Cart ----------------

clearCart.addEventListener("click", () => {

    cart = [];

    saveCart();

    updateCartCount();

    displayCart();

});

// ---------------- Checkout ----------------

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    alert("Checkout Successful!");

    cart = [];

    saveCart();

    updateCartCount();

    displayCart();

});

// ---------------- Start ----------------

updateCartCount();

getProducts();

getCategories();