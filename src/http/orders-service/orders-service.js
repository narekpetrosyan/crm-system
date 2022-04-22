import { $authHost } from '../index';

export default class OrdersService {
  async fetchOrders() {
    return await $authHost.get('/orders');
  }

  async createOrder(data) {
    return await $authHost.post('/orders', data);
  }

  async getOrderById(id) {
    return await $authHost.get(`/orders/${id}`);
  }

  async saveOrder(id, data) {
    return await $authHost.put(`/orders/${id}`, data);
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

  static async getCaObjects(id) {
    return await $authHost.get(`/contragent-object/${id}`);
  }

  static async getCaOContactList(id) {
    return await $authHost.get(`/contragent-object-contact-list/${id}`);
  }
}
