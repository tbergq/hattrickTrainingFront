import React from 'react';
import {observer} from 'mobx-react';
import {action, observable} from 'mobx';

@observer
class PlayerItemRow extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let player = this.props.player;
    return (
      <tr>
        <td>{player.name}</td>
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