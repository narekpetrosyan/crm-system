import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import ContrAgentsService from '../../http/contragents-service/contragents-service';
import { history } from '../../utils/history/history';

export default class ContrAgentsStore {
  contrAgents = [];

  filteredContrAgents = [];

  contrAgentAfterFilter = null;

  contrAgent = null;

  statuses = [];

  isLoading = false;

  contacts = [];

  contactResults = [];

  isContactsLoading = false;

  isContactResultsLoaded = false;

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

  async createContrAgent(dto) {
    this.isLoading = true;
    try {
      const { data } = await this.contrAgentsService.createContrAgent({ data: dto });
      if (data.success) {
        toast.success(data.message);
        await this.fetchContrAgents();
        history.push('/contr-agents');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async getContrAgentById(id) {
    this.isLoading = true;
    try {
      const { data } = await this.contrAgentsService.getContrAgentById(id);
      this.contrAgent = data.data;
      if (!this.contrAgents.length) {
        await this.fetchContrAgents();
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async saveContrAgent(id, dto) {
    this.isLoading = true;
    try {
      const { data } = await this.contrAgentsService.saveContrAgent(id, { data: dto });
      if (data.success) {
        await this.fetchContrAgents();
        toast.success(data.message);
        history.push('/contr-agents');
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
      this.contactResults = data.results;
      this.isContactResultsLoaded = true;
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
