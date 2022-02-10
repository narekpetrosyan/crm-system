import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import AuthService from '@http/auth-service/auth-service';
import { history } from '@utils/history/history';

export default class AuthStore {
  isAuth = JSON.parse(localStorage.getItem('isAuth')) || false;

  isLoading = false;

  constructor() {
    this.authService = new AuthService();
    makeAutoObservable(this);
    this.logout = this.logout.bind(this);
  }

  async login({ email, password }) {
    this.isLoading = true;
    try {
      const { data } = await this.authService.login(email, password);

      this.isAuth = true;
      localStorage.setItem('isAuth', JSON.stringify(true));
      localStorage.setItem('token', data.token);
      history.push('/dashboard');
    } catch (error) {
      if (error.response.data.errors && Object.keys(error.response.data.errors).length) {
        Object.values(error.response.data.errors).forEach((item) => {
          toast.error(item[0]);
        });
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      this.isLoading = false;
    }
  }

  async register({ name, email, password, password_confirmation }) {
    this.isLoading = true;
    try {
      const { data } = await this.authService.register(
        name,
        email,
        password,
        password_confirmation,
      );

      this.isAuth = true;
      localStorage.setItem('isAuth', JSON.stringify(true));
      localStorage.setItem('token', data.token);
      history.push('/dashboard');
    } catch (error) {
      if (error.response.data.errors && Object.keys(error.response.data.errors).length) {
        Object.values(error.response.data.errors).forEach((item) => {
          toast.error(item[0]);
        });
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    this.isLoading = true;
    try {
      await this.authService.logout();
      localStorage.setItem('isAuth', JSON.stringify(false));
      localStorage.removeItem('token');
      history.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }
}
