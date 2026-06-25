import { useState, useCallback } from 'react';
import api from '../lib/api.js';

interface UseApiState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    error: null,
    loading: false
  });

  const execute = useCallback(
    async (request: Promise<any>) => {
      setState({ data: null, error: null, loading: true });
      try {
        const response = await request;
        setState({ data: response.data, error: null, loading: false });
        return response.data;
      } catch (error: any) {
        const message = error.response?.data?.error || error.message;
        setState({ data: null, error: message, loading: false });
        throw error;
      }
    },
    []
  );

  return { ...state, execute };
}