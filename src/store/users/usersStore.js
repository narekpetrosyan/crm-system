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
    this.usersService = new UsersService();
    makeAutoObservable(this);
  }

  async fetchUsers() {
    this.isLoading = true;
    try {
      const { data } = await this.usersService.fetchUsers();
      this.users = data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async fetchPermissionsAndCities() {
    this.isLoading = true;
    try {
      const { data } = await this.usersService.fetchPermissionsAndCities();
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
      const { data } = await this.usersService.getUserById(id);
      this.user = { ...data.data, permissions: data.permissions };
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async createUser({ name, email, password, is_admin, permissions, city_id }) {
    try {
      this.isLoading = true;
      const { data } = await this.usersService.createUser({
        data: { name, email, password, permissions, is_admin, city_id },
      });
      toast.success(data.message);
      history.push('/users');
    } catch (error) {
      toast.error('Что то пошло не так.');
    } finally {
      this.isLoading = false;
    }
  }

  async saveUser({ name, email, password, permissions, is_admin, city_id }, userId) {
    try {
      this.isLoading = true;
      const { data } = await this.usersService.saveUser(
        {
          data: { name, email, password, permissions, is_admin, city_id },
        },
        userId,
      );
      toast.success(data.message);
      history.push('/users');
    } catch (error) {
      toast.error('Что то пошло не так.');
    } finally {
      this.isLoading = false;
    }
  }

  async removeUser(id) {
    this.isLoading = true;
    try {
      const { data } = await this.usersService.removeUser(id);
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
