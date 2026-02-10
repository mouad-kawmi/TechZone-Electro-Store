
import { createSlice } from "@reduxjs/toolkit";

const safeParse = (key, fallback) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch (e) {
        return fallback;
    }
};

const initialState = {
    promo: {
        isActive: safeParse("tz_promo_active", true),
        selectedProductIds: safeParse("tz_promo_products", []),
        expiryTime: safeParse("tz_promo_expiry", null),
    },
    flash: {
        isActive: safeParse("tz_flash_active", true),
        selectedProductIds: safeParse("tz_flash_products", []),
        expiryTime: safeParse("tz_flash_expiry", null),
    }
};

const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {
        toggleBanner: (state, action) => {
            const { type, value } = action.payload; // type: 'promo' | 'flash'
            state[type].isActive = value;
            localStorage.setItem(`tz_${type}_active`, JSON.stringify(value));
        },
        setSelectedProducts: (state, action) => {
            const { type, productIds } = action.payload;
            state[type].selectedProductIds = productIds;
            localStorage.setItem(`tz_${type}_products`, JSON.stringify(productIds));
        },
        setBannerExpiry: (state, action) => {
            const { type, hours } = action.payload;
            if (hours === null) {
                state[type].expiryTime = null;
            } else {
                state[type].expiryTime = Date.now() + hours * 60 * 60 * 1000;
            }
            localStorage.setItem(`tz_${type}_expiry`, JSON.stringify(state[type].expiryTime));
        },
        checkExpiry: (state) => {
            ['promo', 'flash'].forEach(type => {
                if (state[type].expiryTime && Date.now() > state[type].expiryTime) {
                    state[type].isActive = false;
                    state[type].expiryTime = null;
                    localStorage.setItem(`tz_${type}_active`, JSON.stringify(false));
                    localStorage.removeItem(`tz_${type}_expiry`);
                }
            });
        }
    }
});

export const { toggleBanner, setSelectedProducts, setBannerExpiry, checkExpiry } = bannerSlice.actions;
export default bannerSlice.reducer;
