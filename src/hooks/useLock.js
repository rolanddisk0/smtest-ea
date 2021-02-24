import { useState, useCallback } from 'react';
import { useHttpClient } from './http-hook';

export const useLock = () => {
  const { sendRequest } = useHttpClient();
  const [isLoadingLock, setIsLoadingLock] = useState(true);

  const getLock = useCallback(async (tablename, id) => {
    setIsLoadingLock(true);

    try {
      const lockResult = await sendRequest(`/api/lock/${tablename}/${id}`);

      if (lockResult && lockResult.exist) {
        setIsLoadingLock(false);
        return lockResult.data;
      } else {
        setIsLoadingLock(false);
        return false;
      }
    } catch (err) {
      setIsLoadingLock(false);
      return false;
    }
  },
  [])

  return { getLock, isLoadingLock };
};