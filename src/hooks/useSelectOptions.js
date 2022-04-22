import { useEffect, useState } from 'react';
import { $authHost } from '@http';
import { transformForSelect } from '@utils/helpers/transformForSelect';

export const useSelectOptions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [contrAgents, setContrAgents] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const { data } = await $authHost.get('/search-user');
        setFilteredUsers(transformForSelect(data.results, 'id', 'name'));
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getContrAgents = async () => {
      try {
        setIsLoading(true);
        const { data } = await $authHost.get('/search-contragent');
        setContrAgents(data.results);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    getContrAgents();
  }, []);

  return { isLoading, filteredUsers, contrAgents };
};
