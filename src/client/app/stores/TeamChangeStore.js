import {action, observable, computed} from 'mobx';
import {TeamChangeModel} from './models';
import {ToastStore} from './';
import {Transport} from '../utils';

const url = 'api/teams/';

class TeamChangeStore {

  @observable changes = [];
  @observable next;
  @observable previous;
  @observable totalCount;
  limit = 10;

  constructor() {
    this.totalCount = 0;
    this.next = null;
    this.previous = null;
  }

  async _fetchByUrl(url) {
    try {
      let response = await Transport.call(url);
      let changes = response.results;

      this.addChanges(changes);
      this.setPaginationData(response);
      return this.changes;
    }
    catch (err) {
      ToastStore.addToastMessage('Failed to fetch changes for team');
      console.log('err', err);
      throw err;
    }
  }

  @action
  addChange(change) {
    this.changes.push(new TeamChangeModel(change));
  }

  addChanges(changes) {
    changes.forEach(change => {
      this.addChange(change);
    });
  }

  async fetchNext() {
    this.resetChanges();
    await this._fetchByUrl(this.next);
    return this.changes;
  }

  async fetchPrevious() {
    this.resetChanges();
    await this._fetchByUrl(this.previous);
    return this.changes;
  }

  async fetchTeamChanges(id) {
    this.resetChanges();
    await this._fetchByUrl(`${url}${id}/changes/?limit=${this.limit}`);
    return this.changes;
  }

  @action
  resetChanges() {
    this.changes = [];
  }

  @action
  setPaginationData(data) {
    this.next = data.next ? data.next.split('/').slice(3).join('/') : null;
    this.previous = data.previous ? data.previous.split('/').slice(3).join('/') : null;

    this.totalCount = data.count;
  }
}

const singelton = new TeamChangeStore();

export default singelton;
