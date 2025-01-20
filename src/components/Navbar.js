// src/components/Navbar.js

import React from 'react';

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md mb-8">
      <div className="px-4 py-4 flex justify-center items-center">
        <h2 className="text-3xl font-bold text-primary bg-gray-100 bg-opacity-90 px-6 py-2 rounded-full">
          Don't Buy That!
        </h2>
      </div>
    </nav>
  );
}

export default Navbar;