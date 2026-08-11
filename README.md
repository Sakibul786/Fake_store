# Fake Store

A responsive e-commerce web application built using HTML, CSS, and JavaScript. The application uses the Fake Store API to dynamically load products and provides essential e-commerce features such as product search, category filtering, shopping cart management, quantity control, local storage, and checkout simulation.

## Project Overview

Fake Store is a front-end e-commerce project designed to demonstrate how a modern online shopping interface can be created using basic web technologies.

The application retrieves product information from the Fake Store API and displays the products in a responsive grid layout. Users can search for products, filter products by category, add products to their shopping cart, update quantities, remove items, clear the cart, and simulate the checkout process.

The shopping cart data is stored in the browser's Local Storage, allowing the cart to remain available even after refreshing the page.

## Features

- Responsive e-commerce interface
- Dynamic product loading from Fake Store API
- Product search functionality
- Category-based product filtering
- Product price and rating display
- Add to Cart functionality
- Shopping cart sidebar
- Increase product quantity
- Decrease product quantity
- Remove individual products from cart
- Clear entire shopping cart
- Automatic cart item count
- Automatic total price calculation
- Local Storage support
- Checkout simulation
- Responsive product grid
- Error handling when products cannot be loaded
- Font Awesome icons

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Fake Store API
- Local Storage
- Font Awesome

## API Used

This project uses the Fake Store API to retrieve product and category information.

API endpoint:

https://fakestoreapi.com/products

Categories endpoint:

https://fakestoreapi.com/products/categories

The API provides product information such as:

- Product ID
- Product title
- Product price
- Product description
- Product category
- Product image
- Product rating

## Project Structure

```text
Fake_store/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
└── .vscode/
    └── launch.json