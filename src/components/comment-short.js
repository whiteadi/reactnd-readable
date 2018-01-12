import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {actions} from '../store';
import Vote from './vote';
import {formatDate} from '../utils/helper';
import ConfirmAction from './ConfirmAction';
import './comment-short.css';

class CommentShort extends Component {
  voteUpClick = (id) => {
    this.props.voteUp(id);
  };
  voteDownClick = (id) => {
    this.props.voteDown(id);
  };

  render() {
    const {id, title, body, author, timestamp, voteScore} = this.props;
    return (
      <div className='main-detail-post'>
        <Vote
          score={voteScore}
          id={id}
          onVoteUp={() => this.voteUpClick(id)}
          onVoteDown={() => this.voteDownClick(id)}
        />
        <div className='comment-short'>
          <h2 className='heading'>{title}</h2>
          <h3 className='heading'>{body}</h3>
          <p className='comment-date'>by <b>{author}</b> at {formatDate(timestamp)}</p>
          <ConfirmAction delete={this.props.delete} id={id} />
        </div>
      </div>
    );
  }
}

CommentShort.propTypes = {
  voteUp: PropTypes.func.isRequired,
  voteDown: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
};

export default connect(null, {voteUp: actions.comments.voteUp, voteDown: actions.comments.voteDown, delete: actions.comments.deleteThisComment})(CommentShort);