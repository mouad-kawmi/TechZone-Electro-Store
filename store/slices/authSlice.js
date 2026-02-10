
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

const initialState = {
    user: safeParse("tz_user", null),
    isLoggedIn: !!safeParse("tz_user", null),
    token: safeParse("tz_token", null),
    isLoading: false,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("tz_user", JSON.stringify(action.payload.user));
            localStorage.setItem("tz_token", JSON.stringify(action.payload.token));
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.token = null;
            localStorage.removeItem("tz_user");
            localStorage.removeItem("tz_token");
        },
        registerSuccess: (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("tz_user", JSON.stringify(action.payload.user));
            localStorage.setItem("tz_token", JSON.stringify(action.payload.token));
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            localStorage.setItem("tz_user", JSON.stringify(state.user));
        }
    }
});

export const {
    loginStart, loginSuccess, loginFailure,
    logout, registerSuccess, updateUser
} = authSlice.actions;

export default authSlice.reducer;
