import { useNavigate } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useCallback } from 'react';
import { setErrorMessage, clearErrorMessage } from '../Redux/errorSlice';
import { PlanGeneralData } from "../Components/PlanGeneralData";
import { PlanAdvancedData } from "../Components/PlanAdvancedData";

function Plan() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentView, setCurrentView] = useState('PlanData');

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const errorMessage = useSelector(state => state.error.errorMessage);

  const [formData, setFormData] = useState({
      name: '',
      price: '',
      download: '',
      upload: '',
      billingText: '',
      limitAt: '',
      active: '',
      burstLimit: '',
      burstThreshold: '',
      burstTime: '',
      priority:'',
      addressList:'',
      parents:''
    });
    const [viewMode, setViewMode] = useState(true);

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get('id');

    const planData = useCallback( async () => {
      const res = await fetch (`http://localhost:3001/plans/${id}`, {
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
        const data = await planData();
        setFormData({
          name: data.name || '',
          price: data.price || '',
          download: data.download || '',
          upload: data.upload || '',
          billingText: data.billingText || '',
          limitAt: data.limitAt || '',
          active: data.active || '',
          burstLimit: data.burstLimit || '',
          burstThreshold: data.burstThreshold || '',
          burstTime: data.burstTime || '',
          priority: data.priority || '',
          addressList: data.addressList || '',
          parents: data.parents || ''
        });
      };
      fetchData();
    }, [planData]);
  
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
    
  const res = await fetch (`http://localhost:3001/plans/${id}`, {
      method: 'PATCH',
      headers:{
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.name || '',
        price: formData.price || '',
        download: formData.download || '',
        upload: formData.upload || '',
        billingText: formData.billingText || '',
        limitAt: formData.limitAt || '',
        active: formData.active || '',
        burstLimit: formData.burstLimit || '',
        burstThreshold: formData.burstThreshold || '',
        burstTime: formData.burstTime || '',
        priority: formData.priority  || '8',
        addressList: formData.addressList || 'Clientes',
        parents: formData.parents || 'Total'
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
              <h1 className="text-sky-500 m-2 text-2xl">{formData.name}</h1>
            </section>
            <section className="w-full flex bg-gray-600 justify-between rounded-lg shadow-md">
  <button
    onClick={() => handleViewChange('PlanData')}
    className={`w-1/3 px-6 py-2 rounded-t-lg transition-colors duration-300 ${
      currentView === 'PlanData' ? 'bg-sky-500 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
    }`}
  >
    <label>Datos Generales</label>
  </button>
  <button
    onClick={() => handleViewChange('AdvancedData')}
    className={`w-1/3 px-6 py-2 rounded-t-lg transition-colors duration-300 ${
      currentView === 'Services' ? 'bg-sky-500 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
    }`}
  >
    <label>Configuración Avanzada</label>
  </button>
  <button
    onClick={editMode}
    className={`w-1/3 px-6 py-2 rounded-t-lg transition-colors duration-300 ${
      currentView === 'Edit' ? 'bg-sky-500 text-white' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
    }`}
  >
    <label>{viewMode ? 'Editar' : 'Cancelar'}</label>
  </button>
</section>
        {
            currentView === 'PlanData' ? 
                <PlanGeneralData handleChange={handleChange} formData={formData}  handleSubmit= {handleSubmit} viewMode={viewMode} ></PlanGeneralData>
            : <PlanAdvancedData handleChange={handleChange} formData={formData}  handleSubmit= {handleSubmit} viewMode={viewMode} ></PlanAdvancedData>

        }
        </section>
        <div className='text-red-600'>
          <strong>{errorMessage}</strong>
        </div>
      </div>
      </>
  

    );
  }
  
  export default Plan;
  