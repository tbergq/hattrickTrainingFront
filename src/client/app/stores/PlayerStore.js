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
    id = parseInt(id);

    let player = this.players.find(player => {
      return player.id === id;
    });

    return player;
  }

  @action
  async addPlayer(player) {
    try {
      let response = await Transport.call(`${url}${player.team}/players/`, {
        method: 'POST',
        body: player
      });

      let setPlayer = action(player => {this.players.push(player)});
      setPlayer(new PlayerModel(response));
      return response;
    }
    catch (err) {
      ToastStore.addToastMessage('Failed to add player');
      console.log(err);
      throw err;
    }
  }

  @action
  async getPlayer(teamId, playerId) {
    let player = this._getPlayerById(playerId);

    if (player) {
      return player;
    }

    try {
      player          = await Transport.call(`${url}${teamId}/players/${playerId}/`);
      let playerModel = new PlayerModel(player);
      let setPlayer = action(player => {this.players.push(player)});
      setPlayer(playerModel);
      return playerModel;
    }
    catch (err) {
      ToastStore.addToastMessage('Failed to get player');
      console.log(err);
      throw err;
    }
  }

  @action
  async fetchPlayers(teamId) {
    try {
      let players = await Transport.call(`${url}${teamId}/players/`);

      players.forEach(action(player => {
        let existingPlayer = this._getPlayerById(player.id);

        if (existingPlayer) {
          existingPlayer.update(player);
        }
        else {
          this.players.push(new PlayerModel(player));
        }
      }));
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

  @action
  async update(player, teamId) {
    try {
      let updatedPlayer = await Transport.call(`${url}${teamId}/players/${player.id}/`, {
        method: 'PATCH',
        body: player
      });

      let existingPlayer = this._getPlayerById(player.id);
      existingPlayer.update(updatedPlayer);
      return existingPlayer;
    }
    catch(err) {
      ToastStore.addToastMessage('Failed to update player');
      console.log(err);
      throw err;
    }
  }
}

const singelton = new PlayerStore();

export default singelton;
