import {
  action,
  observable,
  computed
} from 'mobx';

class TeamModel {

  @observable id;
  @observable team_name;
  @observable hattrick_team_id;

  constructor(team) {
    this.setValues(team);
  }

  @action
  setValues(team) {
    if (team.id) {
      this.id = team.id;
    }

    if (team.team_name) {
      this.team_name = team.team_name;
    }

    if (team.hattrick_team_id) {
      this.hattrick_team_id = team.hattrick_team_id;
    }
  }

  @action
  update(team) {
    this.setValues(team);
  }
}

export default TeamModel;