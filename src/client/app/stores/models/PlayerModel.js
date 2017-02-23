import {
  action,
  observable,
  computed
} from 'mobx';

class PlayerModel {

  @observable id;
  @observable name;
  @observable team;
  @observable keeper;
  @observable defending;
  @observable playmaking;
  @observable winger;
  @observable passing;
  @observable scoring;
  @observable set_pieces;

  constructor(player) {
    this.setValues(player);
  }

  @action
  setValues(player) {
    for(let key in player) {
      this[key] = player[key];
    }
  }

  @action
  update(player) {
    this.setValues(player);
  }
}

export default PlayerModel;