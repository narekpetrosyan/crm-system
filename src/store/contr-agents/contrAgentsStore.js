import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
// import { history } from '@utils/history/history';
import ContrAgentsService from '../../http/contragents-service/contragents-service';

export default class ContrAgentsStore {
  contrAgents = [];

  isLoading = false;

  constructor() {
    this.contrAgentsService = new ContrAgentsService();
    makeAutoObservable(this);
  }

  async fetchContrAgents() {
    this.isLoading = true;
    try {
      const { data } = await this.contrAgentsService.fetchContrAgents();
      this.contrAgents = data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async setOnRemove(id, softRestore = false) {
    this.isLoading = true;
    try {
      const { data } = await this.contrAgentsService.setOnRemove(id, softRestore);
      toast.success(data.message);
      await this.fetchContrAgents();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async removeContrAgent(id) {
    this.isLoading = true;
    try {
      const { data } = await this.contrAgentsService.removeContrAgent(id);
      if (data.success) {
        toast.success(data.message);
        this.contrAgents = this.contrAgents.filter((item) => item.id !== id);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }
}
