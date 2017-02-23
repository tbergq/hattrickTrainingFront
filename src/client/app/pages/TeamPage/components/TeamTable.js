import React from 'react';
import {observer} from'mobx-react';
import {
  action,
  observable
} from 'mobx';
import {
  Table
} from 'react-bootstrap';


@observer
class TeamTable extends React.Component {

  render() {
    return (
      <Table
        responsive
        striped
        bordered
      >
        <thead>
        <tr>
          <th>Team name</th>
          <th>Hattrick id</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {this.props.teams.map(team => {
          return (
            <tr key={team.id}>
              <td>{team.team_name}</td>
              <td>{team.hattrick_team_id}</td>
              <td>action buttons</td>
            </tr>
          )
        })}
        </tbody>
      </Table>
    )
  }
}

export default TeamTable;