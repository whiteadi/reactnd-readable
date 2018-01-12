import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import ConfirmAction from './ConfirmAction';

import {actions} from '../store';

import Vote from './vote';
import {formatDate} from '../utils/helper';

class PostShort extends Component {
  handleVoteUpClick = (id) => {
    this.props.voteUp(id);
  };
  handleVoteDownClick = (id) => {
    this.props.voteDown(id);
  };

  render() {
    const {id, title, author, timestamp, voteScore} = this.props;
    return (
      <div className='main-detail-post'>
        <Vote
          score={voteScore}
          id={id}
          onVoteUp={() => this.handleVoteUpClick(id)}
          onVoteDown={() => this.handleVoteDownClick(id)}
        />
        <div className='post-short'>
          <Link to={`/posts/${id}`}>
            <h2 className='heading'>{title}</h2>
          </Link>
          <p className='post-date'>by <b>{author}</b> at {formatDate(timestamp)}</p>
          <Link to={`/posts/${id}/edit`}>{'Edit'}</Link>
          <ConfirmAction delete={this.props.delete} id={id} />
        </div>
      </div>
    );
  }
}

PostShort.propTypes = {
  voteUp: PropTypes.func.isRequired,
  voteDown: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
};

export default connect(null, {voteUp: actions.posts.voteUp, voteDown: actions.posts.voteDown, delete: actions.posts.deleteThisPost})(PostShort);