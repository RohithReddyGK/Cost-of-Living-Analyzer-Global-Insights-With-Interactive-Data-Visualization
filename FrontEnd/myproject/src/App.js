import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SingleSearchSection from "./components/SingleSearchSection";
import CompareSearchSection from "./components/CompareSearchSection";
import VisualizationPage from "./components/VisualizationPage";
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="heading">
          Cost of Living Analyzer
        </h1>
        <Routes>
          <Route path="/" element={<SingleSearchSection />} />
          <Route path="/visualization" element={<VisualizationPage />} />
          <Route path="/compare" element={<CompareSearchSection />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

