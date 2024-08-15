import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import { addClient } from "../Redux/clientSlice";
import React, { useState } from 'react';
import { setErrorMessage, clearErrorMessage } from '../Redux/errorSlice';
import { DolarIcon } from "../Icons/DolarIcon";
import { CancelIcon } from "../Icons/CancelIcon";

function AddProducts () {

        
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.error.errorMessage);

    const [formData, setFormData] = useState({
        name : '',
        price: '',
        description : '',
        billingText: '',
      });

      const formDataCopy = { ...formData };

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
            name : formData.name,
            price: formData.price,
            description : formData.description,
            billingText: formData.billingText,
            active: 'true',
    }));
    const res = await fetch ('http://localhost:3001/products', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filteredFormData)
    });  
    if (res.ok === true) {
        navigate('/SuccessfullPlan');
    } else {
        dispatch(setErrorMessage('Hubo un error al procesar la solicitud'));
        setFormData({
            name : '',
            price: '',
            description : '',
            billingText: '',
      });
    }
    }

    return <>
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"> 
       
       
        <div className="flex flex-col justify-items-center items-center w-11/12 h-5/6 relative bg-white rounded-lg shadow-lg">
        <h2 className="text-sky-500 text-lg">Agregar nuevo producto</h2>
        <Link to="/Admin/PlansAndProducts" className="absolute top-2.5 right-5 opacity-70 cursor-pointer">
            <CancelIcon></CancelIcon>
        </Link>
        <form onSubmit={handleSubmit} className="flex rounded-lg shadow-xl mt-2 flex-wrap w-full h-full justify-center place-content-start">
        <div className="mt-2 px-2 w-3/4 min-w-64">
                    <label for='name'>Nombre del producto</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        type="text" name='name' value={formData.name} onChange={handleChange} placeholder="Router WIFI"/>
                </div>
            <div className="mt-2 px-2 w-3/4 min-w-64">
                <label htmlFor="billingText">Texto de Facturación</label>
                <input onChange={handleChange} className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg" type="text" name="billingText" value={formData.billingText} placeholder="Servicio de red wifi extendido"/>
            </div>
            <div className="mt-2 px-2 w-3/4 min-w-64">
                <label htmlFor="price">Precio del producto</label>
                <div  className="w-full flex relative outline-none border rounded-md hover:shadow-lg">
                    <div className="pt-2">
                        <DolarIcon></DolarIcon>
                    </div>
                    <input onChange={handleChange} className="p-2 relative outline-none w-full " type="number" name="price" value={formData.price} placeholder="15.000"/>
                </div>
                </div> 
                <div className="mt-2 px-2 w-3/4 min-w-64">
                    <label for='description'>Descripción</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        type="text" name='description' value={formData.description} onChange={handleChange} placeholder="Router TP-Link 850"/>
                </div>
                
                <button type="submit"  className="bg-sky-300 font-semibold rounded-lg p-2 m-2 w-1/2 hover:bg-sky-500">Agregar</button>
        
        </form>
        <div className='text-red-600'>{errorMessage}</div>
    </div>
    
    </div>
    </>
}
export default AddProducts;