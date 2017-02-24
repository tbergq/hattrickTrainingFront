import React from 'react';
import {observer} from 'mobx-react';
import {action, observable} from 'mobx';
import {
  Table,
  Button
} from 'react-bootstrap'
import {PlayerStore} from '../../../stores';
import {MyModal} from '../../../components';
import {
  PlayerItemRow,
  AddPlayerForm
} from './';

@observer
class PlayerTable extends React.Component {

  @observable showModal        = false;
  @observable title            = null;
  @observable body             = null;
  @observable footer           = null;
              currentSortColum = '';

  constructor(props) {
    super(props);

    this.showAddPlayer = this.showAddPlayer.bind(this);
    this.toggleModal   = this.toggleModal.bind(this);
    this.sort          = this.sort.bind(this);
  }

  async componentWillMount() {
    this.showModal = false;
    await PlayerStore.fetchPlayers(this.props.team.id);
  }

  @action
  showAddPlayer() {
    this.title  = 'Add new player';
    this.body   = <AddPlayerForm toggleModal={this.toggleModal} teamId={this.props.team.id}/>;
    this.footer = null;
    this.toggleModal();
  }

  @action
  sort(column) {
    let ascending = false;

    if (column === this.currentSortColum) {
      ascending = true;
      this.currentSortColum = `-${column}}`;
    }
    else {
      this.currentSortColum = column;
    }

    PlayerStore.sortBy(column, ascending);
  }

  @action
  toggleModal() {
    this.showModal = !this.showModal;
  }

  render() {
    let players = PlayerStore.players;

    return (
      <div>
        <Table responsive striped bordered>
          <thead>
          <tr>
            <th colSpan="8">
              <Button
                bsStyle="success"
                onClick={this.showAddPlayer}
              >
                Add player
              </Button>
            </th>
          </tr>
          <tr>
            <th className="sortable-header" onClick={() => this.sort('name')}>Player</th>
            <th className="sortable-header" onClick={() => this.sort('keeper')}>Keeper</th>
            <th className="sortable-header" onClick={() => this.sort('defending')}>Defending</th>
            <th className="sortable-header" onClick={() => this.sort('playmaking')}>Playmaking</th>
            <th className="sortable-header" onClick={() => this.sort('winger')}>Winger</th>
            <th className="sortable-header" onClick={() => this.sort('passing')}>Passing</th>
            <th className="sortable-header" onClick={() => this.sort('scoring')}>Scoring</th>
            <th className="sortable-header" onClick={() => this.sort('set_pieces')}>Set pieces</th>
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
        <MyModal
          show={this.showModal}
          title={this.title}
          body={this.body}
          footer={this.footer}
        />
      </div>
    )
  }
}

export default PlayerTable;