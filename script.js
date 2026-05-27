// 1. MEINE GLOBALEN VARIABLEN
let basket = [];

// Hilfsfunktion: Sucht ein Gericht in menuData anhand der ID
function getDishById(dishId) {
    for (let i = 0; i < menuData.length; i++) {
        const category = menuData[i];
        for (let j = 0; j < category.items.length; j++) {
            const dish = category.items[j];
            if (dish.id === dishId) {
                return dish;
            }
        }
    }
    return null;
}

// 2. MEINE START-FUNKTION
function init() {
    renderMenu();
    updateBasket();

    // Klick-Event für den Bestell-Button registrieren
    const orderBtn = document.getElementById("order-button");
    if (orderBtn) {
        orderBtn.addEventListener("click", placeOrder);
    }
}

// 3. MEINE SPEISEKARTE ANZEIGEN (Einfache Basics mit viel const)
function renderMenu() {
    // Diese HTML-Container ändern sich nicht, also nehmen wir const
    const burgerContainer = document.getElementById("category-section-burger");
    const pizzaContainer = document.getElementById("category-section-pizza");
    const saladContainer = document.getElementById("category-section-salad");

    // Ich leere die Container zur Sicherheit einmal aus, bevor wir sie befüllen
    if (burgerContainer) burgerContainer.innerHTML = "";
    if (pizzaContainer) pizzaContainer.innerHTML = "";
    if (saladContainer) saladContainer.innerHTML = "";

    // 1. BURGER-SCHLEIFE (Index 0 in menuData)
    if (burgerContainer) {
        const burgerItems = menuData[0].items; // Die Liste bleibt gleich -> const
        for (let i = 0; i < burgerItems.length; i++) {
            const dish = burgerItems[i]; // Jedes einzelne Gericht bleibt in diesem Durchlauf fest -> const
            burgerContainer.innerHTML += createMenuCardTemplate(dish);
        }
    }

    // 2. PIZZA-SCHLEIFE (Index 1 in menuData)
    if (pizzaContainer) {
        const pizzaItems = menuData[1].items; // Die Liste bleibt gleich -> const
        for (let i = 0; i < pizzaItems.length; i++) {
            const dish = pizzaItems[i]; // Jedes einzelne Gericht bleibt in diesem Durchlauf fest -> const
            pizzaContainer.innerHTML += createMenuCardTemplate(dish);
        }
    }

    // 3. SALAT-SCHLEIFE (Index 2 in menuData)
    if (saladContainer) {
        const saladItems = menuData[2].items; // Die Liste bleibt gleich -> const
        for (let i = 0; i < saladItems.length; i++) {
            const dish = saladItems[i]; // Jedes einzelne Gericht bleibt in diesem Durchlauf fest -> const
            saladContainer.innerHTML += createMenuCardTemplate(dish);
        }
    }
}

// 4. MEIN HTML-TEMPLATE (Reiner HTML-Text für deine Gerichtekarten)
// Erklärung für deinen Tutor: Wir übergeben das gesamte Gericht-Objekt ("dish") als einzigen Parameter.
// Das ist extrem übersichtlich, zukunftssicher und entspricht absolut den Clean-Code-Richtlinien!
function createMenuCardTemplate(dish) {
    const dishId = dish.id;
    const dishName = dish.name;
    const dishDescription = dish.description;
    const dishPrice = dish.price;
    const dishImage = dish.image;

    // Wir berechnen den formatierten Preis (z. B. "16.9" -> "16,90 €") in einer Konstante,
    // da sich dieser Wert während der Anzeige auf der Karte nicht mehr verändert!
    const formattedPrice = dishPrice.toFixed(2).replace(".", ",");

    return `
        <div class="menu-card">
            <img class="menu-card-img" src="${dishImage}" alt="${dishName}">
            <div class="menu-card-info">
                <h3 class="menu-card-title">${dishName}</h3>
                <p class="menu-card-description">${dishDescription}</p>
            </div>
            <div class="menu-card-right">
                <span class="menu-card-price">${formattedPrice} €</span>
                <button class="add-to-basket-btn" onclick="addDishToBasket('${dishId}')">Add to basket</button>
            </div>
        </div>
    `;
}

