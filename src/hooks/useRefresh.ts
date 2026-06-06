import { useState, useCallback } from 'react';

export const useRefresh = (refreshFn: () => Promise<void>) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshFn();
    } catch (error) {
      console.error('Error refreshing:', error);
    } finally {
      setRefreshing(false);
    }
  }, [refreshFn]);

  return { refreshing, onRefresh };
};
