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
    renderCategory("category-section-burger", 0);
    renderCategory("category-section-pizza", 1);
    renderCategory("category-section-salad", 2);
}

// Hilfsfunktion: Rendert eine einzelne Kategorie
function renderCategory(containerId, categoryIndex) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
    const items = menuData[categoryIndex].items;
    for (let i = 0; i < items.length; i++) {
        container.innerHTML += createMenuCardTemplate(items[i]);
    }
}



// Warenkorb verwalten und aktualisieren
function updateBasket() {
    const listContainer = document.getElementById("basket-items-list");
    if (!listContainer) return;
    if (basket.length === 0) {
        listContainer.innerHTML = createEmptyBasketTemplate();
        updateBasketUI(0, 0, 0, 0, false);
        return;
    }
    const totals = calculateBasketTotals();
    listContainer.innerHTML = totals.html;
    const deliveryFee = 4.9;
    updateBasketUI(totals.subtotal, deliveryFee, totals.subtotal + deliveryFee, totals.totalItemsCount, true);
}

// Hilfsfunktion: Berechnet Zwischensummen und HTML für Warenkorb-Einträge
function calculateBasketTotals() {
    let subtotal = 0, totalItemsCount = 0, html = "";
    for (let i = 0; i < basket.length; i++) {
        const item = basket[i];
        const rowTotalPrice = item.price * item.amount;
        subtotal += rowTotalPrice;
        totalItemsCount += item.amount;
        const formattedRowPrice = rowTotalPrice.toFixed(2).replace(".", ",");
        html += createBasketItemTemplate(item, formattedRowPrice);
    }
    return { subtotal, totalItemsCount, html };
}

// Hilfsfunktion: Aktualisiert alle UI-Elemente gesammelt
function updateBasketUI(subtotal, deliveryFee, total, itemsCount, isEnabled) {
    updatePriceDisplays(subtotal, deliveryFee, total);
    setOrderButtonState(isEnabled, total);
    updateMobileBasketBadge(itemsCount);
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
    const foundItem = basket.find(item => item.id === dishId);
    if (foundItem) {
        foundItem.amount++;
    } else {
        basket.push({ id: dish.id, name: dish.name, price: dish.price, amount: 1 });
    }
    updateBasket();
}

// Ein Gericht KOMPLETT aus dem Warenkorb entfernen mittels Mülleimer-Icon
function deleteFromBasket(dishId) {
    basket = basket.filter(item => item.id !== dishId);
    updateBasket();
}

// Menge verändern (+1 oder -1)
function changeAmount(dishId, delta) {
    const item = basket.find(item => item.id === dishId);
    if (!item) return;
    item.amount += delta;
    if (item.amount <= 0) {
        basket = basket.filter(i => i.id !== dishId);
    }
    updateBasket();
}

// Warenkorb Dialog für Mobil öffnen/schließen
function toggleMobileBasket(action) {
    const basketContainer = document.getElementById("basket-container");
    if (!basketContainer) return;
    const basketButton = document.getElementById("mobile-basket-btn");
    const isOpen = action === "open" || (action === undefined && !basketContainer.classList.contains("mobile-open"));
    basketContainer.classList.toggle("mobile-open", isOpen);
    document.body.classList.toggle("no-scroll", isOpen);
    if (basketButton) {
        basketButton.classList.toggle("active", isOpen);
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
