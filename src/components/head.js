import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="app-header">
    <h1 className="brand"><Link to="/">Udacity React NanoDegree Readable project</Link></h1>
  </header>
);

export default Header;