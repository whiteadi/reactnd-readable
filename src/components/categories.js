import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';

import './categories.css';

import {capitalize} from '../utils/helper';

const Categories = ({categories}) => (
  <div>
    <nav className="nav">
      <span className="nav-header">
        <h4>Categories</h4>
      </span>
      {categories.length && categories.map((category, index) => (
        <NavLink key={index} activeClassName="active" to={`/${category.name}`}>
          {capitalize(category.name)}
        </NavLink>
      ))}
    </nav>
  </div>
);

const mapStateToProps = ({categories}) => ({
  categories
});

export default withRouter(connect(mapStateToProps)(Categories));