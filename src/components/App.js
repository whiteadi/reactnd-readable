import React, {Component} from 'react';
import {withRouter,} from 'react-router-dom';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {actions} from '../store';
import Categories from './categories';
import Head from './head'
import Main from './Main'
import './App.css'
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

class App extends Component {

  componentDidMount() {
    this.props.getMeCategories();
    this.props.getMeAllPosts();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className='app'>
          <Head/>
          <div className="app-container">
            <Categories/>
            <div className="inner-container">
              <Main/>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts
});

export default withRouter(connect(mapStateToProps,
  {
    getMeCategories: actions.categories.getAllCategories,
    getMeAllPosts: actions.posts.getAllPosts
  }
)(App));