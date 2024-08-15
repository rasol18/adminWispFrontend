import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { EditButton } from './EditButton';

function ProductsList() {

  const [productsList, setProductsList] = useState([]);

  useEffect( () => {
  const getProductsList = async () => {

  const res = await fetch (`http://localhost:3001/products?limit=10&offset=0`, {
      method: 'GET',
      headers:{
          "Content-Type": "application/json"
      },
  });  

  if (!res.ok) {
    throw new Error(`Error: ${res.statusText}`);
  }

  const data = await res.json();
  console.log(data)
  setProductsList(data);
  };
    getProductsList();
  }, []);
    return <>
        <section>
        <ul className="grid grid-flow-col-dense">
        <div>
          <h2 className="bg-gray-200 text-lg font-semibold text-center">Nombre</h2>
          {productsList.map(product => (
            <li key={product.id} className=" text-center bg-gray-100 p-2 rounded-md shadow ">
              <Link to={`/Admin/Client?id=${product.id}`}>
              {product.name}
              </Link>
            </li>
          ))}
        </div>
        <div>
          <h2 className="bg-gray-200 text-lg font-semibold text-center">Precio</h2>
          {productsList.map(product => (
            <li key={product.id} className=" text-center bg-gray-100 p-2 rounded-md shadow ">
              {product.price}
            </li>
          ))}
        </div>
        <div>
          <h2 className="bg-gray-200 text-lg font-semibold text-center">Clientes Activos</h2>
          {productsList.map(product => (
            <li key={product.id} className=" text-center bg-gray-100 p-2 rounded-md shadow ">
               110
            </li>
          ))}
        </div>
        <div>
          <h2 className="bg-gray-200 text-lg font-semibold text-center">Opciones</h2>
          {productsList.map(product => (
              <div className=" text-center bg-gray-100 p-2 rounded-md shadow "> 
                <Link to={`/Admin/Client?id=${product.id}`}>
                  <EditButton></EditButton>
                </Link>
              </div>
          ))}
        </div>
      </ul>
        </section>
    
    </>
}
export default ProductsList;