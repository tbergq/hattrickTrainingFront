import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';
import {
  LinkContainer
} from 'react-router-bootstrap';
import {
  Link,
  browserHistory
} from 'react-router';
import {
  observable,
  action
} from 'mobx'
import {observer} from 'mobx-react';
import {Transport} from '../utils';
import {
  UserStore,
  ToastStore
} from '../stores';
import {Toast} from '../components';

@observer
class LoginPage extends React.Component {

  @observable username = '';
  @observable password = '';
  @observable toastMessage = '';

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  componentWillMount() {
    console.log('will mount', this.props.location.query);
    if (this.props.location.query.logout && this.props.location.query.logout === 'true') {
      UserStore.clearToken();
    }
  }

  @action
  handleChange(e) {
    this[e.target.name] = e.target.value;
  }

  async login(e) {
    e.preventDefault();

    try {
      let token = await Transport.call('api/Account/auth/', {
        body: {
          username: this.username,
          password: this.password
        },
        method: 'POST'
      });

      UserStore.setToken(token.token);
      browserHistory.push('home');
    }
    catch (error) {
      ToastStore.addToastMessage('Wrong username or password');
    }
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Hattrick training assistant
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <div className="container">
          <form onSubmit={this.login}>
            <FormGroup
              controlId="username"
            >
              <ControlLabel>Username</ControlLabel>
              <FormControl
                type="text"
                value={this.username}
                placeholder="Enter text"
                onChange={this.handleChange}
                name="username"
              />
            </FormGroup>
            <FormGroup
              controlId="password"
            >
              <ControlLabel>Password</ControlLabel>
              <FormControl
                name="password"
                type="password"
                value={this.password}
                placeholder="Enter text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button
              bsStyle="primary"
              type="submit"
              className="pull-right"
            >
              Log in
            </Button>
          </form>
        </div>
        <Toast/>
      </div>
    )
  }
}

export default LoginPage;