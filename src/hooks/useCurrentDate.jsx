import { useState, useEffect } from 'react';

const useCurrentDate = () => {

  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Meses empiezan desde 0
    const day = String(today.getDate()).padStart(2, '0');
    setCurrentDate(`${year}-${month}-${day}`);
  }, []); // El array vacío [] asegura que el efecto se ejecute solo una vez al montar el componente

  return currentDate;
};

export default useCurrentDate;