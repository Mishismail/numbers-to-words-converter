'use client';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={classNames(
        'text-4xl p-0 transition-all duration-500 transform hover:scale-110 border-none focus:outline-none',
        darkMode ? 'text-yellow-400' : 'text-gray-900'
      )}
    >
      {darkMode ? '🌕' : '🌑'}
    </button>
  );
}
