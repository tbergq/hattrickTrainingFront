import React from 'react';
import {observer} from'mobx-react';
import {
  action,
  observable
} from 'mobx';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';
import {
  LinkContainer
} from 'react-router-bootstrap'
import {Link} from 'react-router';

@observer
class Header extends React.Component {

  render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="home">
              Hattrick training assistant
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={{pathname: '/home'}}>
              <NavItem eventKey={1}>Teams</NavItem>
            </LinkContainer>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown" style={{display: 'none'}}>
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider/>
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem>Hello {this.props.username}</NavItem>
            <LinkContainer to={{pathname: '/', query: {logout: true}}}>
              <NavItem eventKey={1}>Log out</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Header;