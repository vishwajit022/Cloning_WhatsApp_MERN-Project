/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            //We could customise the css's name and style it accordingly
            colors: {
                bg: "#fff",
                dark_bg: "#000",
            }
        },
    },
    plugins: [],
}