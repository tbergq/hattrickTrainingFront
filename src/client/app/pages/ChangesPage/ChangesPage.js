import React from 'react';
import {observer} from 'mobx-react';
import {action, observable} from 'mobx';
import {
  TeamStore,
  TeamChangeStore
} from '../../stores';
import {
  Table,
  Glyphicon,
  Button
} from 'react-bootstrap'
import styles from './ChangesPage.scss';


@observer
class ChangesPage extends React.Component {

  constructor(props) {
    super(props);

    this.teamChange = this.teamChange.bind(this);
  }

  async componentWillMount() {
    let teams = await TeamStore.fetchTeams();

    if (teams.length === 0) {
      return;
    }

    let firstTeamId = teams[0].id;
    await TeamChangeStore.fetchTeamChanges(firstTeamId);
  }


  async teamChange(e) {
    await TeamChangeStore.fetchTeamChanges(e.target.value);
  }

  render() {
    let teams = TeamStore.teams;
    let changes = TeamChangeStore.changes;

    return (
      <div className="container">
        <Table responsive bordered striped>
          <thead>
          <tr>
            <th colSpan="5">
              <select className={`form-control ${styles.teamSelector}`} onChange={this.teamChange}>
                {teams.map(team => {
                  return (
                    <option key={team.id} value={team.id}>
                      {team.team_name}
                    </option>
                  )
                })}
              </select>
            </th>
          </tr>
          <tr>
            <th>Player</th>
            <th>Skill</th>
            <th>Old value</th>
            <th>New Value</th>
            <th>Change date</th>
          </tr>
          </thead>
          <tbody>
          {changes.map(change => {
            return (
              <tr key={change.id}>
                <td>{change.player}</td>
                <td>
                  {change.skill}
                  <div className="pull-right">
                    {change.new_value > change.old_value ?
                      <Glyphicon glyph="arrow-up" style={{color: '#449d44'}}/> :
                      <Glyphicon glyph="arrow-down" style={{color: '#d9534f'}}/>
                    }
                  </div>
                </td>
                <td>{change.old_value}</td>
                <td>{change.new_value}</td>
                <td>{change.date}</td>
              </tr>
            )
          })}
          </tbody>
          <tfoot>
          <tr>
            <td colSpan="5">
              <div className="pull-left">
                <Button
                  onClick={() => TeamChangeStore.fetchPrevious()}
                  disabled={!TeamChangeStore.previous}
                >
                  <Glyphicon glyph="chevron-left"/>
                </Button>
                <Button
                  onClick={() => TeamChangeStore.fetchNext()}
                  disabled={!TeamChangeStore.next}
                >
                  <Glyphicon glyph="chevron-right"/>
                </Button>
              </div>
              <div className="pull-right">Count: {TeamChangeStore.totalCount}</div>
            </td>
          </tr>
          </tfoot>
        </Table>
      </div>
    )
  }
}

export default ChangesPage;