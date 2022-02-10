import { $authHost, $host } from '..';

export default class AuthService {
  async login(email, password) {
    return await $host.post('/login', {
      email,
      password,
    });
  }

  async register(name, email, password, password_confirmation) {
    return await $host.post('/register', {
      name,
      email,
      password,
      password_confirmation,
    });
  }

  async logout() {
    return await $authHost.post('/logout');
  }
}
