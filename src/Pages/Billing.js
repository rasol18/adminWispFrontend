import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from "react-router-dom";

import AddBill from './AddBill';
import { SearchIcon } from '../Icons/SearchIcon';

function Billing () {
    //cambia el formato de los input de texto a date//
    const [inputType, setInputType] = useState('text');
    const [billsList, setBillsList] = useState([]);
    const [filteredBills, setFilteredBills] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect( () => {
        const getBillsList = async () => {
      
        const res = await fetch (`http://localhost:3001/billing?limit=10&offset=0`, {
            method: 'GET',
            headers:{
                "Content-Type": "application/json"
            },
        });  
      
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
      
        const data = await res.json();
        setBillsList(data);
        setFilteredBills(data);
        };
          getBillsList();
        }, []);
      
        const handleSearchChange = (event) => {
          const term = event.target.value.toLowerCase();
          setSearchTerm(term);
        
          const filtered = billsList.filter((bill) =>
            bill.fullname.toLowerCase().includes(term) ||
            bill.phone.toLowerCase().includes(term) ||
             bill.address.toLowerCase().includes(term)
          );
        
          setFilteredBills(filtered);
        };

    return <div className="flex flex-col justify-items-center items-center py-2 w-full ">
        <h3 className="text-sky-500 text-xl">Facturas</h3>
        <section className="flex  rounded-lg shadow-xl mt-2 flex-wrap w-11/12 justify-around">
            <div className=" w-full flex mx-auto justify-between p-4">
                <Link to="/Admin/Billing/AddBill" className="hover:text-sky-500" href="/Admin/AddClient">Crear factura</Link>
                <div className="flex bg-white w-1/4 h-6 border-2 border-gray-100 rounded-full items-center px-2 shadow-sm hover:border-sky-500">
                    <SearchIcon></SearchIcon>
                    <input placeholder="Buscar"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="rounded-full focus:outline-none w-full h-full px-1 "/>
                </div>
                <div className="flex text-gray-400 bg-white w-1/5  h-6 border-2 border-gray-100 rounded-full items-center px-2 shadow-sm hover:border-sky-500">
                <input className="rounded-full focus:outline-none w-full h-full px-1 "
                        placeholder="Desde"
                        type={inputType}
                        onFocus={() => setInputType('date')}
                         onBlur={(e) => {
                                if (!e.target.value) setInputType('text');
                            }}/>
                </div>
                <div className="flex text-gray-400  bg-white w-1/5 h-6 border-2 border-gray-100 rounded-full items-center px-2 shadow-sm hover:border-sky-500">  
                    <input className="rounded-full focus:outline-none w-full h-full px-1 "
                        placeholder="Hasta"
                        type={inputType}
                        onFocus={() => setInputType('date')}
                         onBlur={(e) => {
                                if (!e.target.value) setInputType('text');
                            }}/>
                </div>
                <button className="hover:text-sky-500" type="submit">Filtrar</button>
                </div>
                
        
        <section className="w-full">
          <table className="table-fixed w-full">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="w-2/6 px-2 py-2">Cliente</th>
                <th className="w-1/6 px-2 py-2">Factura</th>
                <th className="w-1/6 px-2 py-2">Total</th>
                <th className="w-1/6 px-2 py-2">Deuda</th>
                <th className="w-1/6 px-2 py-2">Creación</th>
                <th className="w-1/6 px-2 py-2">Vencimiento</th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.map(bill => (
                <tr key={bill.id} className="bg-gray-100 text-center ">
                  <td className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis">
  <Link to={`/Admin/Client?id=${bill.id}`}>
    {bill.fullname}
  </Link>
</td>
                  <td className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{bill.clientId}</td>
                  <td className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{bill.id}</td>
                  <td className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis">{bill.address}</td>
                  <td className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis">Abono Hogar</td>
                  <td className="px-2 py-2 text-center">
                    <Link to={`/Admin/EditClient?id=${bill.id}`}>
                      <button className="text-xs px-2 py-1 border rounded hover:bg-blue-500 hover:text-white">
                        Editar
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        </section>
        <div>
                <Routes>
                    <Route path="AddBill" element={<AddBill />} />
                </Routes>
            </div>
    </div>
}
export default Billing;