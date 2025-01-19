// src/components/Results.js

import React from 'react';
import { Line } from 'react-chartjs-2';
import { calculateFutureValue } from '../utils/calculations';

// import Chart.js and required components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Results({ entry }) {
  const { currentAge, retirementAge, spendingAmount, rateOfReturn } = entry;
  const years = retirementAge - currentAge;

  // calculate the final future value
  const finalValue = calculateFutureValue(spendingAmount, rateOfReturn, years);
  const formattedFinalValue = finalValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  // generate data points for each year
  const labels = Array.from({ length: years + 1 }, (_, i) => currentAge + i);
  const dataPoints = Array.from({ length: years + 1 }, (_, i) =>
    Math.round(calculateFutureValue(spendingAmount, rateOfReturn, i))
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: `Growth at ${(rateOfReturn * 100).toFixed(2)}% Annual Return`,
        data: dataPoints,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.2,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Investment Growth Over Time',
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Future Value: $${context.parsed.y.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Age',
          font: {
            size: 16,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Future Value ($)',
          font: {
            size: 16,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
          // include dollar sign and format number with commas, no decimal places
          callback: function (value) {
            return '$' + value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
          },
        },
      },
    },
  };

  return (
    <div className="my-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* final value */}
        <div className="mb-6 text-center">
          <p className="text-2xl font-bold text-gray-800">
            Future Value at Retirement: <span className="text-green-600">${formattedFinalValue}</span>
          </p>
        </div>

        {/* chart container */}
        <div className="relative h-64 sm:h-80 md:h-96">
          <Line data={data} options={options} />
        </div>

        {/* parameters */}
        <div className="mt-4 px-2">
          <h2 className="text-xl font-semibold text-center mb-2">Investment Parameters</h2>
          <div className="flex flex-col space-y-1 sm:flex-row sm:justify-around sm:space-y-0">
            <p className="text-gray-700">
              <strong>Annual Rate of Return:</strong> {(rateOfReturn * 100).toFixed(2)}%
            </p>
            <p className="text-gray-700">
              <strong>Investment Period:</strong> {currentAge} to {retirementAge} years old
            </p>
            <p className="text-gray-700">
              <strong>Initial Investment:</strong> ${spendingAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;