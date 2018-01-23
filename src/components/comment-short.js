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
    this.props.voteUp(id, this.props.parentId);
  };
  voteDownClick = (id) => {
    this.props.voteDown(id, this.props.parentId);
  };

  render() {
    const {id, title, body, author, timestamp, voteScore, parentId} = this.props;
    return (
      <div>
        <Vote
          score={voteScore}
          id={id}
          onVoteUp={() => this.voteUpClick(id)}
          onVoteDown={() => this.voteDownClick(id)}
        />
        <div className='comment-short'>
          <h2>{title}</h2>
          <h3>{body}</h3>
          <p className='comment-date'>by <b>{author}</b> at {formatDate(timestamp)}</p>
          <ConfirmAction delete={this.props.delete} id={id} postId={parentId} refreshParent={this.props.getMeAllPosts}/>
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

export default connect(null,
  {
    voteUp: actions.comments.voteUp,
    voteDown: actions.comments.voteDown,
    delete: actions.comments.deleteThisComment,
    getMeAllPosts: actions.posts.getAllPosts
  })(CommentShort);