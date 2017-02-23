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
        <th>{player.name}</th>
        <th>{player.keeper}</th>
        <th>{player.defending}</th>
        <th>{player.playmaking}</th>
        <th>{player.winger}</th>
        <th>{player.passing}</th>
        <th>{player.scoring}</th>
        <th>{player.set_pieces}</th>
      </tr>
    )
  }
}

export default PlayerItemRow;