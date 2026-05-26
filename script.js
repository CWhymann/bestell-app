// script.js

// 1. MEINE GLOBALEN VARIABLEN
let basket = [];

// 2. MEINE START-FUNKTION
function init() {
    renderMenu();
}

// 3. MEINE SPEISEKARTE ANZEIGEN (Einfache Basics)
function renderMenu() {
    // Ich hole mir die 3 leeren Container aus deinem HTML
    let burgerContainer = document.getElementById("category-section-burger");
    let pizzaContainer = document.getElementById("category-section-pizza");
    let saladContainer = document.getElementById("category-section-salad");

    // Ich leere die Container zur Sicherheit einmal aus
    if (burgerContainer) burgerContainer.innerHTML = "";
    if (pizzaContainer) pizzaContainer.innerHTML = "";
    if (saladContainer) saladContainer.innerHTML = "";

    // 1. BURGER-SCHLEIFE (Index 0)
    if (burgerContainer) {
        let burgerItems = menuData[0].items; // Hier fehlte das [0]
        for (let i = 0; i < burgerItems.length; i++) {
            let dish = burgerItems[i];
            burgerContainer.innerHTML += createMenuCardTemplate(dish);
        }
    }

    // 2. PIZZA-SCHLEIFE (Index 1)
    if (pizzaContainer) {
        let pizzaItems = menuData[1].items; // Hier fehlte das [1]
        for (let i = 0; i < pizzaItems.length; i++) {
            let dish = pizzaItems[i];
            pizzaContainer.innerHTML += createMenuCardTemplate(dish);
        }
    }

    // 3. SALAT-SCHLEIFE (Index 2)
    if (saladContainer) {
        let saladItems = menuData[2].items; // Hier fehlte das [2]
        for (let i = 0; i < saladItems.length; i++) {
            let dish = saladItems[i];
            saladContainer.innerHTML += createMenuCardTemplate(dish);
        }
    }
}

// 4. MEIN HTML-TEMPLATE (Reiner HTML-Text für deine Gerichtekarten)
function createMenuCardTemplate(dish) {
    let formattedPrice = dish.price.toFixed(2).replace(".", ",");
    return `
        <div class="menu-card">
            <img class="menu-card-img" src="${dish.image}" alt="${dish.name}">
            <div class="menu-card-info">
                <h3 class="menu-card-title">${dish.name}</h3>
                <p class="menu-card-description">${dish.description}</p>
            </div>
            <div class="menu-card-right">
                <span class="menu-card-price">${formattedPrice} €</span>
                <span class="add-to-basket-btn" onclick="addDishToBasket('${dish.id}')">Add to basket</span>
            </div>
        </div>
    `;
}

// 5. MEIN EVENT LISTENER (Der automatische Startbefehl)
window.addEventListener("DOMContentLoaded", init);
