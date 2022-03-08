import { $authHost } from '..';

export default class AnalyticsService {
  async searchAnalytics(data) {
    return await $authHost.get('/orders/search', {
      params: {
        ...data,
      },
    });
  }
}
