import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import People from './components/people/people';
import NotFound from './components/notFound/notFound';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/people" element={<People />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
