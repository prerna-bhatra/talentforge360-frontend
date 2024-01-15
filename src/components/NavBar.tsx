// components/NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">Add Candidate</Link>
        </li>
        <li>
          <Link to="/candidates">Candidate List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
