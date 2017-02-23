import React, {Component} from 'react';
import { Router, Route, hashHistory, IndexRoute, browserHistory } from 'react-router'
import App from './App';
import {
  LoginPage,
  TeamPage,
  TeamDetailPage
} from '../pages';

class Routes extends Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={LoginPage}/>
        <Route path="/home" component={App}>
          <IndexRoute component={TeamPage}/>
          <Route path="team/:id" component={TeamDetailPage}/>
        </Route>
      </Router>
    )
  }
}

export default Routes;