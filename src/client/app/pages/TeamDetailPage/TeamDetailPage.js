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
  }

  async componentWillMount() {
    this.team = await TeamStore.fetchTeam(this.props.routeParams.id);
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