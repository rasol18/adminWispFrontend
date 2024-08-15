import { useState, useEffect } from 'react';

const useFetchPlans = () => {
  const [plansList, setPlansList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlansList = async () => {
      try {
        const res = await fetch('http://localhost:3001/plans?limit=10&offset=0', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }

        const data = await res.json();
        setPlansList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPlansList();
  }, []);

  return { plansList, error, loading };
};

export default useFetchPlans;