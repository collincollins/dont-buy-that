// src/utils/calculations.js

export function calculateFutureValue(presentValue, annualRate, years) {
  return presentValue * Math.pow(1 + annualRate, years);
}