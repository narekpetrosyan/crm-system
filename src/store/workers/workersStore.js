import { makeAutoObservable } from 'mobx';
import WorkersService from '../../http/workers-service/workers-service';
import { toast } from 'react-toastify';

export default class WorkersStore {
  workers = [];

  statuses = [];

  worker = null;

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    this.workersService = new WorkersService();
  }

  async fetchWorkers() {
    this.isLoading = true;
    try {
      const { data } = await this.workersService.fetchWorkers();
      this.workers = data.data;
      this.statuses = data.statuses;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async setOnRemove(id, softRestore = false) {
    this.isLoading = true;
    try {
      const { data } = await this.workersService.setOnRemove(id, softRestore);
      toast.success(data.message);
      await this.fetchWorkers();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async searchFilter(dto = {}) {
    this.isLoading = true;
    try {
      const { data } = await this.workersService.searchFilter(dto);
      this.workers = data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }
}
