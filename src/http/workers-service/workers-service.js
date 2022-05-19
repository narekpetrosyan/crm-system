import { $authHost } from '../index';

export default class WorkersService {
  async fetchWorkers() {
    return await $authHost.get('/workers');
  }

  async createWorker(data) {
    return await $authHost.post('/workers', data);
  }

  async getWorkerById(id) {
    return await $authHost.get(`/workers/${id}`);
  }

  async saveWorker(id, data) {
    return await $authHost.put(`/workers/${id}`, data);
  }

  async setOnRemove(id, softRestore) {
    return await $authHost.delete(
      `/workers/softDelete/${id}`,
      softRestore && {
        params: {
          softRestore,
        },
      },
    );
  }

  async removeWorker(id) {
    return await $authHost.delete(`/workers/${id}`);
  }

  async searchFilter(data) {
    return await $authHost.get(`/workers`, {
      params: {
        search_query: data.name,
        status: data.status,
      },
    });
  }

  async searchForOrderFilter(data) {
    return await $authHost.get(`/workers/search`, {
      params: {
        order_id: data.order_id,
        gender: data.gender,
        step: data.step,
        area: data.area,
      },
    });
  }

  async fetchAreas() {
    return await $authHost.get('/workers/getAreas');
  }
}
