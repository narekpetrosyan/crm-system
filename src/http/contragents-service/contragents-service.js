import { $authHost } from '..';

export default class ContrAgentsService {
  async fetchContrAgents() {
    return await $authHost.get('/contr-agents');
  }

  async createContrAgent(data) {
    return await $authHost.post('/contr-agents', data);
  }

  async getContrAgentById(id) {
    return await $authHost.get(`/contr-agents/${id}`);
  }

  async saveContrAgent(id, data) {
    return await $authHost.put(`/contr-agents/${id}`, data);
  }

  async setOnRemove(id, softRestore) {
    return await $authHost.delete(
      `/contr-agents/softDelete/${id}`,
      softRestore && {
        params: {
          softRestore,
        },
      },
    );
  }

  async removeContrAgent(id) {
    return await $authHost.delete(`/contr-agents/${id}`);
  }

  async searchFilter(data) {
    return await $authHost.get(`/contr-agents`, {
      params: {
        search_query: data.name,
        status: data.status,
      },
    });
  }

  async getContrAgentContacts(id) {
    return await $authHost.get(`/contragent-calls?contragent_id=${id}`);
  }
}
