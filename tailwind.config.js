module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Correct file structure for Next.js App Directory
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#111827',
          800: '#1F2937',
          700: '#374151',
          200: '#E5E7EB',
          100: '#F3F4F6',
        },
        blue: {
          600: '#0070F3', // Next.js Blue
          500: '#3B82F6',
        },
      },
      fontSize: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      spacing: {
        '18': '4.5rem',
        '128': '32rem',
        'none': '0',      // Adding "none" for zero spacing
        'sm': '1rem',     // Small gap between elements
        'md': '2rem',     // Medium gap to avoid too much space
      },
    },
  },
  plugins: [],
};

