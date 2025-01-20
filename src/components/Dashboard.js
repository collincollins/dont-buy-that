// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import InputForm from './InputForm';
import Results from './Results';
import Card from './Card';

function Dashboard() {
  const [entry, setEntry] = useState(null);

  // load entry from localStorage on component mount
  useEffect(() => {
    const storedEntry = JSON.parse(localStorage.getItem('spendingEntry')) || null;
    setEntry(storedEntry);
  }, []);

  // add or update entry and update localStorage
  const addEntry = (newEntry) => {
    setEntry(newEntry);
    localStorage.setItem('spendingEntry', JSON.stringify(newEntry));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 p-4">
      {/* navigation bar */}
      <Navbar />

      {/* main content */}
      <main className="w-full max-w-4xl mb-8">
        <Card>
          <InputForm onAddEntry={addEntry} />
        </Card>
      </main>

      {/* results */}
      {entry && (
        <div className="w-full max-w-4xl">
          <Results entry={entry} />
        </div>
      )}

      {/* footer */}
      <footer className="w-full max-w-4xl text-center text-gray-600 dark:text-gray-400 mt-auto">
        &copy; {new Date().getFullYear()} Don't Buy That. All rights reserved.
      </footer>
    </div>
  );
}

export default Dashboard;