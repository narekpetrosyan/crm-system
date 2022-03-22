import { $authHost, $host } from '..';

export default class AuthService {
  static getMe() {
    return $authHost.get('/me');
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
