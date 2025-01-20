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
        backgroundColor: '#56AE57',
        borderColor: '#56AE57',
        tension: 0,
        pointRadius: 6,
        pointBorderColor: '#000',
        pointBorderWidth: 2,
        pointHoverRadius: 10,
        pointStyle: 'rect',
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
        text: 'Investment Growth',
        font: {
          size: 10,
          family: "'Press Start 2P', sans-serif",
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
        titleFont: { family: "'Press Start 2P', sans-serif", size: 16 },
        bodyFont: { family: "'Press Start 2P', sans-serif", size: 14 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Age',
          font: { size: 12, family: "'Press Start 2P', sans-serif" },
          color: '#374151',
        },
        ticks: {
          font: { size: 10, family: "'Press Start 2P', sans-serif" },
          color: '#374151',
        },
        grid: {
          display: true,
          lineWidth: 1,
          color: '#D3D3D3',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Future Value ($)',
          font: { size: 12, family: "'Press Start 2P', sans-serif" },
          color: '#374151',
        },
        ticks: {
          font: { size: 10, family: "'Press Start 2P', sans-serif" },
          color: '#374151',
          callback: function (value) {
            return '$' + value.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            });
          },
        },
        grid: {
          display: true,
          lineWidth: 1,
          color: '#D3D3D3',
        },
      },
    },
  };

  return (
    <div className="mt-3 w-full mx-auto px-0 max-w-screen-xl">
      {/* Future Value */}
      <div className="mb-4 text-center">
        <p className="text-lg font-bold text-gray-800">
          Future Value at Retirement:
          <span className="text-accent block">
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
      <div className="relative w-full h-80 sm:h-96 border border-black shadow-pixel-xs rounded-md p-1">
        <Line data={data} options={options} />
      </div>

      {/* Parameters */}
      <div className="mt-10 px-2">
        <h2 className="text-xs font-semibold text-center mb-4">Investment Parameters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs font-medium text-gray-700">
              <strong>Annual Rate of Return:</strong> 8.00%
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-700">
              <strong>Investment Period:</strong> {currentAge} to {retirementAge}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-700">
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
  );
}

export default Results;