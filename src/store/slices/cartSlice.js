
import { createSlice } from "@reduxjs/toolkit";

const safeParse = (key, fallback) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch (e) {
        console.error(`Error parsing localStorage key "${key}":`, e);
        return fallback;
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: safeParse("tz_cart", [])
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existing = state.items.find(item =>
                item.id === product.id &&
                item.selectedStorage === product.selectedStorage &&
                item.selectedColor === product.selectedColor
            );

            // Find current stock for this variation
            let availableStock = product.stock;
            if (product.variations?.storage) {
                const storageVar = product.variations.storage.find(s =>
                    (typeof s === 'object' ? s.name : s) === product.selectedStorage
                );
                if (storageVar && typeof storageVar === 'object') {
                    availableStock = storageVar.stock;
                }
            }

            if (existing) {
                if (existing.quantity < availableStock) {
                    existing.quantity += 1;
                }
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
            localStorage.setItem("tz_cart", JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                const newQuantity = item.quantity + action.payload.delta;

                // Get stock limit
                let availableStock = item.stock;
                if (item.variations?.storage) {
                    const storageVar = item.variations.storage.find(s =>
                        (typeof s === 'object' ? s.name : s) === item.selectedStorage
                    );
                    if (storageVar && typeof storageVar === 'object') {
                        availableStock = storageVar.stock;
                    }
                }

                if (newQuantity >= 1 && newQuantity <= availableStock) {
                    item.quantity = newQuantity;
                }
            }
            localStorage.setItem("tz_cart", JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem("tz_cart");
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
