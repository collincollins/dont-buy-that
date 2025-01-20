// src/components/Card.js

import React from 'react';

function Card({ children, className = '' }) {
  return (
    <div className={`bg-gray-100 px-6 py-4 rounded-xl border border-black shadow-pixel-lg ${className}`}>
      {children}
    </div>
  );
}

export default Card;