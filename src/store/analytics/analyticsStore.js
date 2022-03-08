import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import AnalyticsService from '../../http/analytics-service/analytics-service';

export default class AnalyticsStore {
  analytics = [];

  amount = 0;

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    this.analyticsService = new AnalyticsService();
  }

  async searchAnalytics(dto) {
    try {
      this.isLoading = true;
      const { data } = await this.analyticsService.searchAnalytics(dto);
      this.amount = data.total;
      this.analytics = data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }
}
