import { makeAutoObservable } from 'mobx';
import CallsService from '../../http/calls-service/calls-service';
import { toast } from 'react-toastify';
import { history } from '../../utils/history/history';

export default class CallsStore {
  isLoading = false;

  todayCallsCount = 0;

  incomingCallsCount = 0;

  calls = [];

  call = null;

  plannedCalls = [];

  constructor() {
    makeAutoObservable(this);
    this.callsService = new CallsService();
  }

  async fetchCalls() {
    this.isLoading = true;
    try {
      const { data } = await this.callsService.fetchCalls();
      this.todayCallsCount = data.call_today;
      this.calls = data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async createCall(dto) {
    this.isLoading = true;
    try {
      const { data } = await this.callsService.createCall({
        data: dto,
      });
      toast.success(data.message);
      this.fetchCalls();
      history.push('/calls');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async saveCall(dto, id) {
    this.isLoading = true;
    try {
      const { data } = await this.callsService.saveCall(dto, id);
      toast.success(data.message);
      this.fetchCalls();
      history.push('/calls');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async getCallById(id) {
    this.isLoading = true;
    try {
      const { data } = await this.callsService.getCallById(id);
      this.call = data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async removeCall(id) {
    this.isLoading = true;
    try {
      const { data } = await this.callsService.removeCall(id);
      if (data.success) {
        toast.success(data.message);
        this.calls = this.calls.filter((item) => item.id !== id);
      }
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

  async fetchIncomingCalls(id) {
    try {
      const { data } = await this.callsService.fetchIncomingCalls(id);
      this.incomingCallsCount = data.count;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}
