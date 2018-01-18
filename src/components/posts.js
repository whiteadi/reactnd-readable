import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';

import Sort from './sort';
import PostShort from './short';
import './posts.css';
import {connect} from "react-redux";
import {actions} from "../store";

const filterPostByCategory = (posts, category) => {
  if (typeof category !== 'undefined') {
    return posts.filter(post => post.category === category);
  } else {
    return posts;
  }
};

class Posts extends Component {
  render() {
    const {posts, doTheSort, category} = this.props;
    const sortedPosts = filterPostByCategory(posts, category);
    if (sortedPosts.length === 0) {
      return (
        <div>
          <p><em>No posts yet, add one if you will...</em></p>
          <div className='add-post'>
            <Link to='/posts/add'>
              <div className="tooltip">
                <span className="tooltiptext">New post</span><FontIcon className="material-icons"
                                                                       hoverColor="mediumspringgreen">create</FontIcon>
              </div>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className='posts'>
          <div className='add-post'>
            <Link to='/posts/add'>
              <div className="tooltip">
                <span className="tooltiptext">New post</span><FontIcon className="material-icons"
                                                                       hoverColor="mediumspringgreen">create</FontIcon>
              </div>
            </Link>
          </div>
          {sortedPosts.map(
            post => <PostShort key={post.id} {...post} />
          )}
          <div>
            <Sort items={sortedPosts} doTheSort={doTheSort}/>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, props) => ({
  posts: filterPostByCategory(state.posts, props.category)
});

export default connect(mapStateToProps, {doTheSort: actions.posts.doTheSort})(Posts);