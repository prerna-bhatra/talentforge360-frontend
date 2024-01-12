// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Import your Tailwind CSS styles
import AddCandidateForm from './components/AddCandidateForm';
import CandidateList from './components/CandidateList';
import NavBar from './components/NavBar';


function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/add" element={<AddCandidateForm />} />
          <Route path="/candidates" element={<CandidateList />} />
          {/* <Route path="/" element={<h1>Home</h1>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
