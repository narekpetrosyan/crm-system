import { makeAutoObservable } from 'mobx';
import OrdersService from '../../http/orders-service/orders-service';
import { toast } from 'react-toastify';
import { history } from '../../utils/history/history';

export default class OrdersStore {
  orders = [];

  order = null;

  isLoading = false;

  orderWorkers = [];

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

  async createOrder(dto) {
    this.isLoading = true;
    try {
      const { data } = await this.ordersService.createOrder({ data: dto });
      if (data.success) {
        toast.success(data.message);
        await this.fetchOrders();
        history.push(`/orders/edit/${data.data.id}`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async getOrderById(id) {
    this.isLoading = true;
    try {
      const { data } = await this.ordersService.getOrderById(id);
      this.order = data.data;
      if (!this.orders.length) {
        await this.fetchOrders();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async saveOrder(id, dto) {
    this.isLoading = true;
    try {
      const { data } = await this.ordersService.saveOrder(id, { data: dto });
      if (data.success) {
        toast.success(data.message);
        history.push('/orders');
      }
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

  async getAttachedWorkers(id) {
    try {
      const { data } = await this.ordersService.getAttachedWorkers(id);
      this.orderWorkers = data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  filterOrderWorkers(id) {
    this.orderWorkers = this.orderWorkers.filter((el) => +el.worker_id !== +id);
  }

  async updateOrderWorkers(dto) {
    try {
      const { data } = await this.ordersService.updateOrderWorkers(dto);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }
}
