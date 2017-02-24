import {
  action,
  observable,
  computed
} from 'mobx';
import {TeamModel} from './models';
import {Transport} from '../utils';
import {ToastStore} from './';

const url = 'api/teams/';

class TeamStore {
  @observable teams = [];

  @action
  async addTeam(team) {
    try {
      let addedTeam = await Transport.call(url, {
        method: 'POST',
        body: team
      });
      this.teams.push(new TeamModel(addedTeam));
    }
    catch (err) {
      ToastStore.addToastMessage('Failed to add team');
      console.log(err);
      throw err;
    }
  }

  @action
  async deleteTeam(id) {
    try {
      await Transport.call(`${url}${id}/`, {
        method: 'DELETE'
      });
      let index = this.teams.findIndex(team => {
        return team.id === id;
      });
      this.teams.splice(index, 1);
      console.log('sliced teams', this.teams.slice());
    }
    catch (err) {
      ToastStore.addToastMessage('Could not delete team');
      console.log(err);
      throw err;
    }
  }

  getTeamById(id) {
    let team = this.teams.find(team => {
      return team.id === id;
    });
    return team;
  }

  @action
  async fetchTeam(id) {
    let team = this.getTeamById(id);

    if (team) {
      return team;
    }

    try {
      team = await Transport.call(`${url}${id}/`);
      return team;
    }
    catch (err) {
      ToastStore.addToastMessage(`Failed to get team with id = ${id}`);
      console.log(err);
      throw err;
    }
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
      return this.teams;
    }
    catch (err) {
      ToastStore.addToastMessage('Failed to fetch teams from server');
      console.log(err);
      throw err;
    }
  }

  @action
  async updateTeam(team) {
    try {
      let updatedTeam = await Transport.call(`${url}${team.id}/`, {
        method: 'PATCH',
        body: team
      });

      let existingTeam = this.getTeamById(team.id);
      existingTeam.update(team);
    }
    catch (err) {
      ToastStore.addToastMessage('Failed to update team');
      console.log(err);
      throw err;
    }
  }
}

const singelton = new TeamStore();

export default singelton;