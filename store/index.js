import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice.js";
import cartReducer from "./slices/cartSlice.js";
import productsReducer from "./slices/productsSlice.js";
import wishlistReducer from "./slices/wishlistSlice.js";
import compareReducer from "./slices/compareSlice.js";
import authReducer from "./slices/authSlice.js";
import ordersReducer from "./slices/ordersSlice.js";
import messagesReducer from "./slices/messagesSlice.js";
import bannerReducer from "./slices/bannerSlice.js";
import settingsReducer from "./slices/settingsSlice.js";

// Custom middleware to save cart to localStorage with debounce
const cartMiddleware = store => next => action => {
    const result = next(action);
    if (action.type?.startsWith('cart/')) {
        const state = store.getState();
        // clearTimeout(window.cartSaveTimeout); // removed to avoid reference error if window is not ready
        // window.cartSaveTimeout = setTimeout(() => {
        // localStorage.setItem("tz_cart", JSON.stringify(state.cart.items));
        // }, 1000);
    }
    return result;
};

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        cart: cartReducer,
        products: productsReducer,
        wishlist: wishlistReducer,
        compare: compareReducer,
        auth: authReducer,
        orders: ordersReducer,
        messages: messagesReducer,
        banner: bannerReducer,
        settings: settingsReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartMiddleware)
});

export * from "./slices/uiSlice.js";
export * from "./slices/cartSlice.js";
export * from "./slices/productsSlice.js";
export * from "./slices/wishlistSlice.js";
export * from "./slices/compareSlice.js";
export * from "./slices/authSlice.js";
export * from "./slices/ordersSlice.js";
export * from "./slices/messagesSlice.js";
export * from "./slices/bannerSlice.js";
export * from "./slices/settingsSlice.js";
