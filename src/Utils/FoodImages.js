const foodImages = [
    {
        keywords: ["pizza", "garlic bread"],
        url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85"
    },
    {
        keywords: ["pasta", "noodle", "macaroni"],
        url: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85"
    },
    {
        keywords: ["burger", "fries"],
        url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85"
    },
    {
        keywords: ["biryani", "rice"],
        url: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=900&q=85"
    },
    {
        keywords: ["dosa", "idli", "vada", "sambar"],
        url: "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=900&q=85"
    },
    {
        keywords: ["chicken", "kebab", "tikka", "meat"],
        url: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85"
    },
    {
        keywords: ["paneer", "dal", "curry", "masala", "naan", "north indian"],
        url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85"
    },
    {
        keywords: ["cake", "brownie", "chocolate", "sweet", "dessert", "ice cream", "rasmalai", "gulab jamun"],
        url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85"
    },
    {
        keywords: ["dining", "restaurant", "cafe", "continental"],
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85"
    }
];

const defaultFoodImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85";

export function getFoodImage(value = "") {
    const normalizedValue = value.toLowerCase();
    return foodImages.find(({ keywords }) =>
        keywords.some((keyword) => normalizedValue.includes(keyword))
    )?.url || defaultFoodImage;
}
