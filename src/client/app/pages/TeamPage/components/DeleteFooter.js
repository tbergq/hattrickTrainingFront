import React from 'react';
import {observer} from 'mobx-react';
import {action, observable} from 'mobx';
import {Button} from 'react-bootstrap';

@observer
class DeleteFooter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button onClick={this.props.cancel}>Cancel</Button>
        <Button bsStyle="danger" onClick={this.props.delete}>Delete</Button>
      </div>
    )
  }
}

export default DeleteFooter;