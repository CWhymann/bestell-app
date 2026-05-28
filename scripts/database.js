// database.js
const menuData = [
    {
        category: "Burger & Sandwiches",
        items: [
            {
                id: "burger_01",
                name: "Veggie mushroom black burger",
                description: "Mixed green salad, Tomatoes, Edamame, Mushrooms",
                price: 16.9,
                image: "assets/img/veggie-mushroom.jpg",
            },
            {
                id: "burger_02",
                name: "All meat burger",
                description:
                    "Beef, Bacon, Dill pickles, Smoked cheese, Ketchup, BBQ souse",
                price: 15.9,
                image: "assets/img/all-meat.jpg",
            },
            {
                id: "burger_03",
                name: "Beef red burger",
                description: "Beef, Cheese, Tomatoes, Lettuce, Onion",
                price: 14.9,
                image: "assets/img/beef-red-burger.jpg",
            },
            {
                id: "burger_04",
                name: "Big chicken burger",
                description:
                    "Chicken, Cheese, Tomatoes, Lettuce, Onion, Bell pepper",
                price: 15.9,
                image: "assets/img/big-chicken.jpg",
            },
        ],
    },
    {
        category: "Pizza (30cm)",
        items: [
            {
                id: "pizza_01",
                name: "Pizza Margherita",
                description: "Tomatoes, Mozzarella...",
                price: 11.9,
                image: "assets/img/pizza-margherita.jpg",
            },
            {
                id: "pizza_02",
                name: "Pizza Chorizo",
                description: "Mozzarella, Tomatoes, hot chorizo...",
                price: 13.9,
                image: "assets/img/pizza-chorizo.jpg",
            },
            {
                id: "pizza_03",
                name: "Funghi",
                description: "Fresh white mushrooms, Mozzarella, Tomatoes...",
                price: 12.9,
                image: "assets/img/funghi.jpg",
            },
            {
                id: "pizza_04",
                name: "Quattro Formaggi with Chicken",
                description:
                    "Mozzarella, Gorgonzola, Parmesan, Fontina cheese, chicken...",
                price: 15.9,
                image: "assets/img/quattro-formaggi.jpg",
            },
        ],
    },
    {
        category: "Salad",
        items: [
            {
                id: "salad_01",
                name: "Warm beef arugula salad",
                description:
                    "Thinly sliced beef steak, fresh arugula, tomatoes...",
                price: 16.9,
                image: "assets/img/warm-beef.jpg",
            },
            {
                id: "salad_02",
                name: "Mini green salad",
                description:
                    "Green mix, cucumbers, carrots, cherry tomatoes...",
                price: 7.9,
                image: "assets/img/mini-green.jpg",
            },
            {
                id: "salad_03",
                name: "Green Salad with seafood",
                description:
                    "Mixed greens, grilled shrimp, calamari, lemon dressing...",
                price: 16.9,
                image: "assets/img/salad-seafood.jpg",
            },
            {
                id: "salad_04",
                name: "Vegan green salad with tofu",
                description:
                    "Green salad, cherry tomatoes, cucumbers, carrots, radishes, chickpeas, tofu...",
                price: 14.9,
                image: "assets/img/salad-tofu.jpg",
            },
        ],
    },
];
