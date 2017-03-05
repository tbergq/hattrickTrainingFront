import {
  action,
  computed,
  observable
} from 'mobx';
import ChangeModel from './ChangeModel';
import moment from 'moment';

class TeamChangeModel extends ChangeModel {

  @observable player;

  constructor(change) {
    super(change);
  }

  @action
  setValue(change) {
    this.player = change.player.name;
    delete change.player;
    super.setValue(change);
  }
}

export default TeamChangeModel;