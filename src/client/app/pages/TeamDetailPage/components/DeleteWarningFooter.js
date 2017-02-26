import React from 'react';
import {observer} from 'mobx-react';
import {action, observable} from 'mobx';
import {
  Button
} from 'react-bootstrap';

@observer
class DeleteWarningFooter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button
          onClick={this.props.cancel}
        >
          Cancel
        </Button>
        <Button
          bsStyle="danger"
          onClick={this.props.deletePlayer}
        >
          Delete
        </Button>
      </div>
    )
  }
}

export default DeleteWarningFooter;