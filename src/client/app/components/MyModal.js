import React from 'react';
import {observer} from'mobx-react';
import {
  action,
  observable
} from 'mobx';
import {
  Modal
} from 'react-bootstrap';

@observer
class MyModal extends React.Component {

  render() {
    let footer = this.props.footer ? (
        <Modal.Footer>
          {this.props.footer}
        </Modal.Footer>
      ) : null;

    let bodyStyle = {};

    if (!footer) {
      bodyStyle = {
        paddingBottom: '50px'
      };
    }

    return (
      <div>
        <Modal show={this.props.show}>
          <Modal.Header>
            <Modal.Title>
              {this.props.title}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body
            style={bodyStyle}
          >
            {this.props.body}
          </Modal.Body>

          {footer}
        </Modal>
      </div>
    )
  }
}

export default MyModal;