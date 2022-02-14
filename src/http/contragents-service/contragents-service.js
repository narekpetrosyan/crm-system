import { $authHost } from '..';

export default class ContrAgentsService {
  async fetchContrAgents() {
    return await $authHost.get('/contr-agents');
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
}
