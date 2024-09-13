'use client';

import { useState } from 'react';
import { toWords } from 'number-to-words';

const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export default function ConverterForm() {
  const [number, setNumber] = useState('');
  const [word, setWord] = useState('');
  const [fileNumbers, setFileNumbers] = useState([]);
  const [fileWords, setFileWords] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Convert number to words
  const handleConvert = () => {
    if (!isNaN(number) && number !== '') {
      setWord(capitalizeFirstLetter(toWords(number)));
      setError('');
    } else {
      setError('Please enter a valid number.');
    }
  };

  // Clear the input field
  const handleClear = () => {
    setNumber('');
    setWord('');
    setError('');
  };

  // Copy result to clipboard
  const handleCopy = () => {
    if (word) {
      navigator.clipboard.writeText(word);
      alert('Copied to clipboard!');
    }
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setIsProcessing(true);
    const text = await file.text();
    const numbers = text.split(/\r?\n/);
    setFileNumbers(numbers);
    const words = numbers.map((num) => capitalizeFirstLetter(toWords(num.trim())));
    setFileWords(words);
    setIsProcessing(false);
  };

  // Keyboard shortcut (Enter key for conversion)
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleConvert();
    }
  };

  return (
    <div className="w-full max-w-lg p-8 mx-auto shadow-lg rounded-lg transition-all duration-500 bg-white dark:bg-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold text-center dark:text-white text-gray-900 mb-6">
        1️⃣ 2️⃣ 3️⃣ to One Two Three
      </h1>

      {/* Input and Convert Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Enter number"
          className="w-full sm:max-w-lg p-4 border border-gray-300 dark:border-gray-600 rounded-lg text-lg shadow-sm focus:outline-none dark:bg-gray-700 dark:text-gray-100"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleConvert}
          className="w-full sm:w-auto px-5 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 text-white text-lg font-semibold rounded-md shadow-md transition-all duration-300">
          Convert
        </button>
        <button
          onClick={handleClear}
          className="w-full sm:w-auto px-5 py-3 bg-red-500 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500 text-white text-lg font-semibold rounded-md shadow-md transition-all duration-300">
          Clear
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Display conversion result */}
      {word && (
        <div className="text-center text-lg font-medium dark:text-white mt-4">
          <strong>Result:</strong> {word}
          <button
            onClick={handleCopy}
            className="ml-4 px-4 py-2 bg-green-500 hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500 text-white rounded-md shadow-md transition-all duration-300">
            Copy
          </button>
        </div>
      )}

      {/* File Upload */}
      <div className="space-y-4 mt-8">
        <label className="block font-medium text-gray-700 dark:text-gray-300">Upload file with numbers (one per line)</label>
        <input
          type="file"
          className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 shadow-sm focus:outline-none transition-all duration-500"
          onChange={handleFileUpload}
        />
        {isProcessing && <p className="text-gray-500 dark:text-gray-400">Processing your file...</p>}
      </div>

      {/* Display file results */}
      {fileNumbers.length > 0 && (
        <div className="space-y-4 mt-6">
          <h2 className="text-2xl font-semibold dark:text-white">File Results:</h2>
          {fileNumbers.map((num, index) => (
            <div key={index} className="text-lg dark:text-gray-300">
              {num} - {fileWords[index]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
