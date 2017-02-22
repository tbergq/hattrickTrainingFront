import React from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {browserHistory } from 'react-router';
import {Header} from './';

@observer
class App extends React.Component {


  componentWillMount() {
  }

  render() {
    return(
      <div className="app-container">
        <Header/>
        {this.props.children}
      </div>
    )
  }
}

export default App;