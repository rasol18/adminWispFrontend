import { useNavigate } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import { addClient } from "../Redux/clientSlice";
import React, { useState, useEffect, useCallback } from 'react';
import { setErrorMessage, clearErrorMessage } from '../Redux/errorSlice';
import useFetchPlans from "../hooks/useFetchPlans";
import ClienteService from "../Components/ClientService"
import ClientData from "../Components/ClientData";
import ClientBills from "../Components/ClientBills";

function Client() {

  const {plansList} = useFetchPlans();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentView, setCurrentView] = useState('ClientData');

  const errorMessage = useSelector(state => state.error.errorMessage);

  const [formData, setFormData] = useState({
      fullname : '',
      dni: '',
      latitude : '',
      longitude: '',
      phone: '',
      address: '',
      active: '',
      email : '',
      instalationDate: '',
      planId:'',
      companyId: '1',
      products: [],
      billing: []
    });
    const [viewMode, setViewMode] = useState(true);
    const [loading, setLoading] = useState(true); 

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get('id');

    const clientData = useCallback( async () => {
      const res = await fetch (`http://localhost:3001/clients/${id}`, {
        method: 'GET',
        headers:{
            "Content-Type": "application/json"
        }
      })
      const data = await res.json();
      return data
    }, [id])

    useEffect(() => {
      const fetchData = async () => {
        const data = await clientData();
        setFormData({
          fullname: data.fullname || '',
          dni: data.dni || '',
          latitude: data.location?.coordinates[1] || '',
          longitude: data.location?.coordinates[0] || '',
          phone: data.phone || '',
          address: data.address || '',
          active: data.active || '',
          email: data.email || '',
          instalationDate: data.instalationDate || '',
          planId: data.planId || '',
          companyId: data.companyId || '1',
          products: data.products || [],
          billing: data.billing || []
        });
        setLoading(false);
      };
      fetchData();
    }, [clientData]);
  
    const handleViewChange = (view) => {
      setCurrentView(view);
    };

    const handleChange = event => {
      const { name, value } = event.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
      dispatch(clearErrorMessage());
    };
    
  //cuando se hace submit en el formulario redirecciona a la pagina cliente//
  const handleSubmit =async event => {
    event.preventDefault();
    
    //envia los datos del cliente a redux//
    dispatch(addClient({
      fullname :formData.fullname, 
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      dni: formData.dni,
      latitude : formData.latitude,
      longitude: formData.longitude,
      instalationDate: formData.instalationDate,
      service: formData.service,
      planId: formData.planId,
      products: formData.products,
      billing: formData.billing
  }));
  const res = await fetch (`http://localhost:3001/clients/${id}`, {
      method: 'PATCH',
      headers:{
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          fullname : formData.fullname,
          dni: formData.dni || '00000000',
          latitude : formData.latitude.toString() || '0',
          longitude: formData.longitude.toString() || '0',
          phone: formData.phone || '000000000',
          address: formData.address,
          active: formData.active.toString() || 'true',
          email : formData.email || 'ejemplo@gmail.com',
          planId: formData.planId || '1',
          products: formData.products || [],
          billing: formData.billing || [],
          companyId: formData.companyId,
          instalationDate: formData.instalationDate
      })
  });  
  if (res.ok === true) {
      navigate('/SuccessfullClientEdit');
  } else {
      dispatch(setErrorMessage('Hubo un error al procesar la solicitud'));
      setFormData({
          fullname :'', 
          address: '',
          phone: '',
          email: '',
          dni: '',
          latitude: '',
          longitude: '',
          date: '',
          service: '',
          planId: '',
    });
  }
  }

  const editMode = () => {
    setViewMode(!viewMode)
  }
  
    return (
      <>
      <div className="flex flex-col justify-items-center items-center py-2 w-full">
        <section className="flex flex-col rounded-lg shadow-xl mt-2 flex-wrap w-11/12 justify-center">
            <section className="w-full">
              <h1 className="text-sky-500 m-2 text-2xl">{formData.fullname}</h1>
            </section>
            <section className="w-full flex bg-gray-600 justify-between rounded-lg shadow-md">
  <button
    onClick={() => handleViewChange('ClientData')}
    className={`w-full px-2 py-2 rounded-t-lg transition-colors duration-300 ${
      currentView === 'ClientData' ? 'bg-sky-500 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
    }`}
  >
    <label>Datos del cliente</label>
  </button>
  <button
    onClick={() => handleViewChange('Services')}
    className={`w-full py-2 rounded-t-lg transition-colors duration-300 ${
      currentView === 'Services' ? 'bg-sky-500 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
    }`}
  >
    <label>Productos</label>
  </button>

  <button
    onClick={() => handleViewChange('Bills')}
    className={`w-full py-2 rounded-t-lg transition-colors duration-300 ${
      currentView === 'Bills' ? 'bg-sky-500 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
    }`}
  >
    <label>Facturas</label>
  </button>
  <button
    onClick={() => handleViewChange('Claims')}
    className={`w-full py-2 rounded-t-lg transition-colors duration-300 ${
      currentView === 'Claims' ? 'bg-sky-500 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
    }`}
  >
    <label>Reclamos</label>
  </button>
  <button
    onClick={() => handleViewChange('Statistics')}
    className={`w-full py-2 rounded-t-lg transition-colors duration-300 ${
      currentView === 'Statistics' ? 'bg-sky-500 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
    }`}
  >
    <label>Estadísticas</label>
  </button>
  <button
    onClick={() => handleViewChange('Logs')}
    className={`w-full py-2 rounded-t-lg transition-colors duration-300 ${
      currentView === 'Logs' ? 'bg-sky-500 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
    }`}
  >
    <label>Logs</label>
  </button>
  <button
    onClick={editMode}
    className={`w-full py-2 rounded-t-lg transition-colors duration-300 ${
      currentView === 'Edit' ? 'bg-sky-500 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
    }`}
  >
    <label>{viewMode ? 'Editar' : 'Cancelar'}</label>
  </button>
</section>
       
            
            { currentView === 'Services' ?  <ClienteService  formData={formData} setFormData={setFormData} viewMode={viewMode} editMode={editMode} handleSubmit={handleSubmit} id={id}/> : ''}
            { currentView === 'Bills' ?  <ClientBills formData={formData} setFormData={setFormData} viewMode={viewMode} editMode={editMode} handleSubmit={handleSubmit} id={id}/> : ''}
            {currentView === 'ClientData' ?  <ClientData formData={formData} viewMode={viewMode} handleChange={handleChange} plansList={plansList} handleSubmit={handleSubmit}></ClientData> : ''}
              
            
        </section>
        <div className='text-red-600'>
          <strong>{errorMessage}</strong>
        </div>
      </div>
      
      </>
  

    );
  }
  
  export default Client;
  