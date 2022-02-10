import { $authHost } from '..';

export default class UsersService {
  async fetchUsers() {
    return await $authHost.get('/users');
  }

  async getUserById(id) {
    return await $authHost.get(`/users/${id}`);
  }

  async removeUser(id) {
    return await $authHost.delete(`/users/${id}`);
  }
}
