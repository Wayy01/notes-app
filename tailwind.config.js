/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'cabinet-grotesk': ['Cabinet Grotesk', 'sans-serif'],
            },
            screens: {
                'mobile': {'max': '767px'},
                'md': '768px',
                // ... other breakpoints
            }
        }
    },
    plugins: [],
}
