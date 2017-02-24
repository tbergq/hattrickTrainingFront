import {
  action,
  observable,
  computed
} from 'mobx';
import {ToastStore} from './';
import {Transport} from '../utils';
import {PlayerModel} from './models';

const url = 'api/teams/';

class PlayerStore {

  @observable players = [];

  _getPlayerById(id) {
    let player = this.players.find(player => {
      return player.id === id;
    });
  }

  @action
  async addPlayer(player) {
    try {
      let response = await Transport.call(`${url}${player.team}/players/`, {
        method: 'POST',
        body: player
      });

      this.players.push(new PlayerModel(response));
      return response;
    }
    catch (err) {
      ToastStore.addToastMessage('Failed to add player');
      console.log(err);
      throw err;
    }
  }

  @action
  async fetchPlayers(teamId) {
    try {
      let players = await Transport.call(`${url}${teamId}/players/`);

      players.forEach(player => {
        let existingPlayer = this._getPlayerById(player.id);

        if (existingPlayer) {
          existingPlayer.update(player);
        }
        else {
          this.players.push(new PlayerModel(player));
        }
      });
      return this.players;
    }
    catch (err) {
      ToastStore.addToastMessage('Failed to get players');
      console.log(err);
      throw err;
    }
  }

  @action
  sortBy(column, ascending) {
    let modifier = 1;

    if (ascending) {
      modifier = -1;
    }

    this.players = this.players.sort((item1, item2) => {
      if (item1[column] < item2[column]) {
        return -1 * modifier;
      }

      if (item1[column] > item2[column]) {
        return 1 * modifier;
      }

      return 0;
    });
  }
}

const singelton = new PlayerStore();

export default singelton;
