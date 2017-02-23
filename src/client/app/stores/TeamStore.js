import {
  action,
  observable,
  computed
} from 'mobx';
import {TeamModel} from './models';
import {Transport} from '../utils';
import {ToastStore} from './';

const url = 'api/Teams/teams/';

class TeamStore {
  @observable teams = [];

  getTeamById(id) {
    let team = this.teams.find(team => {
      return team.id === id;
    });
    return team;
  }

  @action
  async fetchTeams() {
    try {
      let serverTeams = await Transport.call(url);
      serverTeams.forEach(team => {
        let existingTeam = this.getTeamById(team.id);

        if (existingTeam) {
          existingTeam.update(team);
        }
        else {
          this.teams.push(new TeamModel(team));
        }
      });
      console.log('got teams', this.teams.slice());
      return this.teams;
    }
    catch (err) {
      ToastStore.addToastMessage('Failed to fetch teams from server');
      console.log(err);
    }
  }
}

const singelton = new TeamStore();

export default singelton;