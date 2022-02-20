import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import ContrAgentsService from '../../http/contragents-service/contragents-service';

export default class ContrAgentsStore {
  contrAgents = [];

  contacts = [];

  statuses = [];

  isLoading = false;

  isContactsLoading = false;

  constructor() {
    this.contrAgentsService = new ContrAgentsService();
    makeAutoObservable(this);
  }

  async fetchContrAgents() {
    this.isLoading = true;
    try {
      const { data } = await this.contrAgentsService.fetchContrAgents();
      this.contrAgents = data.data;
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

  async searchFilter(dto = {}) {
    this.isLoading = true;
    try {
      const { data } = await this.contrAgentsService.searchFilter(dto);
      this.contrAgents = data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async getContrAgentContacts(id) {
    this.isContactsLoading = true;
    try {
      const { data } = await this.contrAgentsService.getContrAgentContacts(id);
      this.contacts = data.contacts;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isContactsLoading = false;
    }
  }

  getContactEmailAndPhone(id) {
    return this.contacts.filter((item) => item.id === id)[0];
  }
}
