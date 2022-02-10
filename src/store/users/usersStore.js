import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import UsersService from '../../http/users-service/users-service';

export default class UsersStore {
  users = [];

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
