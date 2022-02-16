import { $authHost } from '../index';

export default class WorkersService {
  async fetchWorkers() {
    return await $authHost.get('/workers');
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

  async searchFilter(data) {
    return await $authHost.get(`/workers`, {
      params: {
        search_query: data.name,
        status: data.status,
      },
    });
  }
}
