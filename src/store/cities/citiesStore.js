import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import CitiesService from '../../http/cities-service/cities-service';
import { history } from '@utils/history/history';

export default class CitiesStore {
  cities = [];

  city = null;

  isLoading = false;

  constructor() {
    this.citiesService = new CitiesService();
    makeAutoObservable(this);
  }

  async fetchCities() {
    this.isLoading = true;
    try {
      const { data } = await this.citiesService.fetchCities();
      this.cities = data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async createCity(dto) {
    try {
      const { data } = await this.citiesService.createCity({
        data: dto,
      });
      toast.success(data.message);
      history.push('/cities');
    } catch (error) {
      toast.error('Что то пошло не так.');
    }
  }

  async getCityById(id) {
    this.isLoading = true;
    try {
      const { data } = await this.citiesService.getCityById(id);
      this.city = data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async saveCity(dto, cityId) {
    this.isLoading = true;
    try {
      const { data } = await this.citiesService.saveCity(dto, cityId);
      toast.success(data.message);
      history.push('/cities');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }

  async removeCity(id) {
    this.isLoading = true;
    try {
      const { data } = await this.citiesService.removeCity(id);
      if (data.success) {
        toast.success(data.message);
        this.cities = this.cities.filter((item) => item.id !== id);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      this.isLoading = false;
    }
  }
}
