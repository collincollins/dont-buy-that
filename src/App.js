// src/App.js

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import coffeeButton from './components/img/buy-me-a-coffee-button.png';
import Navbar from './components/Navbar';
import InputForm from './components/InputForm';
import Results from './components/Results';
import Card from './components/Card';
import RetroHitCounter from 'react-retro-hit-counter';

function App() {
  const [entry, setEntry] = useState(null);
  const [showCoffeeButton, setShowCoffeeButton] = useState(false);
  const [threeDollarsFutureValue, setThreeDollarsFutureValue] = useState(0);
  const [uniqueVisitorCount, setUniqueVisitorCount] = useState(0);
  const [hitCount, setHitCount] = useState(0);

  // Create a ref for the results section
  const resultsRef = useRef(null);

  // Fetch and increment unique visitor and hit count on component mount
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Track the hit (increment hit count in the database)
        await axios.post('/.netlify/functions/incrementHit');

        // Fetch the unique visitor count
        const visitorResponse = await axios.get('/.netlify/functions/getUniqueVisitors');
        setUniqueVisitorCount(visitorResponse.data.count);

        // Fetch the hit count (optional, just for backend tracking purposes)
        const hitResponse = await axios.get('/.netlify/functions/getHit');
        setHitCount(hitResponse.data.count);
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    trackVisit();
  }, []);

  // Handle adding a new entry
  const handleAddEntry = (newEntry) => {
    // Debug: confirm we're getting correct values
    console.log('New entry:', newEntry);
    console.log('Years difference:', newEntry.retirementAge - newEntry.currentAge);

    // Update state
    setEntry(newEntry);
    setShowCoffeeButton(true);

    // Run the "3 dollar" future value calculation
    calculateThreeDollarsFutureValue(newEntry.retirementAge - newEntry.currentAge);

    // After setting entry, scroll to results
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Helper function for the coffee calculation
  const calculateThreeDollarsFutureValue = (years) => {
    const P = 3; // principal
    const r = 0.08; // 8% interest
    const n = years; // number of years

    const FV = P * Math.pow(1 + r, n);
    console.log(`Calculating with P=${P}, years=${n}, result=${FV}`);

    setThreeDollarsFutureValue(FV.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-primarydark bg-opacity-30 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-screen-md mx-auto px-3">
        <Card className="mb-6">
          <InputForm onAddEntry={handleAddEntry} />
        </Card>

        {/* Attach the ref to the wrapper around Results */}
        {entry && (
          <div ref={resultsRef}>
            {/* Apply styles directly to Card */}
            <Card className="bg-gray-100 p-4 border border-black shadow-pixel-lg">
              <Results entry={entry} />
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-[90%] mx-auto bg-gray-100 mb-6 mt-6 rounded-xl border border-black shadow-pixel-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col items-center space-y-1">

          {/* Existing Footer Text */}
          <span className="text-gray-500 text-xs py-1">Made by Collin</span>

          {showCoffeeButton && (
            <>
              <a
                href="https://www.buymeacoffee.com/B4Aaol3SrI"
                target="_blank"
                rel="noopener noreferrer"
                className="coffee-button"
              >
                <img
                  src={coffeeButton}
                  alt="Buy Me A Coffee"
                  style={{ height: '50px', width: '181px' }}
                />
              </a>
              <span className="text-gray-500 py-1 text-xs italic text-center">
                *or don't and have ${threeDollarsFutureValue} in retirement
              </span>
            </>
          )}
          {/* RetroHitCounter placed above the footer text */}
          <div className="py-1">
            <span className="text-gray-700 py-1 text-[0.6em] text-center">Visitors</span>
            <p></p>
            <RetroHitCounter
              hits={uniqueVisitorCount}
              withBorder={true}
              withGlow={true}
              minLength={7}
              size={20}
              padding={4}
              digitSpacing={3}
              segmentThickness={3}
              segmentSpacing={0.5}
              segmentActiveColor="#76FF03"
              segmentInactiveColor="#315324"
              backgroundColor="#222222"
              borderThickness={5}
              glowStrength={1.0}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;