// src/App.js
import React, { useState } from 'react';
import coffeeButton from './components/img/buy-me-a-coffee-button.png';
import Navbar from './components/Navbar';
import InputForm from './components/InputForm';
import Results from './components/Results';
import Card from './components/Card';

function App() {
  const [entry, setEntry] = useState(null);
  const [showCoffeeButton, setShowCoffeeButton] = useState(false);
  const [threeDollarsFutureValue, setThreeDollarsFutureValue] = useState(0);

  // called by InputForm once validation passes
  const handleAddEntry = (newEntry) => {
    // debug: confirm we're getting correct values
    console.log('New entry:', newEntry);
    console.log(
      'Years difference:',
      newEntry.retirementAge - newEntry.currentAge
    );

    // update state
    setEntry(newEntry);
    setShowCoffeeButton(true);

    // run the "3 dollar" future value calc
    calculateThreeDollarsFutureValue(
      newEntry.retirementAge - newEntry.currentAge
    );
  };

  // helper function for the coffee calculation
  const calculateThreeDollarsFutureValue = (years) => {
    const P = 3;       // principal always starts at 3
    const r = 0.08;    // 8% interest
    const n = years;   // number of years from the difference

    // future value of coffee money based on user time interval:
    const FV = P * Math.pow(1 + r, n);

    console.log(`Calculating with P=${P}, years=${n}, result=${FV}`);

    setThreeDollarsFutureValue(FV.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* navbar */}
      <Navbar />

      {/* main content */}
      <main className="flex-grow max-w-4xl mx-auto px-4">
        <Card className="mb-8">
          <InputForm onAddEntry={handleAddEntry} />
        </Card>

        {entry && (
          <Card>
            <Results entry={entry} />
          </Card>
        )}
      </main>

      {/* footer */}
      <footer className="w-full bg-white shadow-md mt-8 rounded-t-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col items-center space-y-4">
          <span className="text-gray-500 text-sm">Made by Collin</span>

          {/* conditionally render the "Buy Me a Coffee" button */}
          {showCoffeeButton && (
            <>
              <a
                href="https://www.buymeacoffee.com/B4Aaol3SrI"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={coffeeButton}
                  alt="Buy Me A Coffee"
                  style={{ height: '60px', width: '217px' }}
                />
              </a>
              <span className="text-gray-500 text-sm italic">
                *or don't and have ${threeDollarsFutureValue} in retirement
              </span>
            </>
          )}
        </div>
      </footer>
    </div>
  );
}

export default App;