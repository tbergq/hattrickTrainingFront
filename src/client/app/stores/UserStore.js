import {observer} from 'mobx-react';
import {observable, action, computed} from 'mobx';
import {Transport} from '../utils';
import jwtDecode from 'jwt-decode';

class UserStore {

  @observable token = null;
  tokenKey = 'token';

  constructor() {
    let token = localStorage.getItem(this.tokenKey);
    this.setToken = this.setToken.bind(this);

    if (token) {
      this.setToken(token)
    }
  }

  @computed
  get isAuthenticated() {
    return this.token != null;
  }

  @computed
  get tokenData() {
    let decoded = jwtDecode(this.token);
    decoded.expireTime = new Date(decoded.exp * 1000);
    return decoded;
  }

  @action
  clearToken() {
    this.token = null;
    Transport.clearToken();
    localStorage.removeItem(this.tokenKey);
  }

  @action
  setToken(token) {
    this.token = token;
    Transport.setToken(token);
    localStorage.setItem(this.tokenKey, token);
  }



}

const userStore = new UserStore();

export default userStore;