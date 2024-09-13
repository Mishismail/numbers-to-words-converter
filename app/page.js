import ConverterForm from '@/components/ConverterForm';
import './globals.css';

export default function Home() {
  return (
    <section className="main-container w-full flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* Center the Converter Form */}
      <ConverterForm />
    </section>
  );
}
