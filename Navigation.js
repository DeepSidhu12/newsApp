import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to="/upload">Upload File</Link></li> {/* Add link to upload page */}
      </ul>
    </nav>
  );
};

export default Navigation;
