// app/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import './globals.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  );

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Default to system preference if no saved theme
      const initialTheme = systemPrefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.classList.toggle(
        'dark',
        initialTheme === 'dark'
      );
    }
  }, []);

  return (
    <html lang="en" className={theme === 'dark' ? 'dark' : ''}>
      <head />
      <body className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        {/* Navbar */}
        <nav className="bg-white dark:bg-gray-800 shadow p-4 mb-6 transition-colors duration-200">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              <Link href="/" className="text-gray-800 dark:text-white">
                Cloudflare Pages and Contentful
              </Link>
            </h1>
            <button
              onClick={toggleTheme}
              className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md text-gray-800 dark:text-gray-100"
            >
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
          </div>
        </nav>

        {/* Main content */}
        <main className="container mx-auto px-4">{children}</main>
      </body>
    </html>
  );
};

export default Layout;
