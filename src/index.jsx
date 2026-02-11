
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from "react-redux";
import { store } from "./store";
import App from './App';


import { GoogleOAuthProvider } from '@react-oauth/google';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <GoogleOAuthProvider clientId="419228524081-427bi432q4a7oqrh60fha9b1fkjiu0n6.apps.googleusercontent.com">
                <PayPalScriptProvider options={{ "client-id": "test", currency: "USD" }}>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </PayPalScriptProvider>
            </GoogleOAuthProvider>
        </React.StrictMode>
    );
}
