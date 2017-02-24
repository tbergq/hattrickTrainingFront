import React from 'react';
import {observer} from 'mobx-react';
import {action, observable} from 'mobx';
import {
  PlayerStore,
  ToastStore,
  ChangeStore
} from '../../stores';
import {browserHistory} from 'react-router';
import {
  Button,
  Table,
  Glyphicon
} from 'react-bootstrap';
import {ChangeItem} from './components';
import DatePicker from 'react-bootstrap-date-picker';
import styles from './PlayerDetail.scss';
import moment from 'moment';

const NO_CHANGE_DETECTED = 'No changes detected';

@observer
class PlayerDetailPage extends React.Component {

  @observable player     = null;
  @observable changeDate = new Date().toISOString();
  @observable dateFormat = 'DD/MM/YYYY';
              changes    = [];

  constructor(props) {
    super(props);

    this.dateChanged     = this.dateChanged.bind(this);
    this.changeValue     = this.changeValue.bind(this);
    this.submitChanges   = this.submitChanges.bind(this);
    this.getLatestChange = this.getLatestChange.bind(this);
  }

  @action
  async componentWillMount() {
    if (navigator.language === 'nb') {
      this.dateFormat = 'DD.MM.YYYY';
    }

    try {
      this.player = await PlayerStore.getPlayer(this.props.routeParams.teamId, this.props.routeParams.playerId);
      await ChangeStore.fetchChanges(this.props.routeParams.teamId, this.props.routeParams.playerId);
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

    let oldValue = this.player[key];
    this.player[key] += value;

    this.changes.push({
      player: this.player.id,
      change_date: moment(new Date(this.changeDate)).format('YYYY-MM-DD'),
      old_value: oldValue,
      new_value: this.player[key],
      skill: key
    });
  }

  @action
  dateChanged(value) {
    this.changeDate = value;
  }

  @action
  getLatestChange(key) {
    console.log('test', ChangeStore.changes.slice());
    return 'test';
  }

  @action
  async submitChanges() {
    try {
      await ChangeStore.addChanges(this.changes, this.props.routeParams.teamId, this.props.routeParams.playerId);
      this.player = await PlayerStore.update(this.player, this.props.routeParams.teamId);
      ToastStore.addToastMessage('Changes submitted');
    }
    catch (err) {

    }
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
            <th>Latest change</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Keeper</td>
            <td>{this.player.keeper}</td>
            <td>
              <ChangeItem
                changeItem={ChangeStore.latestKeeperChange}
              />
            </td>
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
            <td>
              <ChangeItem
                changeItem={ChangeStore.latestDefendingChange}
              />
            </td>
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
            <td>
              <ChangeItem
                changeItem={ChangeStore.latestPlaymakingChange}
              />
            </td>
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
            <td>
              <ChangeItem
                changeItem={ChangeStore.latestWingerChange}
              />
            </td>
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
            <td>
              <ChangeItem
                changeItem={ChangeStore.latestPassingChange}
              />
            </td>
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
            <td>
              <ChangeItem
                changeItem={ChangeStore.latestScoringChange}
              />
            </td>
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
            <td>
              <ChangeItem
                changeItem={ChangeStore.latestSetPiecesChange}
              />
            </td>
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
            onClick={this.submitChanges}
          >
            Save
          </Button>
        </div>
      </div>
    )
  }
}

export default PlayerDetailPage;