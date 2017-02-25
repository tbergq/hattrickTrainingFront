import React from 'react';
import {observer} from 'mobx-react';
import {
  action,
  observable,
  useStrict
} from 'mobx';
import {browserHistory} from 'react-router';
import {
  Header,
  Toast
} from './';
import {
  UserStore,
  ToastStore
} from '../stores';
import styles from '../app.scss';

useStrict(true);

@observer
class App extends React.Component {

  @observable username = '';

  @action
  componentWillMount() {
    let tokenData = UserStore.tokenData;
    if (!tokenData.username) {
      ToastStore.addToastMessage('you do not have valid login credentials, please login');
      browserHistory.push('/');
    }
    this.username = tokenData.username;
  }

  render() {
    return (
      <div className="app-container">
        <Header
          username={this.username}
        />
        <div className={styles.innerAppContainer}>
          {this.props.children}
        </div>
        <Toast/>
      </div>
    )
  }
}

export default App;