import { useCallback, useEffect, useState } from 'react';
import { $authHost } from '@http';
import { transformForSelect } from '@utils/helpers/transformForSelect';

export const useSelectOptions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredContrAgents, setFilteredContrAgents] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const filterContrAgents = useCallback(async (inputNameValue) => {
    const { data } = await $authHost.get('/search-contragent', {
      params: {
        query: inputNameValue,
      },
    });
    setFilteredContrAgents(data.results);
    return transformForSelect(data.results, 'id', 'name');
  }, []);

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

  const searchContrAgentByName = useCallback((inputNameValue) => {
    return new Promise((resolve) => {
      if (inputNameValue.trim() === '') return;
      resolve(filterContrAgents(inputNameValue));
    })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { searchContrAgentByName, filteredContrAgents, isLoading, filteredUsers };
};
