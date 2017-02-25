import {action, observable, computed} from 'mobx';
import {Transport} from '../utils';
import {ToastStore} from './';
import {ChangeModel} from './models';
import moment from 'moment';

const url = 'api/teams/';

class ChangeStore {

  @observable changes = [];


  _getChangeById(id) {
    id = parseInt(id);

    let change = this.changes.find(change => {
      return change.id === id;
    });

    return change;
  }

  _getLatestChangeBySkill(skill) {
    let change = this.changes.find(change => {
      return change.skill === skill;
    });

    return change;
  }

  @computed
  get latestKeeperChange() {
    let change = this._getLatestChangeBySkill('keeper');

    return change;
  }

  @computed
  get latestDefendingChange() {
    let change = this._getLatestChangeBySkill('defending');

    return change;
  }

  @computed
  get latestPlaymakingChange() {
    let change = this._getLatestChangeBySkill('playmaking');

    return change;
  }

  @computed
  get latestWingerChange() {
    let change = this._getLatestChangeBySkill('winger');

    return change;
  }

  @computed
  get latestPassingChange() {
    let change = this._getLatestChangeBySkill('passing');

    return change;
  }

  @computed
  get latestScoringChange() {
    let change = this._getLatestChangeBySkill('scoring');

    return change;
  }

  @computed
  get latestSetPiecesChange() {
    let change = this._getLatestChangeBySkill('set_pieces');

    return change;
  }

  @action
  async addChanges(changes, teamId, playerId) {
    try {
      let promises = [];

      changes.forEach(change => {
        promises.push(
          Transport.call(`${url}${teamId}/players/${playerId}/changes/`, {
            method: 'POST',
            body: change
          })
        );
      });

      let results = await Promise.all(promises);

      results.forEach(action(result => {
        this.changes.push(new ChangeModel(result));
      }));

      this.sortByDate();

      return null;
    }
    catch (err) {
      ToastStore.addToastMessage('Failed to add change set');
      console.log(err);
      throw err;
    }
  }

  @action
  getLatestChange(key) {
    let change = this.changes.find(change => {
      return change.skill === key;
    });

    return change ? change : 'No changes registered';
  }

  @action
  async fetchChanges(teamId, playerId) {
    try {
      this.changes = [];
      let changes  = await Transport.call(`${url}${teamId}/players/${playerId}/changes/`);

      changes.forEach(action(change => {
        let existingChange = this._getChangeById(change.id);

        if (existingChange) {
          existingChange.update(change);
        }
        else {
          this.changes.push(new ChangeModel(change));
        }
      }));

      return this.changes;
    }
    catch (err) {
      ToastStore.addToastMessage('Failed to fetch changes');
      console.log(err);
      throw err;
    }
  }

  @action
  sortByDate() {
    this.changes = this.changes.sort((item1, item2) => {
      if (moment(item1.change_date) > moment(item2.change_date)) {
        return -1;
      }
      if (moment(item1.change_date) < moment(item2.change_date)) {
        return 1;
      }

      return 0;
    });
  }
}

const singelton = new ChangeStore();

export default singelton;
