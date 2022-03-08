import { useEffect, useState } from 'react';
import { $authHost } from '@http';

export const useAnalyticsOptions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [contrAgents, setContrAgents] = useState([]);

  useEffect(() => {
    const fetchContrAgents = async () => {
      try {
        setIsLoading(true);
        const { data } = await $authHost.get('/analitics');
        setContrAgents(data.data.contragents);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContrAgents();
  }, []);

  return { contrAgents, isLoading };
};
