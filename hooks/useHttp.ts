import { useState, useEffect } from "react";

export const useHttp = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoint)
      const result: T = await response.json()
      setData(result);
    } catch (err) {
      setError('Failed to fetch data')
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData()
  }, [endpoint])

  return {
    data,
    isLoading,
    error
  };

}