/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-background-primary': '#FFFFFF',
        'light-background-secondary': '#F0F2F5',
        'light-background-accent1': '#f9fafb',
        'light-accent1': '#3b82f6',
        'light-accent2': '#10b981',
        'light-success': '#16a34a',
        'light-success-hover': '#22c55e',
        'light-danger': '#EF4444',
        'light-warning': '#F59E0B',
        'light-info': '#06b6d4',
        'light-info-hover': '#0891b2',
        'light-title-text': '#333333',
        'light-primary-text': '#667085',
        'light-secondary-text': '#FFFFFF',
        'light-button-primary': '#3b82f6',
        'light-button-primary-hover': '#2563eb',
        'light-button-secondary': '#10b981',
        'light-button-secondary-hover': '#059669',
        'light-border': '#e2e8f0'

      },
      fontFamily: {
        'special': ['Fira Sans', 'sans-serif'],
        'heading': ['Raleway', 'sans-serif'],
        'body': ['Nunito Sans', 'sans-serif']
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite'
      }
    }
  },
  plugins: [],
}

