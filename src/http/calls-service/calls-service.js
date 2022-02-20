import { $authHost } from '../index';

export default class CallsService {
  async fetchCalls() {
    return await $authHost.get('/calls');
  }

  async fetchPlannedCalls() {
    return await $authHost.get('/calls-planned');
  }

  async removeCall(id) {
    return await $authHost.delete(`/calls/${id}`);
  }
}
