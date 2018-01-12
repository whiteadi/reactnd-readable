import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import './vote.css';

const Vote = (props) => {
  const {score, onVoteUp, onVoteDown} = props;
  return (
    <div className='vote-score-wrapper'>
        <span
          role="button"
          className="vote-control-up"
          tabIndex="0"
          onClick={onVoteUp}
        >
          <FontIcon className="material-icons" color='dodgerblue'>thumb_up</FontIcon>
        </span>
      <div className={`vote-score ${score < 0 ? 'negative' : 'positive'}`}><span>{score}</span></div>
      <span
        role="button"
        tabIndex="0"
        className="vote-control-down"
        onClick={onVoteDown}
      >
      <FontIcon className="material-icons" color='dodgerblue'>thumb_down</FontIcon>
      </span>
    </div>
  );
};

export default Vote;