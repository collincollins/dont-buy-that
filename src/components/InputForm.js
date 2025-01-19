// src/components/InputForm.js
import React, { useState } from 'react';

function InputForm({ onAddEntry }) {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [spendingAmount, setSpendingAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const current = Number(currentAge);
    const retirement = Number(retirementAge);
    const amount = Number(spendingAmount);

    if (current >= retirement) {
      alert('Retirement age must be greater than current age.');
      return;
    }

    if (amount <= 0) {
      alert('Spending amount must be greater than zero.');
      return;
    }

    onAddEntry({
      currentAge: current,
      retirementAge: retirement,
      spendingAmount: amount,
      rateOfReturn: 0.08,
    });

    // clear inputs
    setCurrentAge('');
    setRetirementAge('');
    setSpendingAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentAge">
          Current Age
        </label>
        <input
          id="currentAge"
          type="number"
          value={currentAge}
          onChange={(e) => setCurrentAge(e.target.value)}
          required
          min="0"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g., 30"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="retirementAge">
          Retirement Age
        </label>
        <input
          id="retirementAge"
          type="number"
          value={retirementAge}
          onChange={(e) => setRetirementAge(e.target.value)}
          required
          min={currentAge || "0"}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g., 65"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spendingAmount">
          Proposed Spending Amount ($)
        </label>
        <input
          id="spendingAmount"
          type="number"
          value={spendingAmount}
          onChange={(e) => setSpendingAmount(e.target.value)}
          required
          min="0"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="e.g., 100"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Calculate
        </button>
      </div>
    </form>
  );
}

export default InputForm;