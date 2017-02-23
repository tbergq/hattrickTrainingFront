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
    }
  }
}

const singelton = new PlayerStore();

export default singelton;
