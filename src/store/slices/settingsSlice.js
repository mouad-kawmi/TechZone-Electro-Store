import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: 'TechZone Electro',
    email: 'contact@techzone.ma',
    phone: '+212 600 000 000',
    address: 'Twin Center, Casablanca'
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        updateSettings: (state, action) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
