const menuItem = (id, name, price, isVeg, description) => ({
    card: {
        info: {
            id,
            name,
            defaultPrice: price * 100,
            isVeg,
            description,
            ratings: {
                aggregatedRating: {
                    rating: "4.2",
                    ratingCountV2: "120+"
                }
            }
        }
    }
});

const restaurant = (id, name, cuisines, menuSections, rating, deliveryTime) => ({
    info: {
        id,
        name,
        cuisines,
        avgRating: rating,
        sla: { slaString: `${deliveryTime} mins` }
    },
    menuSections
});

export const localRestaurants = [
    restaurant("local-pizza-corner", "Pizza Corner", ["Pizza", "Italian", "Pasta"], [
        {
            title: "Pizzas",
            itemCards: [
                menuItem("pizza-margherita", "Margherita Pizza", 249, true, "Classic pizza with tomato, mozzarella, and basil."),
                menuItem("pizza-farmhouse", "Farmhouse Pizza", 349, true, "Loaded with vegetables and mozzarella."),
                menuItem("pizza-chicken", "Chicken Tikka Pizza", 399, false, "Tandoori chicken, peppers, and cheese."),
                menuItem("pizza-garlic-bread", "Cheesy Garlic Bread", 179, true, "Toasted garlic bread topped with cheese.")
            ]
        },
        {
            title: "Pasta",
            itemCards: [
                menuItem("pizza-pasta-alfredo", "Creamy Alfredo Pasta", 289, true, "Pasta in a creamy white sauce."),
                menuItem("pizza-pasta-chicken", "Chicken Pasta", 329, false, "Pasta tossed with chicken and herbs.")
            ]
        }
    ], "4.3", 30),
    restaurant("local-delhi-spice", "Delhi Spice House", ["North Indian", "Mughlai", "Biryani"], [
        {
            title: "North Indian Favourites",
            itemCards: [
                menuItem("spice-paneer", "Paneer Butter Masala", 289, true, "Paneer in a rich tomato and butter gravy."),
                menuItem("spice-dal", "Dal Makhani", 249, true, "Slow-cooked black lentils with cream."),
                menuItem("spice-chicken", "Butter Chicken", 349, false, "Tandoori chicken in a creamy tomato gravy."),
                menuItem("spice-tikka", "Chicken Tikka", 329, false, "Grilled chicken marinated with spices."),
                menuItem("spice-naan", "Butter Naan", 59, true, "Soft naan brushed with butter.")
            ]
        },
        {
            title: "Biryani",
            itemCards: [
                menuItem("spice-veg-biryani", "Vegetable Biryani", 249, true, "Fragrant rice cooked with vegetables and spices."),
                menuItem("spice-chicken-biryani", "Chicken Biryani", 329, false, "Aromatic basmati rice with spiced chicken.")
            ]
        }
    ], "4.1", 35),
    restaurant("local-burger-barn", "Burger Barn", ["Burgers", "Fast Food"], [
        {
            title: "Burgers",
            itemCards: [
                menuItem("burger-classic-veg", "Classic Veg Burger", 159, true, "Crispy veggie patty with lettuce and sauce."),
                menuItem("burger-paneer", "Paneer Crunch Burger", 199, true, "Crispy paneer with a smoky house sauce."),
                menuItem("burger-chicken", "Chicken Cheese Burger", 229, false, "Grilled chicken patty with melted cheese.")
            ]
        },
        {
            title: "Sides and Desserts",
            itemCards: [
                menuItem("burger-fries", "Masala Fries", 99, true, "Crispy fries tossed in house seasoning."),
                menuItem("burger-brownie", "Chocolate Brownie", 129, true, "Warm chocolate brownie.")
            ]
        }
    ], "4.0", 25),
    restaurant("local-dosa-cafe", "South Dosa Cafe", ["South Indian", "Dosa"], [
        {
            title: "South Indian",
            itemCards: [
                menuItem("dosa-masala", "Masala Dosa", 169, true, "Crisp dosa filled with spiced potatoes."),
                menuItem("dosa-idli", "Idli Sambar", 119, true, "Steamed idlis served with sambar and chutney."),
                menuItem("dosa-vada", "Medu Vada", 99, true, "Crisp lentil fritters with coconut chutney."),
                menuItem("dosa-chicken", "Chicken 65", 269, false, "Spicy fried chicken bites.")
            ]
        }
    ], "4.2", 28),
    restaurant("local-dum-biryani", "Dum Biryani House", ["Biryani", "Kebabs", "Rolls"], [
        {
            title: "Biryani",
            itemCards: [
                menuItem("dum-veg-biryani", "Veg Dum Biryani", 229, true, "Dum-cooked basmati rice with vegetables."),
                menuItem("dum-chicken-biryani", "Chicken Dum Biryani", 319, false, "Dum-cooked basmati rice with chicken.")
            ]
        },
        {
            title: "Kebabs and Rolls",
            itemCards: [
                menuItem("dum-paneer-kebab", "Paneer Tikka Kebab", 249, true, "Char-grilled paneer with peppers."),
                menuItem("dum-chicken-kebab", "Chicken Seekh Kebab", 299, false, "Spiced minced chicken grilled on skewers."),
                menuItem("dum-chicken-roll", "Chicken Kathi Roll", 199, false, "Chicken tikka wrapped in a flaky paratha.")
            ]
        }
    ], "4.4", 32),
    restaurant("local-sweet-treats", "Sweet Treats", ["Desserts", "Cakes", "Ice Cream"], [
        {
            title: "Cakes and Sweets",
            itemCards: [
                menuItem("sweet-chocolate-cake", "Chocolate Truffle Cake", 299, true, "Rich chocolate cake with truffle frosting."),
                menuItem("sweet-rasmalai", "Rasmalai", 119, true, "Soft cottage-cheese dumplings in saffron milk."),
                menuItem("sweet-gulab-jamun", "Gulab Jamun", 89, true, "Warm milk-solid dumplings in sugar syrup.")
            ]
        },
        {
            title: "Ice Cream",
            itemCards: [
                menuItem("sweet-vanilla", "Vanilla Ice Cream", 99, true, "Classic creamy vanilla ice cream."),
                menuItem("sweet-chocolate", "Chocolate Ice Cream", 119, true, "Rich chocolate ice cream.")
            ]
        }
    ], "4.5", 20)
];
