'use client';

import { useState } from 'react'; // Grabbing useState from React to manage component state
import { toWords } from 'number-to-words'; // This library handles converting numbers to words for us, super handy!

// Helper function to capitalize the first letter of each word
const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export default function ConverterForm() {
  // States for managing the input number, converted word, and some file-related data
  const [number, setNumber] = useState(''); // User's input number goes here
  const [word, setWord] = useState(''); // The converted word result will be stored here
  const [fileNumbers, setFileNumbers] = useState([]); // Holds the numbers from an uploaded file
  const [fileWords, setFileWords] = useState([]); // Holds the converted words for the file numbers
  const [isProcessing, setIsProcessing] = useState(false); // Indicator to show if the file is being processed
  const [error, setError] = useState(''); // Error message, if any, will be set here

  // Convert number to words when the user clicks "Convert"
  const handleConvert = () => {
    if (!isNaN(number) && number !== '') {
      // If input is a valid number, convert it and capitalize the first letter for that extra polish
      setWord(capitalizeFirstLetter(toWords(number)));
      setError(''); // Clear any previous error
    } else {
      // If not a valid number, show an error message
      setError('Please enter a valid number.');
    }
  };

  // Clear the input field and the result, back to square one
  const handleClear = () => {
    setNumber('');
    setWord('');
    setError(''); // Reset the error message too
  };

  // Copy the result to clipboard, simple but useful feature
  const handleCopy = () => {
    if (word) {
      navigator.clipboard.writeText(word); // Nifty little browser API to copy text
      alert('Copied to clipboard!'); // Let the user know it was successful
    }
  };

  // Handle file upload for batch conversion
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    setIsProcessing(true); // Let the user know something is happening
    const text = await file.text(); // Read the content of the file as text
    const numbers = text.split(/\r?\n/); // Split the file content into lines
    setFileNumbers(numbers); // Store the numbers in state
    const words = numbers.map((num) => capitalizeFirstLetter(toWords(num.trim()))); // Convert each number to words
    setFileWords(words); // Store the converted words
    setIsProcessing(false); // File processing is done
  };

  // Handle keyboard input - pressing "Enter" will trigger the conversion
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleConvert(); // Call the convert function if Enter is pressed
    }
  };

  return (
    <div className="w-full max-w-lg p-8 mx-auto shadow-lg rounded-lg transition-all duration-500 bg-white dark:bg-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold text-center dark:text-white text-gray-900 mb-6">
        1️⃣ 2️⃣ 3️⃣ to One Two Three {/* Fun little emoji touch for the heading */}
      </h1>

      {/* Input field for number and buttons to convert or clear */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Enter number" // A simple prompt for the user
          className="w-full sm:max-w-lg p-4 border border-gray-300 dark:border-gray-600 rounded-lg text-lg shadow-sm focus:outline-none dark:bg-gray-700 dark:text-gray-100"
          value={number}
          onChange={(e) => setNumber(e.target.value)} // Update state as the user types
          onKeyDown={handleKeyDown} // Listen for Enter key presses
        />
        <button
          onClick={handleConvert} // Button to trigger the conversion
          className="w-full sm:w-auto px-5 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 text-white text-lg font-semibold rounded-md shadow-md transition-all duration-300">
          Convert
        </button>
        <button
          onClick={handleClear} // Button to reset everything
          className="w-full sm:w-auto px-5 py-3 bg-red-500 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500 text-white text-lg font-semibold rounded-md shadow-md transition-all duration-300">
          Clear
        </button>
      </div>

      {/* Display error message if input isn't valid */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Show the result if conversion is successful */}
      {word && (
        <div className="text-center text-lg font-medium dark:text-white mt-4">
          <strong>Result:</strong> {word} {/* Display the converted word */}
          <button
            onClick={handleCopy} // Button to copy the result to clipboard
            className="ml-4 px-4 py-2 bg-green-500 hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500 text-white rounded-md shadow-md transition-all duration-300">
            Copy
          </button>
        </div>
      )}

      {/* File upload section for batch conversion */}
      <div className="space-y-4 mt-8">
        <label className="block font-medium text-gray-700 dark:text-gray-300">
          Upload file with numbers (one per line) {/* Prompt to let the user know what's expected */}
        </label>
        <input
          type="file"
          className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 shadow-sm focus:outline-none transition-all duration-500"
          onChange={handleFileUpload} // Trigger file processing on upload
        />
        {isProcessing && <p className="text-gray-500 dark:text-gray-400">Processing your file...</p>} {/* A little feedback during file processing */}
      </div>

      {/* Display the results from the file upload */}
      {fileNumbers.length > 0 && (
        <div className="space-y-4 mt-6">
          <h2 className="text-2xl font-semibold dark:text-white">File Results:</h2>
          {fileNumbers.map((num, index) => (
            <div key={index} className="text-lg dark:text-gray-300">
              {num} - {fileWords[index]} {/* Display each number with its corresponding word */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
