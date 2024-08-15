import { useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import React, { useState, useEffect  } from 'react';
import { clearErrorMessage } from '../Redux/errorSlice';
import useFetchPlans from '../hooks/useFetchPlans'
import useFetchProducts from '../hooks/useFetchProducts'
import useFetchSurcharges from "../hooks/useFetchSurcharges";
import useFetchClient from "../hooks/useFetchClient";
import useCurrentDate from "../hooks/useCurrentDate";

 function AddBill () {
    const {plansList} = useFetchPlans();
    const {productsList}= useFetchProducts();
    const {surchargeList} = useFetchSurcharges();
    const {clientList} = useFetchClient();
    const currentDate = useCurrentDate();
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        clientId: '',
        createAt: currentDate,
        planId : '',
        productId: '',
        surchargeId: '',
        discount: '',
        active: 'true',
        companyId: '1',
      });

      useEffect(() => {
        if (currentDate) {
            setFormData(prevData => ({
                ...prevData,
                createAt: currentDate,
            }));
        }
    }, [currentDate]);

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
      
    const res = await fetch ('http://localhost:3001/billing', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filteredFormData)
    });  
    if (res.ok === true) {
        navigate('/SuccessfullClient');
    } else {
        setFormData({
            clientId: '',
            createAt: currentDate,
            planId : '',
            productId: '',
            surchargeId: '',
            discount: '',
            active: 'true',
            companyId: '1',
      });
    }
    }

    return <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="flex flex-col justify-items-center items-center w-3/4 h-3/4 relative bg-white rounded-lg shadow-lg">
                <h2 className="text-sky-500 mt-4 text-lg">Agregar factura</h2>
                <a className="absolute top-2.5 right-5 opacity-70 cursor-pointer" href="/Admin/Billing"><svg fill="#000000" width="24px" height="24px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cancel2</title> <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path> </g></svg></a>
                <form className="flex h-full rounded-lg shadow-xl mt-2 flex-wrap justify-center" onSubmit={handleSubmit}>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='clientId'>Titular del Servicio</label>  
                    <select id="clientId" value={formData.clientId} name="clientId" onChange={handleChange}  required={true} class="w-full relative outline-none border rounded-md p-2 focus:shadow-lg">
                        <option value="">Selecciona un cliente</option>
                        {   
                            
                            clientList && clientList.items ? (
                                clientList.items.map(client => (
                                  <option value={client.id} key={client.id}>{client.fullname}</option>
                                ))
                              ) : (
                                <option value="">No hay clientes disponibles</option>
                              )
                        }
                    </select>      
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='createAt'>Fecha de Creación</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        type="date" name='createAt' value={formData.createAt}  required={true} onChange={handleChange} placeholder="Fecha"/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='planId'>Agregar Plan</label>  
                    <select id="planId" value={formData.planId} name="planId" onChange={handleChange} class="w-full relative outline-none border rounded-md p-2 focus:shadow-lg">
                        <option value="">Selecciona un plan</option>
                        {
                            plansList.map( plan => {
                                return  (<option value={plan.id} key={plan.id}>{plan.name}</option>)
                            })
                        }
                    </select>      
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='productId'>Agregar Producto</label>  
                    <select id="productId" value={formData.productId} name="productId" onChange={handleChange} class="w-full relative outline-none border rounded-md p-2 focus:shadow-lg">
                        <option value="">Selecciona un producto</option>
                        {
                            productsList.map( product => {
                                return  (<option value={product.id} key={product.id}>{product.name}</option>)
                            })
                        }
                    </select>      
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='surchargeId'>Agregar Recargo</label>  
                    <select id="surchargeId" value={formData.surchargeId} name="surchargeId" onChange={handleChange} class="w-full relative outline-none border rounded-md p-2 focus:shadow-lg">
                        <option value="">Selecciona un recargo</option>
                        {
                            surchargeList.map( surcharge => {
                                return  (<option value={surcharge.id} key={surcharge.id}>{surcharge.name}</option>)
                            })
                        }
                    </select>      
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='discount'>Agregar Descuento</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        type="text" name='discount' value={formData.discount} onChange={handleChange}/>
                </div>
                
                <button
                    className="bg-sky-300 font-semibold rounded-lg p-2 m-2 w-1/2 h-1/6 hover:bg-sky-500"
                    type="submit">Agregar</button>
            </form>  
                
                
            </div>        
        </div>
}
export default AddBill;