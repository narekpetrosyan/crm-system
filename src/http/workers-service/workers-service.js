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
}
