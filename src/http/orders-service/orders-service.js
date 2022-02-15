import { $authHost } from '../index';

export default class OrdersService {
  async fetchOrders() {
    return await $authHost.get('/orders');
  }

  async setOnRemove(id, softRestore) {
    return await $authHost.delete(
      `/orders/softDelete/${id}`,
      softRestore && {
        params: {
          softRestore,
        },
      },
    );
  }

  async removeOrder(id) {
    return await $authHost.delete(`/orders/${id}`);
  }
}
