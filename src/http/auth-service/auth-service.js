import { $authHost, $host } from '..';
import axios from 'axios';

export default class AuthService {
  static getMe() {
    const token = localStorage.getItem('token') || undefined;
    return axios.get('/api/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static login(email, password) {
    return $host.post('/login', {
      email,
      password,
    });
  }

  static register(name, email, password, password_confirmation) {
    return $host.post('/register', {
      name,
      email,
      password,
      password_confirmation,
    });
  }

  static async logout() {
    return await $authHost.post('/logout');
  }
}
