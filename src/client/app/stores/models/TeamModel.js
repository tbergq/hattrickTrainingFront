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
    this.id = team.id;
    this.team_name = team.team_name;
    this.hattrick_team_id = team.hattrick_team_id;
  }

  @action
  update(team) {
    this.setValues(team);
  }
}

export default TeamModel;