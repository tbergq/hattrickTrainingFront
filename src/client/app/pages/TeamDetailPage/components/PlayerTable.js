import React from 'react';
import {observer} from 'mobx-react';
import {action, observable} from 'mobx';
import {
  Table,
  Button
} from 'react-bootstrap'
import {PlayerStore} from '../../../stores';
import {PlayerItemRow} from './';

@observer
class PlayerTable extends React.Component {

  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    await PlayerStore.fetchPlayers(this.props.team.id);
  }

  render() {
    let players = PlayerStore.players;

    return (
      <div>
        <Table responsive striped bordered>
          <thead>
          <tr>
            <th colSpan="8">
              <Button bsStyle="success">
                Add player
              </Button>
            </th>
          </tr>
          <tr>
            <th>Player</th>
            <th>Keeper</th>
            <th>Defending</th>
            <th>Playmaking</th>
            <th>Winger</th>
            <th>Passing</th>
            <th>Scoring</th>
            <th>Set pieces</th>
          </tr>
          </thead>
          <tbody>
          {players.map(player => {
            return (
              <PlayerItemRow player={player} key={player.id}/>
            )
          })}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default PlayerTable;