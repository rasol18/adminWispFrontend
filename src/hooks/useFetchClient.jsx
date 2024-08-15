import { useState, useEffect } from 'react';

const useFetchClient = () => {
  const [clientList, setClientList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClientList = async () => {
      try {
        const res = await fetch('http://localhost:3001/clients', {         
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }

        const data = await res.json();
        setClientList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getClientList();
  }, []);

  return { clientList, error, loading };
};

export default useFetchClient;