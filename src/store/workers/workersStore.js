import { makeAutoObservable } from 'mobx';
import WorkersService from '../../http/workers-service/workers-service';
import { toast } from 'react-toastify';
import { history } from '../../utils/history/history';

export default class WorkersStore {
  workers = [];

  worker = null;

  areas = [];

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
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async createWorker(dto) {
    this.isLoading = true;
    try {
      const { data } = await this.workersService.createWorker({
        data: dto,
      });
      if (data.success) {
        toast.success(data.message);
      }
      history.push('/workers');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async getWorkerById(id) {
    this.isLoading = true;
    try {
      await this.fetchAreas();
      const { data } = await this.workersService.getWorkerById(id);
      this.worker = data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async saveWorker(id, dto) {
    this.isLoading = true;
    try {
      const { data } = await this.workersService.saveWorker(id, { data: dto });
      if (data.success) {
        toast.success(data.message);
        history.push('/workers');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async removeWorker(id) {
    this.isLoading = true;
    try {
      const { data } = await this.workersService.removeWorker(id);
      if (data.success) {
        toast.success(data.message);
        this.workers = this.workers.filter((item) => item.id !== id);
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

  async fetchAreas() {
    this.isLoading = true;
    try {
      const { data } = await this.workersService.fetchAreas();
      this.areas = data.data.map(({ area }) => ({
        value: area,
        label: area,
      }));
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }
}
