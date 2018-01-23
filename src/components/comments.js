import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {v4} from 'uuid';
import _ from 'lodash';

import Sort from './sort';
import CommentShort from './comment-short';
import {actions} from "../store";

import './comments.css';

class Comments extends Component {
  clearFields = () => {
    document.getElementById("newCommentForm").reset();
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    if (!(_.isEmpty(this.author.value) && _.isEmpty(this.commentBody.value))) {
      const newComment = {
        id: v4(),
        parentId: this.props.postId,
        timestamp: Date.now(),
        author: this.author.value,
        body: this.commentBody.value,
      };
      this.props.addComment(newComment);
      this.props.refreshPosts();
      this.clearFields();
    }
    event.preventDefault();
  }

  componentDidMount() {
    this.props.getAllComments(this.props.postId);
  }

  render() {
    const {comments, doTheSort} = this.props;
    return (
      <div>
        <div>
          <h2>Add new comment</h2>
          <form id='newCommentForm' onSubmit={this.handleSubmit}>
            <label>
              Author:
              <input type="text" ref={(input) => this.author = input}/>
            </label>
            <label>
              Comment:
              <textarea ref={(input) => this.commentBody = input}/>
            </label>
            <input type="submit" value="Submit"/>
            <input type="button" value="Clear" onClick={this.clearFields}/>
          </form>
        </div>
        {comments && comments.map(
          comment => <CommentShort key={comment.id} {...comment} />
        )}
        <div>
          <Sort items={comments} doTheSort={doTheSort}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  comments: state.comments,
});

export default withRouter(connect(mapStateToProps,
  {
    doTheSort: actions.comments.doTheSort,
    addComment: actions.comments.newComment,
    getAllComments: actions.comments.getAllComments
  }
)(Comments));
