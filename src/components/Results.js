// src/components/Results.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { calculateFutureValue } from '../utils/calculations';

// Import Chart.js and required components
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

// Register the components
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

  // Generate data points for each year
  const labels = Array.from({ length: years + 1 }, (_, i) => currentAge + i);
  const dataPoints = Array.from({ length: years + 1 }, (_, i) =>
    calculateFutureValue(spendingAmount, rateOfReturn, i).toFixed(2)
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: `Growth at ${rateOfReturn * 100}% Annual Return`,
        data: dataPoints,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1, // For smooth curves
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Investment Growth Over Time',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Age',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Future Value ($)',
        },
      },
    },
  };

  return (
    <div className="my-8">
      <Line data={data} options={options} />
      <div className="mt-4 text-center">
        <p className="text-gray-700">
          <strong>Parameters:</strong>
        </p>
        <p className="text-gray-700">
          - Annual Rate of Return: {(rateOfReturn * 100).toFixed(2)}%
        </p>
        <p className="text-gray-700">
          - Investment Period: {currentAge} to {retirementAge} years old
        </p>
        <p className="text-gray-700">
          - Initial Investment: ${spendingAmount}
        </p>
      </div>
    </div>
  );
}

export default Results;