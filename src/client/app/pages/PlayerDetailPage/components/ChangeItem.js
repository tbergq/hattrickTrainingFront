import React from 'react';
import {observer} from 'mobx-react';
import {action, observable} from 'mobx';
import {Glyphicon} from 'react-bootstrap';
import moment from 'moment';
import styles from '../PlayerDetail.scss';

@observer
class ChangeItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let change = this.props.changeItem;

    if (!change) {
      return <div>No changes detected</div>
    }

    return (
      <div>
        <div className="pull-left">{moment(change.change_date).format('L')}</div>
        <div className="pull-right">
          {change.new_value > change.old_value ?
            <Glyphicon glyph="arrow-up" style={{color: '#449d44'}}/> :
            <Glyphicon glyph="arrow-down" style={{color: '#d9534f'}}/>
          }
        </div>
      </div>
    )
  }
}

export default ChangeItem;