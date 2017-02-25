import React from 'react';
import {observer} from 'mobx-react';
import {action, observable} from 'mobx';
import {TeamStore} from '../../stores';
import {PlayerTable} from './components';

@observer
class TeamDetailPage extends React.Component {

  @observable team = null;

  constructor(props) {
    super(props);

    this.setTeam = this.setTeam.bind(this);
  }


  async componentWillMount() {
    let team =  await TeamStore.fetchTeam(this.props.routeParams.id);
    this.setTeam(team);
  }

  @action
  setTeam(team) {
    this.team = team;
  }

  render() {
    if (!this.team) {
      return <div className="container">...loading</div>
    }
    return (
      <div className="container">
        <h2>{this.team.team_name}</h2>
        <div>
          <PlayerTable team={this.team} />
        </div>
      </div>
    )
  }
}

export default TeamDetailPage;