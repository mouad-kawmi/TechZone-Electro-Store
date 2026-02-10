import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./views/**/*.{js,ts,jsx,tsx}",
        "./store/**/*.{js,ts,jsx,tsx}",
        "./store.js",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#0F172A',
                accent: '#3B82F6',
                slate: {
                    950: '#020617',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [
        forms,
        typography,
        containerQueries,
    ],
}
