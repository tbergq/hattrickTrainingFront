import {
  action,
  observable,
  computed
} from 'mobx';


class ToastStore {
  @observable toastMessage = '';

  @action
  addToastMessage(message) {
    this.toastMessage = message;
  }

  @action
  clearToastMessage() {
    this.toastMessage = '';
  }
}

const singelton = new ToastStore();

export default singelton;