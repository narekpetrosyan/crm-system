import { $authHost } from '..';

export default class CitiesService {
  async fetchCities() {
    return await $authHost.get('/cities');
  }

  async createCity(dto) {
    return await $authHost.post(`/cities`, dto);
  }

  async getCityById(id) {
    return await $authHost.get(`/cities/${id}`);
  }

  async saveCity(dto, id) {
    return await $authHost.put(`/cities/${id}`, { dto });
  }

  async removeCity(id) {
    return await $authHost.delete(`/cities/${id}`);
  }
}
