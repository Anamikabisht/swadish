const product = (id, name, unit, price, emoji, description) => ({
    id: `grocery-${id}`,
    name,
    unit,
    defaultPrice: price * 100,
    emoji,
    description,
    category: "grocery"
});

export const groceryProductsByCategory = {
    "Fresh Vegetables": [
        product("tomato", "Farm Fresh Tomatoes", "500 g", 35, "🍅", "Juicy tomatoes, picked fresh."),
        product("potato", "Potatoes", "1 kg", 42, "🥔", "Everyday potatoes for your kitchen."),
        product("spinach", "Fresh Spinach", "1 bunch", 28, "🥬", "Tender leafy greens, washed and packed."),
        product("onion", "Red Onions", "1 kg", 48, "🧅", "Fresh onions for daily cooking.")
    ],
    "Fresh Fruits": [
        product("banana", "Robusta Bananas", "6 pieces", 42, "🍌", "Naturally sweet bananas."),
        product("apple", "Red Apples", "4 pieces", 129, "🍎", "Crisp apples, perfect for snacking."),
        product("orange", "Juicy Oranges", "4 pieces", 79, "🍊", "Refreshing seasonal citrus."),
        product("grapes", "Green Grapes", "500 g", 89, "🍇", "Sweet, seedless table grapes.")
    ],
    "Dairy, Bread and Eggs": [
        product("milk", "Whole Toned Milk", "1 litre", 60, "🥛", "Fresh pasteurised milk."),
        product("bread", "Whole Wheat Bread", "400 g", 45, "🍞", "Soft sliced bread for breakfast."),
        product("eggs", "Farm Eggs", "6 pieces", 58, "🥚", "Protein-rich everyday eggs."),
        product("paneer", "Fresh Paneer", "200 g", 89, "🧀", "Soft paneer for curries and snacks.")
    ],
    "Atta, Rice and Dals": [
        product("atta", "Whole Wheat Atta", "1 kg", 62, "🌾", "Stone-ground wheat flour."),
        product("rice", "Everyday Basmati Rice", "1 kg", 99, "🍚", "Aromatic long-grain rice."),
        product("toor-dal", "Toor Dal", "1 kg", 149, "🫘", "Cleaned and packed split pigeon peas."),
        product("moong-dal", "Moong Dal", "500 g", 79, "🫘", "Versatile split yellow lentils.")
    ],
    "Masalas and Dry Fruits": [
        product("turmeric", "Turmeric Powder", "100 g", 42, "🟡", "Aromatic ground turmeric."),
        product("almonds", "Whole Almonds", "200 g", 189, "🥜", "Crunchy almonds for a wholesome snack."),
        product("cashews", "Whole Cashews", "200 g", 219, "🥜", "Creamy premium cashews."),
        product("chilli", "Red Chilli Powder", "100 g", 55, "🌶️", "Bold colour and balanced heat.")
    ],
    "Oils and Ghee": [
        product("sunflower-oil", "Sunflower Oil", "1 litre", 149, "🫗", "Light cooking oil for everyday meals."),
        product("ghee", "Pure Cow Ghee", "500 ml", 299, "🧈", "Rich aroma and traditional flavour."),
        product("mustard-oil", "Kachi Ghani Mustard Oil", "1 litre", 179, "🫗", "Bold, pungent cooking oil."),
        product("olive-oil", "Extra Virgin Olive Oil", "250 ml", 249, "🫒", "A versatile finishing and cooking oil.")
    ],
    "Munchies": [
        product("chips", "Classic Salted Chips", "1 pack", 20, "🥔", "Crispy salted potato chips."),
        product("namkeen", "Aloo Bhujia", "200 g", 55, "🥨", "A crunchy, savoury tea-time snack."),
        product("popcorn", "Butter Popcorn", "3 packs", 99, "🍿", "Movie-night popcorn made easy."),
        product("peanuts", "Roasted Peanuts", "200 g", 49, "🥜", "Crunchy roasted peanuts.")
    ],
    "Sweet Tooth": [
        product("chocolate", "Milk Chocolate Bar", "100 g", 99, "🍫", "Smooth and creamy chocolate."),
        product("cookies", "Choco Chip Cookies", "200 g", 79, "🍪", "Buttery cookies with chocolate chips."),
        product("rasgulla", "Rasgulla", "500 g", 129, "🍡", "Soft cottage-cheese sweets in syrup."),
        product("ice-cream", "Vanilla Ice Cream", "500 ml", 159, "🍨", "Classic creamy vanilla dessert.")
    ],
    "Cold Drinks and Juices": [
        product("orange-juice", "Orange Juice", "1 litre", 119, "🧃", "Refreshing fruit juice."),
        product("cola", "Cola", "750 ml", 45, "🥤", "Chilled, fizzy soft drink."),
        product("coconut-water", "Tender Coconut Water", "200 ml", 45, "🥥", "Light and refreshing hydration."),
        product("lemon-drink", "Lemon Soda", "750 ml", 40, "🍋", "Sparkling lemon refreshment.")
    ],
    "Biscuits and Cakes": [
        product("digestive-biscuits", "Digestive Biscuits", "250 g", 45, "🍪", "Wheat biscuits for tea time."),
        product("cream-biscuits", "Chocolate Cream Biscuits", "150 g", 35, "🍪", "Crunchy biscuits with chocolate filling."),
        product("cup-cakes", "Vanilla Cupcakes", "2 pieces", 69, "🧁", "Soft, individually packed cupcakes."),
        product("rusk", "Elaichi Rusk", "200 g", 55, "🍞", "Crisp, lightly spiced tea rusk.")
    ],
    "Instant and Frozen Food": [
        product("noodles", "Instant Masala Noodles", "pack of 4", 56, "🍜", "Quick noodles with a flavour sachet."),
        product("frozen-peas", "Frozen Green Peas", "500 g", 89, "🫛", "Convenient frozen vegetables."),
        product("frozen-paratha", "Whole Wheat Parathas", "pack of 5", 99, "🫓", "Ready-to-cook frozen flatbreads."),
        product("pasta", "Penne Pasta", "500 g", 79, "🍝", "Durum wheat pasta for easy meals.")
    ],
    "Hygiene and Wellness": [
        product("sanitizer", "Hand Sanitizer", "250 ml", 99, "🧴", "Convenient hand-cleaning gel."),
        product("bandages", "Adhesive Bandages", "pack of 10", 49, "🩹", "Flexible everyday first-aid strips."),
        product("vitamin-c", "Vitamin C Tablets", "pack of 30", 149, "💊", "Daily wellness supplement."),
        product("tissues", "Pocket Tissues", "pack of 6", 59, "🧻", "Soft tissues for on-the-go use.")
    ],
    "Meat and Seafood": [
        product("chicken", "Chicken Breast", "500 g", 189, "🍗", "Fresh, cleaned chicken breast."),
        product("eggs-meat", "Country Chicken Eggs", "6 pieces", 79, "🥚", "Fresh country eggs."),
        product("prawns", "Cleaned Prawns", "250 g", 249, "🍤", "Cleaned prawns, ready to cook."),
        product("fish", "Fresh Fish Fillets", "300 g", 229, "🐟", "Boneless fish portions.")
    ],
    "Cleaning Essentials": [
        product("dishwash", "Dishwash Liquid", "500 ml", 99, "🧽", "Cuts through everyday grease."),
        product("floor-cleaner", "Floor Cleaner", "1 litre", 149, "🧹", "Fresh-scented household floor cleaner."),
        product("laundry", "Laundry Detergent", "1 kg", 129, "🫧", "Everyday detergent for clean clothes."),
        product("garbage-bags", "Garbage Bags", "pack of 30", 89, "🗑️", "Strong bags for home waste.")
    ],
    "Bath, Body and Hair": [
        product("body-wash", "Refreshing Body Wash", "250 ml", 179, "🧴", "A gentle everyday body wash."),
        product("shampoo", "Daily Care Shampoo", "340 ml", 199, "🧴", "Cleans and refreshes your hair."),
        product("soap", "Bathing Soap", "pack of 4", 119, "🧼", "Gentle cleansing bars."),
        product("toothpaste", "Mint Toothpaste", "150 g", 99, "🪥", "Fresh mint daily oral care.")
    ],
    "Cereals and Breakfast": [
        product("oats", "Rolled Oats", "500 g", 129, "🥣", "A simple, versatile breakfast staple."),
        product("cornflakes", "Corn Flakes", "500 g", 179, "🥣", "Crunchy cereal for breakfast."),
        product("peanut-butter", "Creamy Peanut Butter", "340 g", 189, "🥜", "Smooth spread for toast and snacks."),
        product("honey", "Natural Honey", "250 g", 149, "🍯", "Sweet honey for breakfast and drinks.")
    ],
    "Sauces and Spreads": [
        product("ketchup", "Tomato Ketchup", "500 g", 99, "🍅", "Classic tomato sauce for snacks."),
        product("mayonnaise", "Eggless Mayonnaise", "250 g", 89, "🥪", "Creamy spread for sandwiches."),
        product("jam", "Mixed Fruit Jam", "200 g", 79, "🍓", "Fruity breakfast spread."),
        product("chilli-sauce", "Red Chilli Sauce", "200 g", 65, "🌶️", "A spicy dip and cooking sauce.")
    ],
    "Tea, Coffee and More": [
        product("tea", "Assam Tea", "250 g", 149, "🍵", "Strong black tea for your daily cup."),
        product("coffee", "Instant Coffee", "100 g", 199, "☕", "Rich instant coffee granules."),
        product("green-tea", "Green Tea Bags", "pack of 25", 129, "🍵", "Light and aromatic tea bags."),
        product("hot-chocolate", "Hot Chocolate Mix", "200 g", 179, "☕", "A comforting chocolate drink mix.")
    ],
    "Paan Corner": [
        product("mint-gum", "Mint Chewing Gum", "pack of 10", 50, "🌿", "Sugar-free mint chewing gum."),
        product("mouth-freshener", "Classic Mouth Freshener", "100 g", 89, "🌱", "Aromatic after-meal mouth freshener."),
        product("fennel", "Sweet Fennel Seeds", "100 g", 69, "🌿", "Lightly sweetened fennel seeds."),
        product("clove", "Whole Cloves", "50 g", 59, "🌰", "Aromatic spice for cooking and tea.")
    ],
    "Home and Kitchen": [
        product("storage-box", "Food Storage Containers", "set of 3", 249, "🥡", "Reusable containers for kitchen storage."),
        product("mug", "Everyday Ceramic Mug", "1 piece", 149, "☕", "A sturdy mug for hot drinks."),
        product("foil", "Kitchen Aluminium Foil", "9 m", 99, "🍱", "Wrap and store food conveniently."),
        product("sponge", "Kitchen Scrub Sponge", "pack of 3", 49, "🧽", "Reusable scrubbers for dish cleaning.")
    ],
    "Office and Electricals": [
        product("notebook", "A5 Ruled Notebook", "1 piece", 59, "📓", "Ruled pages for notes and lists."),
        product("pens", "Blue Ball Pens", "pack of 5", 49, "🖊️", "Smooth everyday writing pens."),
        product("batteries", "AA Alkaline Batteries", "pack of 4", 99, "🔋", "Reliable power for household devices."),
        product("cable", "USB Charging Cable", "1 metre", 199, "🔌", "Everyday charging cable.")
    ],
    "Baby Care": [
        product("baby-wipes", "Gentle Baby Wipes", "pack of 72", 149, "🧸", "Soft wipes for delicate skin."),
        product("baby-lotion", "Baby Moisturising Lotion", "200 ml", 199, "🧴", "Gentle daily moisturiser."),
        product("baby-diapers", "Baby Diapers", "pack of 10", 229, "👶", "Soft and absorbent disposable diapers."),
        product("baby-shampoo", "Mild Baby Shampoo", "200 ml", 179, "🫧", "Gentle no-tears hair wash.")
    ],
    "Pet Supplies": [
        product("dog-food", "Adult Dog Food", "1 kg", 299, "🐶", "Complete everyday nutrition for dogs."),
        product("cat-food", "Adult Cat Food", "1 kg", 329, "🐱", "Crunchy food for adult cats."),
        product("pet-treats", "Chicken Pet Treats", "100 g", 119, "🦴", "A tasty treat for your pet."),
        product("cat-litter", "Clumping Cat Litter", "5 kg", 349, "🐾", "Absorbent litter for cat trays.")
    ],
    "Beauty and Grooming": [
        product("facewash", "Gentle Face Wash", "100 ml", 149, "🧴", "A refreshing daily face cleanser."),
        product("sunscreen", "SPF 50 Sunscreen", "50 g", 299, "☀️", "Lightweight sun protection."),
        product("deodorant", "Fresh Deodorant", "150 ml", 199, "🌸", "Everyday freshness."),
        product("hair-oil", "Nourishing Hair Oil", "200 ml", 129, "💆", "Traditional oil for hair care.")
    ]
};
