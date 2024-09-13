import DarkModeToggle from '@/components/DarkModeToggle';
import './globals.css'; // Import global styles

export const metadata = {
  title: 'Numbers to Words Converter',
  description: 'Convert numbers to words effortlessly!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 transition-colors duration-500 min-h-screen">
        {/* Header */}
        <header className="w-full p-4 md:p-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-md transition-all duration-500 fixed top-0 left-0 right-0">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold">Numbers to Words Converter ⚖️</h1>
            <DarkModeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-80px)] py-4 md:py-6 lg:py-8 mt-20">
          {children}
        </main>
      </body>
    </html>
  );
}

