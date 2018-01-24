import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
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
  getPosts = () => {
    this.props.getMeAllPosts();
  };

  render() {
    const post = this.props.post;
    if (typeof post === 'undefined') {
      this.props.history.push(`/${this.props.match.params.category}`);
      return '';
    }
    return (
      <div>
        <Vote
          score={post.voteScore}
          id={post.id}
          onVoteUp={() => this.handleVoteUpClick(post.id)}
          onVoteDown={() => this.handleVoteDownClick(post.id)}
        />
        <div className='post-title'>
          <Link to={`/posts/${post.id}`}>
            <h2 className='heading'>{post.title}</h2>
          </Link>
          <p>by <b>{post.author}</b> at {formatDate(post.timestamp)}</p>
          <div className='post-body'>
            <p>{post.body}</p>
          </div>
          <span className='post-commentsNo'>
            <FontIcon className="material-icons" hoverColor="mediumspringgreen">
              comment
            </FontIcon>
            {post.commentCount} comments
          </span>
          <Link to={`/posts/${post.id}/edit`}>{'Edit'}</Link>
          <ConfirmAction delete={this.props.delete} id={post.id} postId={post.id} refreshParent={this.getPosts} goBack={this.props.history.goBack}/>
        </div>
        <Comments postId={post.id} refreshPosts={this.getPosts}/>
      </div>
    );
  }
}

PostDetails.propTypes = {
  voteUp: PropTypes.func.isRequired,
  voteDown: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  comments: PropTypes.array
};

const mapStateToProps = (state, props) => ({
  post: state.posts.filter(post => post.id === props.id)[0]
});

export default withRouter(connect(mapStateToProps,
  {
    voteUp: actions.posts.voteUp,
    voteDown: actions.posts.voteDown,
    delete: actions.posts.deleteThisPost,
    getMeAllPosts: actions.posts.getAllPosts
  }
)(PostDetails));
