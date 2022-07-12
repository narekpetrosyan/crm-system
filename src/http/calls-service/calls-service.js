import { $authHost } from '../index';

export default class CallsService {
  async fetchCalls() {
    return await $authHost.get('/calls');
  }

  async fetchPlannedCalls() {
    return await $authHost.get('/calls-planned');
  }

  async createCall(data) {
    return await $authHost.post('/calls', data);
  }

  async getCallById(id) {
    return await $authHost.get(`/calls/${id}`);
  }

  async saveCall(data, id) {
    return await $authHost.put(`/calls/${id}`, data);
  }

  async removeCall(id) {
    return await $authHost.delete(`/calls/${id}`);
  }

  async fetchIncomingCalls(id) {
    return await $authHost.get(`/incoming-calls/${id}`);
  }
}
