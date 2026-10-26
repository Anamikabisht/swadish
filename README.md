# Swadish food ordering demo

A responsive React portfolio project for restaurant discovery and a local food-ordering flow. It uses sample data bundled with the app; it does not connect to a live restaurant API, a payment provider, or a delivery service.

## Run locally

Requirements: Node.js and npm.

```powershell
npm install
npm start
```

Open the local URL printed by Parcel, usually `http://localhost:1234`.

## Features

- Search restaurants, cuisines, and dishes.
- Filter restaurants by cuisine and minimum rating; sort by rating or delivery time.
- Browse sample restaurant menus and filter vegetarian/non-vegetarian items.
- Search dishes within a restaurant menu.
- Add items to the cart, change quantities, remove items, and clear the cart.
- Restore the cart from browser `localStorage` after a refresh.
- Complete a validated demo checkout and see an order confirmation.
- Browse sample products across grocery categories; add products to the shared cart and adjust or remove quantities.
- Browse locally bundled grocery categories and Dineout sample listings.
- Search and filter Dineout venues by cuisine, area, and rating; save favorites in the browser.
- View Dineout offers and venue highlights, and make a demo table reservation.
- Responsive layouts, keyboard focus states, labeled controls, and empty-result states.

## Demo data and checkout

Restaurant and menu data is maintained in `src/Utils/LocalRestaurantData.js`. Grocery categories and sample products are maintained in `src/Utils/Grocery.js` and `src/Utils/GroceryProducts.js`; Dineout venue information uses `src/Utils/DineData.js`. Food menu and restaurant cards use shared food photos selected from `src/Utils/FoodImages.js`. Dineout venues share stock restaurant images listed in `src/Utils/DineoutImages.js`. Photos are loaded from Unsplash and require an internet connection; if a photo cannot load, the app displays a branded placeholder. Add or edit those datasets to change the demo content.

Checkout and Dineout reservations only simulate real services. Checkout calculates an estimated 5% tax and a flat delivery fee, but does not collect payment or submit delivery details. Reservations and favorite venue IDs are saved in the current browser only; no restaurant is contacted and no booking is actually made.

## Production build

```powershell
npx parcel build src/index.html
```
