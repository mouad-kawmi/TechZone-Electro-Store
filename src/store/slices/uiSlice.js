
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
        view: localStorage.getItem("tz_view") || "HOME",
        activeCategory: localStorage.getItem("tz_active_cat") || "All",
        activeBrand: localStorage.getItem("tz_active_brand") || "All",
        selectedProductId: localStorage.getItem("tz_selected_id") || null,
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
            localStorage.setItem("tz_view", action.payload);
            window.scrollTo(0, 0);
        },
        setSelectedProductId: (state, action) => {
            state.selectedProductId = action.payload;
            if (action.payload) {
                localStorage.setItem("tz_selected_id", action.payload);
            } else {
                localStorage.removeItem("tz_selected_id");
            }
        },
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload;
            localStorage.setItem("tz_active_cat", action.payload);
        },
        setActiveBrand: (state, action) => {
            state.activeBrand = action.payload;
            localStorage.setItem("tz_active_brand", action.payload);
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
    setToast, toggleCart, toggleWishlistDrawer, setSelectedProductId
} = uiSlice.actions;

export default uiSlice.reducer;
