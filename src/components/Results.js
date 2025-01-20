// src/components/Results.js

import React from 'react';
import { Line } from 'react-chartjs-2';
import { calculateFutureValue } from '../utils/calculations';
import CountUp from 'react-countup';
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
  const finalValue = calculateFutureValue(spendingAmount, rateOfReturn, years);

  const labels = Array.from({ length: years + 1 }, (_, i) => currentAge + i);
  const dataPoints = Array.from({ length: years + 1 }, (_, i) =>
    Math.round(calculateFutureValue(spendingAmount, rateOfReturn, i))
  );

  const data = {
    labels,
    datasets: [
      {
        data: dataPoints,
        fill: false,
        backgroundColor: '#10B981',
        borderColor: '#10B981',
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Investment Growth Over Time',
        font: {
          size: 20,
          family: 'Inter, sans-serif',
        },
        color: '#374151',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Future Value: $${context.parsed.y.toLocaleString(undefined, { 
              minimumFractionDigits: 0, 
              maximumFractionDigits: 0 
            })}`;
          },
        },
        backgroundColor: 'rgba(31, 41, 55, 0.9)',
        titleFont: { family: 'Inter, sans-serif', size: 16 },
        bodyFont: { family: 'Inter, sans-serif', size: 14 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Age',
          font: { size: 16, family: 'Inter, sans-serif' },
          color: '#374151',
        },
        ticks: {
          font: { size: 14, family: 'Inter, sans-serif' },
          color: '#374151',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Future Value ($)',
          font: { size: 16, family: 'Inter, sans-serif' },
          color: '#374151',
        },
        ticks: {
          font: { size: 14, family: 'Inter, sans-serif' },
          color: '#374151',
          callback: function (value) {
            return '$' + value.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            });
          },
        },
      },
    },
  };

  return (
    <div className="my-8 w-full mx-auto px-2 max-w-screen-md">
      {/* Transparent Blue Container */}
      <div className="bg-blue-100 bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg p-6">
        {/* Future Value */}
        <div className="mb-6 text-center">
          <p className="text-3xl font-bold text-gray-800">
            Future Value at Retirement:{' '}
            <span className="text-emerald-500">
              $
              <CountUp
                end={finalValue}
                duration={2.5}
                separator=","
                decimals={0}
              />
            </span>
          </p>
        </div>

        {/* Chart */}
        <div className="relative w-full h-80 sm:h-96">
          <Line data={data} options={options} />
        </div>

        {/* Parameters */}
        <div className="mt-6 px-2">
          <h2 className="text-2xl font-semibold text-center mb-4">Investment Parameters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-lg font-medium text-gray-700">
                <strong>Annual Rate of Return:</strong> 8.00%
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-gray-700">
                <strong>Investment Period:</strong> {currentAge} to {retirementAge}
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-gray-700">
                <strong>Initial Investment:</strong>{' '}
                ${spendingAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;