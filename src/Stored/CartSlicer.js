import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
    name: "cartslice",
    initialState: {
        items: []
    },
    reducers: {
        restoreCart: (state, action) => {
            state.items = Array.isArray(action.payload) ? action.payload : [];
        },
        addItem: (state, action) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        incrementItem: (state, action) => {
            const item = state.items.find((cartItem) => cartItem.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementItem: (state, action) => {
            const item = state.items.find((cartItem) => cartItem.id === action.payload);
            if (!item) return;

            if (item.quantity <= 1) {
                state.items = state.items.filter((cartItem) => cartItem.id !== action.payload);
            } else {
                item.quantity -= 1;
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const { restoreCart, addItem, incrementItem, decrementItem, removeItem, clearCart } = cart.actions;
export default cart.reducer;
