import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { EditButton } from './EditButton';

function SurchargesList() {

  const [surchargesList, setSurchargesList] = useState([]);

  useEffect( () => {
  const getSurchargesList = async () => {

  const res = await fetch (`http://localhost:3001/surcharges?limit=10&offset=0`, {
      method: 'GET',
      headers:{
          "Content-Type": "application/json"
      },
  });  

  if (!res.ok) {
    throw new Error(`Error: ${res.statusText}`);
  }

  const data = await res.json();
  setSurchargesList(data);
  };
    getSurchargesList();
  }, []);
    return <>
        <section>
        <ul className="grid grid-flow-col-dense">
        <div>
          <h2 className="bg-gray-200 text-lg font-semibold text-center">Nombre</h2>
          {surchargesList.map(surcharge => (
            <li key={surcharge.id} className=" text-center bg-gray-100 p-2 rounded-md shadow ">
              <Link to={`/Admin/Client?id=${surcharge.id}`}>
              {surcharge.name}
              </Link>
            </li>
          ))}
        </div>
        <div>
          <h2 className="bg-gray-200 text-lg font-semibold text-center">Precio</h2>
          {surchargesList.map(surcharge => (
            <li key={surcharge.id} className=" text-center bg-gray-100 p-2 rounded-md shadow ">
              {surcharge.price}
            </li>
          ))}
        </div>
        <div>
          <h2 className="bg-gray-200 text-lg font-semibold text-center">Clientes Activos</h2>
          {surchargesList.map(surcharge => (
            <li key={surcharge.id} className=" text-center bg-gray-100 p-2 rounded-md shadow ">
               110
            </li>
          ))}
        </div>
        <div>
          <h2 className="bg-gray-200 text-lg font-semibold text-center">Opciones</h2>
          {surchargesList.map(surcharge => (
              <div className=" text-center bg-gray-100 p-2 rounded-md shadow "> 
                <Link to={`/Admin/Client?id=${surcharge.id}`}>
                  <EditButton></EditButton>
                </Link>
              </div>
          ))}
        </div>
      </ul>
        </section>
    
    </>
}
export default SurchargesList;