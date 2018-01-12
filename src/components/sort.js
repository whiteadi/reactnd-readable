import React from 'react';
import PropTypes from 'prop-types';

import FontIcon from 'material-ui/FontIcon';
import './sort.css'

const Sort = (props) => {
  const onSort = (sortyBy) => {
    props.doTheSort(props.items, sortyBy);
  };
  return (
    <div className="sort">
      <span
        role="button"
        className="vote-control-up"
        tabIndex="0"
        title="Sort by most recent"
        onClick={() => onSort('date_asc')}
      >
        <FontIcon className="material-icons">arrow_drop_up</FontIcon>
      </span>
      <span
        role="button"
        className="vote-control-down"
        tabIndex="0"
        title="Sort by oldest"
        onClick={() => onSort('date_desc')}
      >
        <FontIcon className="material-icons">arrow_drop_down</FontIcon>
      </span>
      <span className="some-space"></span>
      <span
        role="button"
        className="vote-control-up"
        tabIndex="0"
        title="Sort by lowest score"
        onClick={() => onSort('vote_asc')}
      >
        <FontIcon className="material-icons">arrow_upward</FontIcon>
      </span>
      <span
        role="button"
        className="vote-control-down"
        tabIndex="0"
        title="Sort by highest score"
        onClick={() => onSort('vote_desc')}
      >
        <FontIcon className="material-icons">arrow_downward</FontIcon>
      </span>
    </div>
  );
};

Sort.propTypes = {
  doTheSort: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

export default Sort;