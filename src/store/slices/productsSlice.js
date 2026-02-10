
import { createSlice } from "@reduxjs/toolkit";
import { products as initialProducts } from "../../data/products.js";

const syncProducts = (key, fileProducts) => {
    try {
        const storedStr = localStorage.getItem(key);
        if (!storedStr) return fileProducts;

        const storedProducts = JSON.parse(storedStr);

        // Strategy: Static Data from Files + Dynamic Data from Storage
        // This ensures that edits in products.js (specs, titles, etc.) are always visible
        return fileProducts.map(fp => {
            const sp = storedProducts.find(p => p.id === fp.id);
            if (!sp) return fp;

            return {
                ...fp, // Prioritize file data (titles, specs, categories, images)
                // Keep dynamic data from storage if it exists
                stock: sp.stock !== undefined ? sp.stock : fp.stock,
                price: sp.price !== undefined ? sp.price : fp.price,
                reviews_list: sp.reviews_list || fp.reviews_list,
                reviews: sp.reviews !== undefined ? sp.reviews : fp.reviews,
                rating: sp.rating !== undefined ? sp.rating : fp.rating,
                isNew: sp.isNew !== undefined ? sp.isNew : fp.isNew,
                isOutOfStock: sp.isOutOfStock !== undefined ? sp.isOutOfStock : fp.isOutOfStock,
                variations: fp.variations || sp.variations // Prefer variations from files for structural changes
            };
        });
    } catch (e) {
        console.error(`Error syncing products from localStorage:`, e);
        return fileProducts;
    }
};

const productsSlice = createSlice({
    name: "products",
    initialState: {
        all: syncProducts("tz_products", initialProducts)
    },
    reducers: {
        updateProducts: (state, action) => {
            state.all = action.payload;
            localStorage.setItem("tz_products", JSON.stringify(action.payload));
        },
        addReview: (state, action) => {
            const { productId, review } = action.payload;
            const product = state.all.find(p => p.id === productId);
            if (product) {
                const newReview = {
                    ...review,
                    id: Date.now(), // Generate a unique ID for the review
                    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                };
                product.reviews_list = [newReview, ...(product.reviews_list || [])];
                product.reviews = (product.reviews || 0) + 1;
                localStorage.setItem("tz_products", JSON.stringify(state.all));
            }
        },
        deleteReview: (state, action) => {
            const { productId, reviewId } = action.payload;
            const product = state.all.find(p => p.id === productId);
            if (product && product.reviews_list) {
                product.reviews_list = product.reviews_list.filter(r => r.id !== reviewId);
                product.reviews = Math.max(0, product.reviews_list.length);
                localStorage.setItem("tz_products", JSON.stringify(state.all));
            }
        },
        deductStock: (state, action) => {
            const itemsToDeduct = action.payload; // Array of { id, quantity }
            itemsToDeduct.forEach(item => {
                // Check both .productId and .id to handle different item structures
                const itemId = item.productId || item.id;
                const product = state.all.find(p => String(p.id) === String(itemId));

                if (product && product.stock !== undefined) {
                    const deductQty = Number(item.quantity) || 1;
                    product.stock = Math.max(0, product.stock - deductQty);
                    product.isOutOfStock = product.stock <= 0;
                }
            });
            localStorage.setItem("tz_products", JSON.stringify(state.all));
        }
    }
});

export const { updateProducts, addReview, deleteReview, deductStock } = productsSlice.actions;
export default productsSlice.reducer;
