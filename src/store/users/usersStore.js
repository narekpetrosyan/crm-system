import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import { history } from '@utils/history/history';
import UsersService from '../../http/users-service/users-service';

export default class UsersStore {
  users = [];

  permissions = [];

  cities = [];

  user = null;

  isLoading = false;

  constructor() {
    this.authService = new UsersService();
    makeAutoObservable(this);
  }

  async fetchUsers() {
    this.isLoading = true;
    try {
      const { data } = await this.authService.fetchUsers();
      this.users = data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async fetchPermissonsAndCities() {
    this.isLoading = true;
    try {
      const { data } = await this.authService.fetchPermissonsAndCities();
      this.permissions = data.permissions;
      this.cities = data.cities;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async getUserById(id) {
    this.isLoading = true;
    try {
      const { data } = await this.authService.getUserById(id);
      this.user = data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async createUser({ name, email, password, is_admin, permissions, city_id }) {
    try {
      const { data } = await this.authService.createUser({
        data: { name, email, password, permissions, is_admin, city_id },
      });
      toast.success(data.message);
      history.push('/users');
    } catch (error) {
      toast.error('Что то пошло не так.');
    }
  }

  async saveUser({ name, email, password, permissions, is_admin, city_id }, userId) {
    try {
      const { data } = await this.authService.saveUser(
        {
          data: { name, email, password, permissions, is_admin, city_id },
        },
        userId,
      );
      toast.success(data.message);
      history.push('/users');
    } catch (error) {
      toast.error('Что то пошло не так.');
    }
  }

  async removeUser(id) {
    this.isLoading = true;
    try {
      const { data } = await this.authService.removeUser(id);
      if (data.success) {
        toast.success(data.message);
        this.users = this.users.filter((item) => item.id !== id);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }
}
