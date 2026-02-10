
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

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: safeParse("tz_wishlist", [])
    },
    reducers: {
        toggleWishlist: (state, action) => {
            const exists = state.items.find(p => p.id === action.payload.id);
            if (exists) {
                state.items = state.items.filter(p => p.id !== action.payload.id);
            } else {
                state.items.push(action.payload);
            }
            localStorage.setItem("tz_wishlist", JSON.stringify(state.items));
        }
    }
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
