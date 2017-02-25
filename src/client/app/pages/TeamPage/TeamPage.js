import React from 'react';
import {observer} from'mobx-react';
import {
  action,
  observable
} from 'mobx';
import {TeamStore} from '../../stores';
import {
  Grid,
  Col
} from 'react-bootstrap';
import {TeamTable} from './components';


@observer
class TeamPage extends React.Component {

  @action
  async componentWillMount() {
    await TeamStore.fetchTeams();
  }

  render() {
    let teams = TeamStore.teams;
    return (
      <div className="container">
        <Grid>
          <Col xs={12}>
            <TeamTable
              teams={teams}
            />
          </Col>
        </Grid>
      </div>
    )
  }
}

export default TeamPage;  