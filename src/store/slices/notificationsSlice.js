import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifications: JSON.parse(localStorage.getItem('tz_admin_notifications') || '[]'),
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            const newNotification = {
                id: Date.now(),
                timestamp: Date.now(),
                read: false,
                ...action.payload
            };
            state.notifications.unshift(newNotification);
            localStorage.setItem('tz_admin_notifications', JSON.stringify(state.notifications));
        },
        markNotificationRead: (state, action) => {
            const notification = state.notifications.find(n => n.id === action.payload);
            if (notification) {
                notification.read = true;
                localStorage.setItem('tz_admin_notifications', JSON.stringify(state.notifications));
            }
        },
        markAllAsRead: (state) => {
            state.notifications.forEach(n => n.read = true);
            localStorage.setItem('tz_admin_notifications', JSON.stringify(state.notifications));
        },
        clearNotifications: (state) => {
            state.notifications = [];
            localStorage.removeItem('tz_admin_notifications');
        }
    }
});

export const { addNotification, markNotificationRead, markAllAsRead, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
