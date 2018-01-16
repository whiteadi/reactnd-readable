import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {actions} from '../store';

import Vote from './vote';
import Comments from './comments';
import {formatDate} from '../utils/helper';
import ConfirmAction from './ConfirmAction';
import './post-details.css';

class PostDetails extends Component {
  handleVoteUpClick = (id) => {
    this.props.voteUp(id);
  };
  handleVoteDownClick = (id) => {
    this.props.voteDown(id);
  };

  componentDidMount () {
    this.props.getAllComments(this.props.id);
  }

  componentDidUpdate () {
    this.props.getAllComments(this.props.id);
  }

  render() {
    const {id, title, body, author, timestamp, voteScore} = this.props;
    return (
      <div>
        <Vote
          score={voteScore}
          id={id}
          onVoteUp={() => this.handleVoteUpClick(id)}
          onVoteDown={() => this.handleVoteDownClick(id)}
        />
        <div className='post-title'>
          <Link to={`/posts/${id}`}>
            <h2 className='heading'>{title}</h2>
          </Link>
          <p>by <b>{author}</b> at {formatDate(timestamp)}</p>
          <div className='post-body'>
            <p>{body}</p>
          </div>
          <Link to={`/posts/${id}/edit`}>{'Edit'}</Link>
          <ConfirmAction delete={this.props.delete} id={id} />
        </div>
        <Comments postId={id} />
      </div>
    );
  }
}

PostDetails.propTypes = {
  voteUp: PropTypes.func.isRequired,
  voteDown: PropTypes.func.isRequired,
};

export default connect(null, {voteUp: actions.posts.voteUp, voteDown: actions.posts.voteDown, getAllComments: actions.comments.getAllComments})(PostDetails);