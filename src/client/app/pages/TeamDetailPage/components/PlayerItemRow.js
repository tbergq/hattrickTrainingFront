import React from 'react';
import {observer} from 'mobx-react';
import {action, observable} from 'mobx';
import {Link} from 'react-router';

@observer
class PlayerItemRow extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let player = this.props.player;
    return (
      <tr>
        <td>
          <Link to={`/home/player/${player.team}/${player.id}`}>
            {player.name}
          </Link>
        </td>
        <td>{player.keeper}</td>
        <td>{player.defending}</td>
        <td>{player.playmaking}</td>
        <td>{player.winger}</td>
        <td>{player.passing}</td>
        <td>{player.scoring}</td>
        <td>{player.set_pieces}</td>
      </tr>
    )
  }
}

export default PlayerItemRow;