import React from 'react';
import {observer} from 'mobx-react';
import {action, observable} from 'mobx';
import {
  PlayerStore,
  ToastStore
} from '../../stores';
import {browserHistory} from 'react-router';
import {
  Button,
  Table,
  Glyphicon
} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import styles from './PlayerDetail.scss';

@observer
class PlayerDetailPage extends React.Component {

  @observable player     = null;
  @observable changeDate = new Date().toISOString();
  @observable dateFormat = 'DD/MM/YYYY';

  constructor(props) {
    super(props);

    this.dateChanged = this.dateChanged.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  @action
  async componentWillMount() {
    if (navigator.language === 'nb') {
      this.dateFormat = 'DD.MM.YYYY';
    }
    try {
      this.player = await PlayerStore.getPlayer(this.props.routeParams.teamId, this.props.routeParams.playerId);
    }
    catch (err) {
      browserHistory.push('/home');
    }
  }

  @action
  changeValue(key, increment) {
    let value = increment ? 1 : -1;

    if (increment && this.player[key] === 20) {
      ToastStore.addToastMessage(`Player's skill is already at max value`);
      return;
    }
    else if (!increment && this.player[key] === 0) {
      ToastStore.addToastMessage(`Player's skill is already at minimum value`);
      return;
    }

    this.player[key] += value;
  }

  @action
  dateChanged(value) {
    this.changeDate = value;
  }

  render() {
    if (!this.player) {
      return <div className="container">...loading</div>
    }

    return (
      <div className="container">
        <h2>{this.player.name}</h2>
        <Table responsive bordered striped>
          <thead>
          <tr>
            <th colSpan="4">
              <div className="pull-left">
                <label>Change date</label>
                <DatePicker
                  value={this.changeDate}
                  onChange={this.dateChanged}
                  dateFormat={this.dateFormat}
                  weekStartsOnMonday={true}
                  className={styles.datePicker}
                />
              </div>
            </th>
          </tr>
          <tr>
            <th>Skill</th>
            <th>Current value</th>
            <th>Last change</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Keeper</td>
            <td>{this.player.keeper}</td>
            <td>N/A</td>
            <td>
              <Button
                bsStyle="success"
                bsSize="small"
                onClick={() => this.changeValue('keeper', true)}
              >
                <Glyphicon glyph="plus"/>
              </Button>
              <Button
                bsSize="small"
                onClick={() => this.changeValue('keeper', false)}
              >
                <Glyphicon glyph="minus"/>
              </Button>
            </td>
          </tr>
          <tr>
            <td>Defending</td>
            <td>{this.player.defending}</td>
            <td>N/A</td>
            <td>
              <Button
                bsStyle="success"
                bsSize="small"
                onClick={() => this.changeValue('defending', true)}
              >
                <Glyphicon glyph="plus"/>
              </Button>
              <Button
                bsSize="small"
                onClick={() => this.changeValue('defending', false)}
              >
                <Glyphicon glyph="minus"/>
              </Button>
            </td>
          </tr>
          <tr>
            <td>Playmaking</td>
            <td>{this.player.playmaking}</td>
            <td>N/A</td>
            <td>
              <Button
                bsStyle="success"
                bsSize="small"
                onClick={() => this.changeValue('playmaking', true)}
              >
                <Glyphicon glyph="plus"/>
              </Button>
              <Button
                bsSize="small"
                onClick={() => this.changeValue('playmaking', false)}
              >
                <Glyphicon glyph="minus"/>
              </Button>
            </td>
          </tr>
          <tr>
            <td>Winger</td>
            <td>{this.player.winger}</td>
            <td>N/A</td>
            <td>
              <Button
                bsStyle="success"
                bsSize="small"
                onClick={() => this.changeValue('winger', true)}
              >
                <Glyphicon glyph="plus"/>
              </Button>
              <Button
                bsSize="small"
                onClick={() => this.changeValue('winger', false)}
              >
                <Glyphicon glyph="minus"/>
              </Button>
            </td>
          </tr>
          <tr>
            <td>Passing</td>
            <td>{this.player.passing}</td>
            <td>N/A</td>
            <td>
              <Button
                bsStyle="success"
                bsSize="small"
                onClick={() => this.changeValue('passing', true)}
              >
                <Glyphicon glyph="plus"/>
              </Button>
              <Button
                bsSize="small"
                onClick={() => this.changeValue('passing', false)}
              >
                <Glyphicon glyph="minus"/>
              </Button>
            </td>
          </tr>
          <tr>
            <td>Scoring</td>
            <td>{this.player.scoring}</td>
            <td>N/A</td>
            <td>
              <Button
                bsStyle="success"
                bsSize="small"
                onClick={() => this.changeValue('scoring', true)}
              >
                <Glyphicon glyph="plus"/>
              </Button>
              <Button
                bsSize="small"
                onClick={() => this.changeValue('scoring', false)}
              >
                <Glyphicon glyph="minus"/>
              </Button>
            </td>
          </tr>
          <tr>
            <td>Set pieces</td>
            <td>{this.player.set_pieces}</td>
            <td>N/A</td>
            <td>
              <Button
                bsStyle="success"
                bsSize="small"
                onClick={() => this.changeValue('set_pieces', true)}
              >
                <Glyphicon glyph="plus"/>
              </Button>
              <Button
                bsSize="small"
                onClick={() => this.changeValue('set_pieces', false)}
              >
                <Glyphicon glyph="minus"/>
              </Button>
            </td>
          </tr>
          </tbody>
        </Table>
        <div className="pull-right">
          <Button onClick={() => {
            browserHistory.goBack()
          }}
          >
            Back
          </Button>
          <Button
            bsStyle="primary"
          >
            Save
          </Button>
        </div>
      </div>
    )
  }
}

export default PlayerDetailPage;