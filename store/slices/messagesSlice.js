
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: JSON.parse(localStorage.getItem("tz_messages") || "[]")
};

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            const newMessage = {
                id: Date.now(),
                ...action.payload,
                date: new Date().toISOString(),
                read: false
            };
            state.items.unshift(newMessage);
            localStorage.setItem("tz_messages", JSON.stringify(state.items));
        },
        markAsRead: (state, action) => {
            const message = state.items.find(m => m.id === action.payload);
            if (message) {
                message.read = true;
                localStorage.setItem("tz_messages", JSON.stringify(state.items));
            }
        },
        deleteMessage: (state, action) => {
            state.items = state.items.filter(m => m.id !== action.payload);
            localStorage.setItem("tz_messages", JSON.stringify(state.items));
        }
    }
});

export const { addMessage, markAsRead, deleteMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
