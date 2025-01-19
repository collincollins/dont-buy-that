// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import InputForm from './InputForm';
import Results from './Results';

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Don't Buy That</h1>
      <InputForm onAddEntry={addEntry} />
      {entry && <Results entry={entry} />}
    </div>
  );
}

export default Dashboard;