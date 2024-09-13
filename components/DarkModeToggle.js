'use client';
import { useEffect, useState } from 'react'; // Bringing in hooks to manage component state and lifecycle
import classNames from 'classnames'; // Using this to conditionally apply CSS classes

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false); // State to track whether dark mode is on or off

  useEffect(() => {
    // Checking if the user has a dark mode preference stored in localStorage or if their system prefers dark mode
    if (
      localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark'); // Apply dark mode class to the root element
      setDarkMode(true); // Update state to reflect dark mode is enabled
    } else {
      document.documentElement.classList.remove('dark'); // Otherwise, remove the dark mode class
    }
  }, []); // Empty dependency array so this effect runs only once when the component mounts

  const toggleDarkMode = () => {
    // Toggling between dark and light mode
    if (darkMode) {
      document.documentElement.classList.remove('dark'); // Turn off dark mode
      localStorage.setItem('theme', 'light'); // Store user's preference in localStorage as light mode
    } else {
      document.documentElement.classList.add('dark'); // Turn on dark mode
      localStorage.setItem('theme', 'dark'); // Store user's preference in localStorage as dark mode
    }
    setDarkMode(!darkMode); // Update state to the opposite of its current value
  };

  return (
    <button
      onClick={toggleDarkMode} // Toggle dark mode on button click
      className={classNames(
        'text-4xl p-0 transition-all duration-500 transform hover:scale-110 border-none focus:outline-none', // Styling for the button with hover and focus effects
        darkMode ? 'text-yellow-400' : 'text-gray-900' // Apply different colors based on whether dark mode is active or not
      )}
    >
      {darkMode ? '🌕' : '🌑'} {/* Switch between moon (dark mode) and sun (light mode) emoji */}
    </button>
  );
}
