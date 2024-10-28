// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import './App.css';
import Home from './Home'; 
import Quiz from './Quiz'; // Import Quiz component

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />

    </Routes>
  );
}

export default App;
