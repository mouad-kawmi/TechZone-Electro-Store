
import { createSlice } from "@reduxjs/toolkit";

const safeParse = (key, fallback) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch (e) {
        return fallback;
    }
};

const sampleOrders = [
    {
        id: "TZ-482931",
        date: "05 Fév 2024",
        status: "En Cours",
        amount: 12499,
        finalTotal: 12499,
        customerName: "Mohamed Amine",
        email: "amine@example.com",
        items: [
            { id: 1, name: "iPhone 15 Pro", price: 12499, quantity: 1, image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=2070&auto=format&fit=crop" }
        ]
    },
    {
        id: "TZ-928374",
        date: "08 Fév 2024",
        status: "Expédié",
        amount: 8990,
        finalTotal: 8990,
        customerName: "Sarah Mansouri",
        email: "sarah@test.ma",
        items: [
            { id: 2, name: "Samsung Galaxy S23", price: 8990, quantity: 1, image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=1974&auto=format&fit=crop" }
        ]
    }
];

const initialState = {
    allOrders: (() => {
        const saved = safeParse("tz_orders", []);
        return (saved && saved.length > 0) ? saved : sampleOrders;
    })(),
    isLoading: false,
    error: null
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            console.log('🔥 ordersSlice.addOrder appelé avec:', action.payload);
            state.allOrders.unshift(action.payload);
            localStorage.setItem("tz_orders", JSON.stringify(state.allOrders));
            console.log('💾 Commande sauvegardée dans localStorage. Total commandes:', state.allOrders.length);
        },
        updateOrderStatus: (state, action) => {
            const { id, status } = action.payload;
            const order = state.allOrders.find(o => o.id === id);
            if (order) {
                order.status = status;
                localStorage.setItem("tz_orders", JSON.stringify(state.allOrders));
            }
        },
        clearOrders: (state) => {
            state.allOrders = [];
            localStorage.removeItem("tz_orders");
        }
    }
});

export const { addOrder, updateOrderStatus, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
