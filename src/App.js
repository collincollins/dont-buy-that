// src/App.js
import React from 'react';
import Dashboard from './components/Dashboard';
import './index.css'; // Ensure Tailwind CSS is imported

function App() {
  return (
    <div className="App bg-gray-100 min-h-screen">
      <Dashboard />
    </div>
  );
}

export default App;