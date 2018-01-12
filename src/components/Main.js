import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {actions} from '../store';
import Post from './post';
import Posts from './posts';
import PostDetails from './post-details';
import NothingHere from "./NothingHere";

class Main extends Component {
  getPostById(posts, id) {
    return posts.filter(post => post.id === id)[0];
  }

  render() {
    const {posts, doTheSort} = this.props;
    return (
      <div className='content'>
        <Switch>
          <Route exact
                 path='/'
                 render={() => (
                   <Posts/>
                 )}
          />
          <Route exact
                 path='/categories/:name'
                 render={({match}) => (
                   <Posts category={match.params.name}/>
                 )}
          />
          <Route exact
                 path='/posts/add'
                 component={Post}
          />
          <Route
            path='/posts/:id/edit'
            render={({match}) => (
              <Post initialValues={this.getPostById(posts, match.params.id)} postId={match.params.id}/>
            )}
          />
          <Route exact
                 path='/posts/:id'
                 render={({match}) => (
                   <PostDetails {...this.getPostById(posts, match.params.id)} />
                 )}
          />
          <Route component={NothingHere}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default withRouter(connect(mapStateToProps)(Main));