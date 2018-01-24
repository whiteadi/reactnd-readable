import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import ConfirmAction from './ConfirmAction';
import FontIcon from 'material-ui/FontIcon';

import {actions} from '../store';

import Vote from './vote';
import {formatDate} from '../utils/helper';
import './short.css'

class PostShort extends Component {
  handleVoteUpClick = (id) => {
    this.props.voteUp(id);
  };
  handleVoteDownClick = (id) => {
    this.props.voteDown(id);
  };

  render() {
    const post = this.props.post;
    let category = this.props.category;
    if (typeof category === 'undefined') {
      category = 'all'
    }
    return (
      <div className='main-detail-post'>
        <Vote
          score={post.voteScore}
          id={post.id}
          onVoteUp={() => this.handleVoteUpClick(post.id)}
          onVoteDown={() => this.handleVoteDownClick(post.id)}
        />
        <div className='post-short'>
          <Link to={`/${category}/${post.id}`}>
            <h2 className='heading'>{post.title}</h2>
          </Link>
          <p className='post-date'>by <b>{post.author}</b> at {formatDate(post.timestamp)}</p>
          <span className='post-commentsNo'>
            <FontIcon className="material-icons" hoverColor="mediumspringgreen">
              comment
            </FontIcon> {post.commentCount} comments
          </span>
          <Link className='post-edit' to={`/posts/${post.id}/edit`}>{'Edit'}</Link>
          <ConfirmAction delete={this.props.delete} postId={post.id} id={post.id} refreshParent={this.props.getMeAllPosts} goBack={this.props.history.goBack}/>
        </div>
      </div>
    );
  }
}

PostShort.propTypes = {
  voteUp: PropTypes.func.isRequired,
  voteDown: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  comments: PropTypes.array,
  id: PropTypes.string
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
  })(PostShort));
