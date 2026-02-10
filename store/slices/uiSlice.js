
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

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        isDarkMode: safeParse("tz_dark_mode", false),
        view: "HOME",
        activeCategory: "All",
        activeBrand: "All",
        searchQuery: "",
        toast: null,
        isCartOpen: false,
        isWishlistOpen: false
    },
    reducers: {
        setDarkMode: (state, action) => {
            state.isDarkMode = action.payload;
            localStorage.setItem("tz_dark_mode", JSON.stringify(action.payload));
        },
        setView: (state, action) => {
            state.view = action.payload;
            window.scrollTo(0, 0);
        },
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload;
        },
        setActiveBrand: (state, action) => {
            state.activeBrand = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setToast: (state, action) => {
            state.toast = action.payload;
        },
        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
        toggleWishlistDrawer: (state) => {
            state.isWishlistOpen = !state.isWishlistOpen;
        }
    }
});

export const {
    setDarkMode, setView, setActiveCategory, setActiveBrand, setSearchQuery,
    setToast, toggleCart, toggleWishlistDrawer
} = uiSlice.actions;

export default uiSlice.reducer;
