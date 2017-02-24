import {
  action,
  computed,
  observable
} from 'mobx';
import moment from 'moment';

class ChangeModel {

  @observable id;
  @observable change_date;
  @observable old_value;
  @observable new_value;
  @observable skill;

  constructor(change) {
    this.setValue(change);
  }

  @action
  setValue(change) {
    for (let key in change) {
      if (key === 'change_date') {
        this.change_date = moment(change.change_date).toDate();
      }
      else {
        this[key] = change[key]
      }
    }
  }

  @action
  update(change) {
    this.setValue(change);
  }
}

export default ChangeModel;