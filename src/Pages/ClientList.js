import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { SearchIcon } from '../Icons/SearchIcon';
import { EditButton } from '../Components/EditButton';
import useFetchPlans from "../hooks/useFetchPlans";

function ClientList() {

  const [clientList, setClientList] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalClients, setTotalClients] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 5; 
  const {plansList} = useFetchPlans();

  useEffect( () => {
  const getClientList = async () => {
    const offset = (currentPage - 1) * clientsPerPage;
    const res = await fetch(`http://localhost:3001/clients?limit=${clientsPerPage}&offset=${offset}`, {
      method: 'GET',
      headers:{
          "Content-Type": "application/json"
      },
  });  

  if (!res.ok) {
    throw new Error(`Error: ${res.statusText}`);
  }

  const data = await res.json();
  setClientList(data.items);
  setFilteredClients(data.items);
  setTotalClients(data.totalItems)
  };
    getClientList();
  }, [currentPage]);

  useEffect(() => {
    updateFilteredClients();
  }, [searchTerm, currentPage]);

  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const updateFilteredClients = () => {
    const filtered = clientList.filter((client) =>
      client.fullname.toLowerCase().includes(searchTerm) ||
      client.phone.toLowerCase().includes(searchTerm) ||
      client.address.toLowerCase().includes(searchTerm)
    );

    setFilteredClients(filtered.slice((currentPage - 1) * clientsPerPage, currentPage * clientsPerPage));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const planName = (clientId) => {
    const plan = plansList.find((plan) => plan.id === clientId);
    return plan ? plan.name : ''; 
   }

  const totalPages = Math.ceil(totalClients / clientsPerPage);
  return (
    <div className="flex flex-col justify-items-center items-center w-full">
      <h3 className="text-sky-500 text-xl">Total de Clientes Activos: {totalClients}</h3>
      <section className="flex rounded-lg shadow-xl mt-2 flex-wrap w-11/12 justify-center">
        <div className="w-full flex mx-auto justify-between p-2">
          <Link to="/Admin/AddClient" className="hover:text-sky-500 ">Agregar Cliente</Link>
          
          <div className="flex bg-white w-1/2 h-6 border-2 border-gray-100 rounded-full items-center px-2 shadow-sm hover:border-sky-500">
                    <SearchIcon></SearchIcon>
                    <input placeholder="Buscar"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="rounded-full focus:outline-none w-full h-full px-1 "/>
                </div>
          <button className="hover:text-sky-500">Filtrar</button>
        </div>

        <section className="w-full">
          <table className="table-fixed w-full">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="w-2/6 px-2 py-2">Nombres</th>
                <th className="w-1/6 px-2 py-2">IP</th>
                <th className="w-1/6 px-2 py-2">Teléfonos</th>
                <th className="w-1/6 px-2 py-2">Dirección</th>
                <th className="w-1/6 px-2 py-2">Plan</th>
                <th className="w-1/6 px-2 py-2">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map(client => (
                <tr key={client.id} className="bg-gray-100 text-center">
                  <td className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    <Link to={`/Admin/Client?id=${client.id}`}>
                      {client.fullname}
                    </Link>
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis rounded-md shadow">192.168.22.X</td>
                  <td className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis rounded-md shadow">{client.phone}</td>
                  <td className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis rounded-md shadow">{client.address}</td>
                  <td className="px-2 py-2 whitespace-nowrap overflow-hidden text-ellipsis rounded-md shadow">{planName(client.planId)}</td>
                  <td className="px-2 py-2 text-center">
                    <Link to={`/Admin/Client?id=${client.id}`}>
                      <EditButton />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="flex justify-center my-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-3 py-1 mx-1">{currentPage} / {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 mx-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </section>
    </div>
  );
}

export default ClientList;
