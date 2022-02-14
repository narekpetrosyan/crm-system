import { makeAutoObservable } from 'mobx';
import CallsService from '../../http/calls-service/calls-service';
import { toast } from 'react-toastify';

export default class CallsStore {
  isLoading = false;

  calls = [];

  plannedCalls = [];

  constructor() {
    makeAutoObservable(this);
    this.callsService = new CallsService();
  }

  async fetchCalls() {
    this.isLoading = true;
    try {
      const { data } = await this.callsService.fetchCalls();
      this.calls = data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async fetchPlannedCalls() {
    this.isLoading = true;
    try {
      const { data } = await this.callsService.fetchPlannedCalls();
      this.plannedCalls = data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }
}
