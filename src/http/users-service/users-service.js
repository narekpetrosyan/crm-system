import { $authHost } from '..';

export default class UsersService {
  async fetchUsers() {
    return await $authHost.get('/users');
  }

  async fetchPermissionsAndCities() {
    return await $authHost.get('/permission-list');
  }

  async getUserById(id) {
    return await $authHost.get(`/users/${id}`);
  }

  async createUser(data) {
    return await $authHost.post(`/users/`, data);
  }

  async saveUser(data, userId) {
    return await $authHost.put(`/users/${userId}`, data);
  }

  async removeUser(id) {
    return await $authHost.delete(`/users/${id}`);
  }
}
