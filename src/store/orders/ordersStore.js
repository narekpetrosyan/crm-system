import { makeAutoObservable } from 'mobx';
import OrdersService from '../../http/orders-service/orders-service';
import { toast } from 'react-toastify';

export default class OrdersStore {
  orders = [];

  order = null;

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    this.ordersService = new OrdersService();
  }

  async fetchOrders() {
    this.isLoading = true;
    try {
      const { data } = await this.ordersService.fetchOrders();
      this.orders = data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async setOnRemove(id, softRestore = false) {
    this.isLoading = true;
    try {
      const { data } = await this.ordersService.setOnRemove(id, softRestore);
      toast.success(data.message);
      await this.fetchOrders();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async removeOrder(id) {
    this.isLoading = true;
    try {
      const { data } = await this.ordersService.removeOrder(id);
      if (data.success) {
        toast.success(data.message);
        this.orders = this.orders.filter((item) => item.id !== id);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }
}
