import { useCallback, useState } from 'react';
import { $authHost } from '@http';
import { transformForSelect } from '@utils/helpers/transformForSelect';

export const useSelectOptions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredContrAgents, setFilteredContrAgents] = useState([]);

  const filterUsers = useCallback(async (inputValue) => {
    const { data } = await $authHost.get('/search-user', {
      params: {
        query: inputValue,
      },
    });
    return transformForSelect(data.results, 'id', 'name');
  }, []);

  const filterContrAgents = useCallback(async (inputNameValue) => {
    const { data } = await $authHost.get('/search-contragent', {
      params: {
        query: inputNameValue,
      },
    });
    setFilteredContrAgents(data.results);
    return transformForSelect(data.results, 'id', 'name');
  }, []);

  const searchByText = useCallback((inputValue) => {
    return new Promise((resolve) => {
      if (inputValue.trim() === '') return;
      resolve(filterUsers(inputValue));
    })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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

  return { searchContrAgentByName, filteredContrAgents, searchByText, isLoading };
};
