import { configureStore } from "@reduxjs/toolkit";
import CartReducer, { restoreCart } from "./CartSlicer";

const CART_STORAGE_KEY = "swiggy-demo-cart";

function loadCart() {
    try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        const parsedCart = savedCart ? JSON.parse(savedCart) : [];
        if (!Array.isArray(parsedCart)) {
            throw new Error("Saved cart data is not a list.");
        }

        return parsedCart.filter((item) =>
            item &&
            typeof item.id === "string" &&
            typeof item.name === "string" &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0
        );
    } catch (error) {
        console.error("Could not restore the saved cart.", error);
        return [];
    }
}

export const store = configureStore({
    reducer: {
        cartslice: CartReducer,
    }
});

store.dispatch(restoreCart(loadCart()));
store.subscribe(() => {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(store.getState().cartslice.items));
    } catch (error) {
        console.error("Could not save the cart to this browser.", error);
    }
});