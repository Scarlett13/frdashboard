import useSWR, { mutate } from 'swr';

export function useTable(url: string) {
  const fetcher = () =>
    fetch('/api/middleware', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: url,
        method: 'get',
      }),
    }).then((res) => res.json());

  const { data, error, isLoading, isValidating } = useSWR(
    '/api/middleware',
    fetcher
  );

  return {
    data,
    isLoading,
    error,
    isValidating,
    mutate,
  };
}