// Warenkorb verwalten und aktualisieren
function updateBasket() {
    const listContainer = document.getElementById("basket-items-list");
    if (!listContainer) return;

    if (basket.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-basket-container">
                <p class="empty-basket-text">
                    Your basket is empty. Add delicious food to get started!
                </p>
            </div>
        `;

        // Preise auf Null setzen
        updatePriceDisplays(0, 0, 0);
        setOrderButtonState(false, 0);
        updateMobileBasketBadge(0);
        return;
    }

    let html = "";
    let subtotal = 0;
    let totalItemsCount = 0;

    for (let i = 0; i < basket.length; i++) {
        const item = basket[i];
        const rowTotalPrice = item.price * item.amount;
        subtotal += rowTotalPrice;
        totalItemsCount += item.amount;

        const formattedRowPrice = rowTotalPrice.toFixed(2).replace(".", ",");

        // Wir erzeugen eine wunderschöne weiße Karte für jedes Gericht im Warenkorb (wie im Figma "Your Basket" Overlay)
        // Oben rechts: Mülleimer zum Löschen
        // Unten rechts: Counter mit Minus, Zahl und Plus
        html += `
            <div class="basket-item-card">
                <div class="basket-item-card-header">
                    <span class="basket-item-card-title">${item.amount}x ${item.name}</span>
                    <button class="basket-item-delete-btn" onclick="deleteFromBasket('${item.id}')" title="Gericht entfernen">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                </div>
                <div class="basket-item-card-footer">
                    <span class="basket-item-card-price">${formattedRowPrice} €</span>
                    <div class="basket-item-card-counter">
                        <button class="basket-counter-btn" onclick="changeAmount('${item.id}', -1)">-</button>
                        <span class="basket-counter-value">${item.amount}</span>
                        <button class="basket-counter-btn" onclick="changeAmount('${item.id}', 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    }

    listContainer.innerHTML = html;

    const deliveryFee = 4.9;
    const total = subtotal + deliveryFee;

    updatePriceDisplays(subtotal, deliveryFee, total);
    setOrderButtonState(true, total);
    updateMobileBasketBadge(totalItemsCount);
}

// Hilfsfunktion zum Updaten der Preisanzeigen
function updatePriceDisplays(subtotal, delivery, total) {
    const subtotalEl = document.getElementById("subtotal-price");
    const deliveryEl = document.getElementById("delivery-price");
    const totalEl = document.getElementById("total-price");

    if (subtotalEl)
        subtotalEl.innerText = subtotal.toFixed(2).replace(".", ",") + " €";
    if (deliveryEl)
        deliveryEl.innerText =
            (subtotal > 0 ? delivery.toFixed(2).replace(".", ",") : "0,00") +
            " €";
    if (totalEl)
        totalEl.innerText =
            (subtotal > 0 ? total.toFixed(2).replace(".", ",") : "0,00") + " €";
}

// Bestell-Button Status und Text festlegen
function setOrderButtonState(enabled, total) {
    const btn = document.getElementById("order-button");
    if (!btn) return;

    if (enabled) {
        btn.disabled = false;
        btn.innerText = `Buy now (${total.toFixed(2).replace(".", ",")} €)`;
    } else {
        btn.disabled = true;
        btn.innerText = "Buy now (0,00 €)";
    }
}

// Mobile-Ansicht: Anzahl anpassen und Badge-Text setzen
function updateMobileBasketBadge(count) {
    const badge = document.getElementById("mobile-basket-badge");
    if (badge) {
        badge.innerText = count;
        if (count > 0) {
            badge.classList.add("has-items");
        } else {
            badge.classList.remove("has-items");
        }
    }
}

// Gericht zum Warenkorb hinzufügen
function addDishToBasket(dishId) {
    const dish = getDishById(dishId);
    if (!dish) return;

    // Suchen, ob das Gericht schon im Warenkorb liegt
    let foundItem = null;
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].id === dishId) {
            foundItem = basket[i];
            break;
        }
    }

    if (foundItem) {
        foundItem.amount++;
    } else {
        basket.push({
            id: dish.id,
            name: dish.name,
            price: dish.price,
            amount: 1,
        });
    }

    updateBasket();
}

// Ein Gericht KOMPLETT aus dem Warenkorb entfernen mittels Mülleimer-Icon
function deleteFromBasket(dishId) {
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].id === dishId) {
            basket.splice(i, 1);
            break;
        }
    }
    updateBasket();
}

// Menge verändern (+1 oder -1)
function changeAmount(dishId, delta) {
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].id === dishId) {
            basket[i].amount += delta;
            if (basket[i].amount <= 0) {
                basket.splice(i, 1);
            }
            break;
        }
    }
    updateBasket();
}

// Warenkorb Dialog für Mobil öffnen/schließen
function toggleMobileBasket(action) {
    const basketContainer = document.getElementById("basket-container");
    if (!basketContainer) return;

    const basketButton = document.getElementById("mobile-basket-btn");

    if (
        action === "open" ||
        (action === undefined &&
            !basketContainer.classList.contains("mobile-open"))
    ) {
        basketContainer.classList.add("mobile-open");
        document.body.classList.add("no-scroll");
        if (basketButton) basketButton.classList.add("active");
    } else {
        basketContainer.classList.remove("mobile-open");
        document.body.classList.remove("no-scroll");
        if (basketButton) basketButton.classList.remove("active");
    }
}

// Scrollen nach ganz oben
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Scrollen direkt zur Speisekarte
function scrollToMenu() {
    const menuEl = document.getElementById("menu-container");
    if (menuEl) {
        menuEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

// Bestellung abschicken
function placeOrder() {
    if (basket.length === 0) return;

    // Warenkorb leeren
    basket = [];
    updateBasket();

    // Schließe den mobilen Warenkorb-Dialog falls offen
    toggleMobileBasket("close");

    // Overlay anzeigen
    const overlay = document.getElementById("confirmation-overlay");
    if (overlay) {
        overlay.classList.remove("overlay-hidden");
    }
}

// Erfolgsfenster schließt
function closeConfirmationOverlay() {
    const overlay = document.getElementById("confirmation-overlay");
    if (overlay) {
        overlay.classList.add("overlay-hidden");
    }
}

// 5. MEIN EVENT LISTENER (Der automatische Startbefehl)
window.addEventListener("DOMContentLoaded", init);
