import DarkModeToggle from '@/components/DarkModeToggle'; 
import './globals.css'; // Import global styles

// Setting up metadata for the page, which helps with SEO and accessibility
export const metadata = {
  title: 'Numbers to Words Converter', // The title of the page, super important!
  description: 'Convert numbers to words effortlessly!', // Nice, concise description for search engines
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"> {/* Specifying the language for accessibility */}
      <body className="bg-gray-50 dark:bg-gray-900 transition-colors duration-500 min-h-screen">
        {/* Header */}
        <header className="w-full p-4 md:p-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-md transition-all duration-500 fixed top-0 left-0 right-0">
          <div className="container mx-auto flex items-center justify-between">
            {/* The main header title with a little emoji for some personality */}
            <h1 className="text-3xl md:text-4xl font-bold">Numbers to Words Converter ⚖️</h1>
            {/* Toggle for dark mode */}
            <DarkModeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-80px)] py-4 md:py-6 lg:py-8 mt-20">
          {/* This is where the main content of each page will be injected */}
          {children}
        </main>
      </body>
    </html>
  );
}
