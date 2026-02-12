
import { createSlice } from "@reduxjs/toolkit";
import { products as initialProducts } from "../../data/products.js";

const syncProducts = (key, fileProducts) => {
    try {
        const storedStr = localStorage.getItem(key);
        const storedCatalog = JSON.parse(localStorage.getItem("tz_catalog") || '{"categories": [], "brands": []}');

        if (!storedStr) return { products: fileProducts, ...storedCatalog };

        const storedProducts = JSON.parse(storedStr);

        // Strategy: Static Data from Files + Dynamic Data from Storage
        return {
            products: fileProducts.map(fp => {
                const sp = storedProducts.find(p => p.id === fp.id);
                if (!sp) return fp;

                return {
                    ...fp,
                    stock: sp.stock !== undefined ? sp.stock : fp.stock,
                    price: sp.price !== undefined ? sp.price : fp.price,
                    reviews_list: sp.reviews_list || fp.reviews_list,
                    reviews: sp.reviews !== undefined ? sp.reviews : fp.reviews,
                    rating: sp.rating !== undefined ? sp.rating : fp.rating,
                    isNew: sp.isNew !== undefined ? sp.isNew : fp.isNew,
                    isOutOfStock: sp.isOutOfStock !== undefined ? sp.isOutOfStock : fp.isOutOfStock,
                    variations: sp.variations !== undefined ? sp.variations : fp.variations
                };
            }),
            ...storedCatalog
        };
    } catch (e) {
        console.error(`Error syncing products from localStorage:`, e);
        return { products: fileProducts, categories: [], brands: [] };
    }
};

const productsSlice = createSlice({
    name: "products",
    initialState: {
        all: syncProducts("tz_products", initialProducts).products,
        customCategories: syncProducts("tz_products", initialProducts).categories || [],
        customBrands: syncProducts("tz_products", initialProducts).brands || []
    },
    reducers: {
        updateProducts: (state, action) => {
            state.all = action.payload;
            localStorage.setItem("tz_products", JSON.stringify(action.payload));
        },
        addCategory: (state, action) => {
            const newCat = action.payload;
            if (!state.customCategories.includes(newCat)) {
                state.customCategories.push(newCat);
                localStorage.setItem("tz_catalog", JSON.stringify({
                    categories: state.customCategories,
                    brands: state.customBrands
                }));
            }
        },
        addBrand: (state, action) => {
            const { name, category } = action.payload;
            if (!state.customBrands.some(b => b.name === name && b.category === category)) {
                state.customBrands.push({ name, category });
                localStorage.setItem("tz_catalog", JSON.stringify({
                    categories: state.customCategories,
                    brands: state.customBrands
                }));
            }
        },
        deleteBrand: (state, action) => {
            const { name, category } = action.payload;
            state.customBrands = state.customBrands.filter(b => !(b.name === name && b.category === category));
            localStorage.setItem("tz_catalog", JSON.stringify({
                categories: state.customCategories,
                brands: state.customBrands
            }));
        },
        deleteCategory: (state, action) => {
            state.customCategories = state.customCategories.filter(c => c !== action.payload);
            localStorage.setItem("tz_catalog", JSON.stringify({
                categories: state.customCategories,
                brands: state.customBrands
            }));
        },
        addReview: (state, action) => {
            const { productId, review } = action.payload;
            const product = state.all.find(p => p.id === productId);
            if (product) {
                const newReview = {
                    ...review,
                    id: Date.now(),
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
            const itemsToDeduct = action.payload;
            itemsToDeduct.forEach(item => {
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

export const {
    updateProducts, addReview, deleteReview, deductStock,
    addCategory, addBrand, deleteCategory, deleteBrand
} = productsSlice.actions;
export default productsSlice.reducer;
