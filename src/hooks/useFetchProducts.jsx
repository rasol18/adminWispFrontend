import { useState, useEffect } from 'react';

const useFetchProducts = () => {
  const [productsList, setProductsList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductsList = async () => {
      try {
        const res = await fetch('http://localhost:3001/products?limit=10&offset=0', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }

        const data = await res.json();
        setProductsList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProductsList();
  }, []);

  return { productsList, error, loading };
};

export default useFetchProducts;