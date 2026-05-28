// 4. MEIN HTML-TEMPLATE (Reiner HTML-Text für die Gerichtekarten)
// übergeben das gesamte Gericht-Objekt ("dish") als einzigen Parameter. Hauptsache Const :-)
function createMenuCardTemplate(dish) {
    const dishId = dish.id;
    const dishName = dish.name;
    const dishDescription = dish.description;
    const dishPrice = dish.price;
    const dishImage = dish.image;

    // Berechnung des formatierten Preis (z. B. "16.9" -> "16,90 €") in einer Konstante,
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

function createEmptyBasketTemplate() {
    return `
        <div class="empty-basket-container">
            <p class="empty-basket-text">
                Your basket is empty. Add delicious food to get started!
            </p>
        </div>
    `;
}

// Template für den Warenkorb-Eintrag
function createBasketItemTemplate(item, formattedRowPrice) {
    return `
        <div class="basket-item-card">
            <div class="basket-item-card-header">
                <span class="basket-item-card-title">${item.amount}x ${item.name}</span>
                <button class="basket-item-delete-btn" onclick="deleteFromBasket('${item.id}')" title="Gericht entfernen">🗑</button>
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