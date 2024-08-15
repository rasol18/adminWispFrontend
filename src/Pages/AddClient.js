import { useNavigate } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import { addClient } from "../Redux/clientSlice";
import React, { useState } from 'react';
import { setErrorMessage, clearErrorMessage } from '../Redux/errorSlice';
import useFetchPlans from '../hooks/useFetchPlans'

 function AddClient () {
    const {plansList} = useFetchPlans();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.error.errorMessage);

    const [formData, setFormData] = useState({
        fullname : '',
        dni: '',
        latitude : '',
        longitude: '',
        phone: '',
        address: '',
        active: 'true',
        email : '',
        instalationDate: '',
        planId:'',
        companyId: '1',
      });

      const { service, ...formDataCopy } = formData;

// Filtra las propiedades con valores no vacíos
const filteredFormData = Object.keys(formDataCopy)
  .filter(key => formDataCopy[key] !== "")
  .reduce((obj, key) => {
    obj[key] = formDataCopy[key];
    return obj;
  }, {});

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
        longitude: formData.Longitude,
        instalationDate: formData.instalationDate,
        planId: formData.planId
    }));
    const res = await fetch ('http://localhost:3001/clients', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filteredFormData)
    });  
    if (res.ok === true) {
        navigate('/SuccessfullClient');
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
            planId:''
      });
    }
    }

    return(
        <div className="flex flex-col justify-items-center items-center py-2 w-full">
            <h2 className="text-sky-500 text-xl">Agregar Cliente</h2>
            <form className="flex  rounded-lg shadow-xl mt-2 flex-wrap w-3/4 justify-center" onSubmit={handleSubmit}>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='name'>Titular del servicio</label>        
                    <input
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        type="text" name='fullname' value={formData.fullname}  onChange={handleChange} placeholder="Nombre y apellido" required={true}/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='adress'>Dirección</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        type="text" name='address' value={formData.address}  required={true} onChange={handleChange} placeholder="Dirección Completa"/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='phone'>Telefono</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        type="tel" name='phone' value={formData.phone} pattern="[0-9]{10}" onChange={handleChange} placeholder="Número telefónico"/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='email'>Correo</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        type="email" name='email' value={formData.email} onChange={handleChange} placeholder="Correo"/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='dni'>DNI</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        type="text" name='dni' value={formData.dni} onChange={handleChange} placeholder="Documento"/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='latitude' className="mr-20">Ubicación</label>   
                    <div>   
                        <input 
                            className="w-1/2 relative outline-none border rounded-md p-2 focus:shadow-lg"
                            type="text" name='latitude' value={formData.latitude} onChange={handleChange} placeholder="Latitud  GPS"/>
                        <input 
                            className="w-1/2 relative outline-none border rounded-md p-2 focus:shadow-lg"
                            type="text" name='longitude' value={formData.longitude} onChange={handleChange} placeholder="Longitud GPS"/>
                    </div>  
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='date'>Fecha de Instalación</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        type="date" name='instalationDate' value={formData.instalationDate} onChange={handleChange}/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='planId'>Abono</label>  
                    <select id="planId" value={formData.planId} name="planId" onChange={handleChange} class="w-full relative outline-none border rounded-md p-2 focus:shadow-lg">
                        <option value="">Selecciona un abono</option>
                        {
                            plansList.map( plan => {
                                return  (<option value={plan.id} key={plan.id}>{plan.name}</option>)
                            })
                        }
                    </select>      
                </div>
                <button
                    className="bg-sky-300 font-semibold rounded-lg p-2 m-2 w-1/2 hover:bg-sky-500"
                    type="submit">Agregar</button>
            </form>
            <div className='text-red-600'>{errorMessage}</div>
        </div>
    )
}
export default AddClient;
