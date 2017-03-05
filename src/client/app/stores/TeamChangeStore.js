import {action, observable, computed} from 'mobx';
import {TeamChangeModel} from './models';
import {ToastStore} from './';
import {Transport} from '../utils';

const url = 'api/teams/';

class TeamChangeStore {

  @observable changes = [];

  @action
  addChange(change) {
    this.changes.push(new TeamChangeModel(change));
  }

  async fetchTeamChanges(id) {
    this.resetChanges();

    try {
      let changes = await Transport.call(`${url}${id}/changes/`);

      changes.forEach(change => {
        this.addChange(change);
      });
    }
    catch (err) {
      ToastStore.addToastMessage('Failed to fetch changes for team');
      console.log('err', err);
      throw err;
    }
  }

  @action
  resetChanges() {
    this.changes = [];
  }
}

const singelton = new TeamChangeStore();

export default singelton;
