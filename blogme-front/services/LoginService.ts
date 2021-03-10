import { observable, action, makeAutoObservable, computed } from "mobx";
import {GetAPI, PostAPI} from "../utils/axios"
import Cookies from 'universal-cookie';
import moment from 'moment'
 
const cookies = new Cookies();
const cookieOptions = {
  path: '/',
  expires: moment().add(1, 'days').toDate()
}

export class LoginService {

  constructor() {
    makeAutoObservable(this)
  }

  @observable
  public email: string = ''

  @observable
  public password: string = ''

  @computed
  public async sendLogin() {
    const payload = {
      email: this.email,
      password: this.password
    }

    const {response, error} = await PostAPI('login', payload)
    if (error) {
      // TODO: Handle this
      console.error(error)
    }
    console.log(response.data.data)
    cookies.set('jwt', response.data.data.access_token, cookieOptions);
  }

  @action
  public setEmail(email: string) {
    this.email = email
  }

  @action
  public setPassword(password: string) {
    this.password = password
  }
}