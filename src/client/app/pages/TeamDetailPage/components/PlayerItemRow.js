import React from 'react';
import {observer} from 'mobx-react';
import {action, observable} from 'mobx';
import {Link} from 'react-router';
import {
  Button,
  Glyphicon
} from 'react-bootstrap';

@observer
class PlayerItemRow extends React.Component {

  constructor(props) {
    super(props);

    this.deletePlayer = this.deletePlayer.bind(this);
  }

  @action
  deletePlayer() {
    this.props.deleteCallback(this.props.player);
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
        <td>
          <Button bsStyle="danger" onClick={this.deletePlayer}>
            <Glyphicon glyph="trash"/>
          </Button>
        </td>
      </tr>
    )
  }
}

export default PlayerItemRow;