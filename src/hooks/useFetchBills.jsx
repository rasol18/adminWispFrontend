import { useState, useEffect } from 'react';

const useFetchBills = () => {
  const [billList, setBillList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBillList = async () => {
      try {
        const res = await fetch('http://localhost:3001/billing?limit=10&offset=0', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }

        const data = await res.json();
        setBillList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getBillList();
  }, []);

  return { billList, error, loading };
};

export default useFetchBills;