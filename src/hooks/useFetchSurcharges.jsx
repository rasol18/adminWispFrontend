import { useState, useEffect } from 'react';

const useFetchSurcharges = () => {
  const [surchargeList, setSurchargeList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSurchargeList = async () => {
      try {
        const res = await fetch('http://localhost:3001/surcharges?limit=10&offset=0', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }

        const data = await res.json();
        setSurchargeList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getSurchargeList();
  }, []);

  return { surchargeList, error, loading };
};

export default useFetchSurcharges;