
import { createSlice } from "@reduxjs/toolkit";

const compareSlice = createSlice({
    name: "compare",
    initialState: {
        items: []
    },
    reducers: {
        toggleCompare: (state, action) => {
            const exists = state.items.find(p => p.id === action.payload.id);
            if (exists) {
                state.items = state.items.filter(p => p.id !== action.payload.id);
            } else if (state.items.length < 3) {
                state.items.push(action.payload);
            }
        },
        clearCompare: (state) => {
            state.items = [];
        }
    }
});

export const { toggleCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;
