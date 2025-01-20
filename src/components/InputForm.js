// src/components/InputForm.js
import React, { useState } from 'react';

function InputForm({ onAddEntry }) {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [spendingAmount, setSpendingAmount] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const current = Number(currentAge);
    const retirement = Number(retirementAge);
    const amount = Number(spendingAmount);
    const rate = 8; // fixed at 8%

    let formErrors = {};

    // validate retirement age > current age
    if (current >= retirement) {
      formErrors.retirementAge = 'Retirement age must be greater than current age.';
    }

    // validate spending amount > 0
    if (amount <= 0) {
      formErrors.spendingAmount = 'Spending amount must be greater than zero.';
    }

    // validate rate > 0 (though it's fixed at 8, just in case)
    if (rate <= 0) {
      formErrors.rateOfReturn = 'Rate of return must be greater than zero.';
    }

    // if we have errors, set them and do not proceed
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // otherwise, pass the new entry up to the parent
    onAddEntry({
      currentAge: current,
      retirementAge: retirement,
      spendingAmount: amount,
      rateOfReturn: rate / 100,
    });

    // clear the form fields and errors after successful submission
    setCurrentAge('');
    setRetirementAge('');
    setSpendingAmount('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* current age */}
        <div>
          <label htmlFor="currentAge" className="block text-sm font-medium text-secondary">
            Current Age
          </label>
          <input
            type="number"
            id="currentAge"
            value={currentAge}
            onChange={(e) => setCurrentAge(e.target.value)}
            required
            min="0"
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.currentAge ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:ring-primary focus:border-primary`}
            placeholder="e.g., 30"
          />
          {errors.currentAge && (
            <p className="mt-1 text-sm text-red-500">{errors.currentAge}</p>
          )}
        </div>

        {/* retirement age */}
        <div>
          <label htmlFor="retirementAge" className="block text-sm font-medium text-secondary">
            Retirement Age
          </label>
          <input
            type="number"
            id="retirementAge"
            value={retirementAge}
            onChange={(e) => setRetirementAge(e.target.value)}
            required
            min="0" 
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.retirementAge ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:ring-primary focus:border-primary`}
            placeholder="e.g., 65"
          />
          {errors.retirementAge && (
            <p className="mt-1 text-sm text-red-500">{errors.retirementAge}</p>
          )}
        </div>
      </div>

      {/* proposed spending amount */}
      <div>
        <label htmlFor="spendingAmount" className="block text-sm font-medium text-secondary">
          Proposed Spending Amount ($)
        </label>
        <input
          type="number"
          id="spendingAmount"
          value={spendingAmount}
          onChange={(e) => setSpendingAmount(e.target.value)}
          required
          min="0"
          className={`mt-1 block w-full px-4 py-3 border ${
            errors.spendingAmount ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:ring-primary focus:border-primary`}
          placeholder="e.g., 10000"
        />
        {errors.spendingAmount && (
          <p className="mt-1 text-sm text-red-500">{errors.spendingAmount}</p>
        )}
      </div>

      {/* aubmit button */}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-300"
          aria-label="Calculate Future Value"
        >
          Calculate
        </button>
      </div>
    </form>
  );
}

export default InputForm;