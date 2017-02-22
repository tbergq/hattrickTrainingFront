import React from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {browserHistory } from 'react-router';
import {
  Header,
  Toast
} from './';
import {
  UserStore,
  ToastStore
} from '../stores';

@observer
class App extends React.Component {

  @observable username = '';

  componentWillMount() {
    let tokenData = UserStore.tokenData;
    if (!tokenData.username) {
      ToastStore.addToastMessage('you do not have valid login credentials, please login');
      browserHistory.push('/');
    }
    this.username = tokenData.username;
  }

  render() {
    return(
      <div className="app-container">
        <Header
          username={this.username}
        />
        {this.props.children}
        <Toast/>
      </div>
    )
  }
}

export default App;