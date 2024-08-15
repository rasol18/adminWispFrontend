import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import { addClient } from "../Redux/clientSlice";
import React, { useState } from 'react';
import { setErrorMessage, clearErrorMessage } from '../Redux/errorSlice';
import { DolarIcon } from "../Icons/DolarIcon";
import { CancelIcon } from "../Icons/CancelIcon";

function AddPlans () {

        
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.error.errorMessage);

    const [formData, setFormData] = useState({
        name : '',
        price: '',
        download : '',
        upload: '',
        billingText: '',
        address: '',
        active: '',
        limitAt:'',
        burstLimit:'',
        burstThreshold:'',
        burstTime:'',
        priority:'',
        addressList:'',
        parents:''
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
            download : formData.download,
            upload: formData.upload,
            billingText: formData.billingText,
            active: 'true',
            limitAt:formData.limitAt,
            burstLimit: formData.burstLimit,
            burstThreshold: formData.burstThreshold,
            burstTime:formData.burstTime,
            priority:formData.priority,
            addressList:formData.addressList,
            parents: formData.parents
    }));
    console.log(addClient)
    const res = await fetch ('http://localhost:3001/plans', {
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
            download : '',
            upload: '',
            billingText: '',
            address: '',
            active: '',
            limitAt:'',
            burstLimit:'',
            burstThreshold:'',
            burstTime:'',
            priority:'',
            addressList:'',
            parents:''
      });
    }
    }

    return <>
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"> 
       
       
        <div className="flex flex-col justify-items-center items-center w-11/12 h-5/6 relative bg-white rounded-lg shadow-lg">
        <h2 className="text-sky-500 text-lg">Agregar nuevo plan de servicio</h2>
        <Link to="/Admin/PlansAndProducts" className="absolute top-2.5 right-5 opacity-70 cursor-pointer">
            <CancelIcon></CancelIcon>
        </Link>
        <form onSubmit={handleSubmit} className="flex  rounded-lg shadow-xl mt-2 flex-wrap w-full h-full justify-center place-content-start">
            <div className=" px-2 h-6 w-2/5 min-w-64">
                <label htmlFor="name">Nombre del plan</label>
                <input onChange={handleChange} className="w-full h-full relative outline-none border rounded-md p-2 focus:shadow-lg" type="text" name="name" value={formData.name} placeholder="Plan especial 10MB"/>
            </div>
            <div className=" px-2 h-6 w-2/5 max-sm:mt-8 min-w-64">
                <label htmlFor="billingText">Texto de Facturación</label>
                <input onChange={handleChange} className="w-full h-full relative outline-none border rounded-md p-2 focus:shadow-lg" type="text" name="billingText" value={formData.billingText} placeholder="Internet Banda Ancha 8MB de descarga y 4 de subida"/>
            </div>
            <div className=" px-2 h-6 w-4/5 min-w-64  my-8">
                <label htmlFor="price">Precio del Plan</label>
                <div  className="w-full flex relative outline-none border rounded-md hover:shadow-lg">
                    <div >
                        <DolarIcon></DolarIcon>
                    </div>
                    <input onChange={handleChange} className="px-4 outline-none w-full " type="number" name="price" value={formData.price} placeholder="15.000"/>
                </div>
                </div>
                <div className="w-full h-3/5 pt-2 grid grid-cols-3 max-sm:grid-cols-1 justify-items-center border-t-4 place-content-stretch border-sky-100">
                <div className=" px-2 w-2/5 h-6 min-w-64">
                    <label htmlFor="download">Descarga</label>
                    <div onChange={handleChange} className="flex w-full h-full relative border rounded-md hover:shadow-lg ">
                        <input className="outline-none w-full p-2" type="number" name="download" value={formData.download} placeholder="15"/>
                        <span className="bg-gray-100 text-center w-12 h-full">MB</span>
                    </div>
                </div>
                <div className=" px-2 w-2/5 h-6 min-w-64">
                    <label htmlFor="upload">Subida</label>
                    <div className=" flex w-full h-full relative border rounded-md hover:shadow-lg ">
                        <input onChange={handleChange} className="outline-none w-full p-2" type="number" name="upload" value={formData.upload} placeholder="5"/>
                        <span className="bg-gray-100 w-12 h-full text-center">MB</span>
                    </div>
                </div>
                <div className=" px-2 w-2/5 h-6 min-w-64">
                    <label htmlFor="limitAt">Limit AT</label>
                    <div className=" flex w-full h-full relative border rounded-md hover:shadow-lg ">
                        <input onChange={handleChange} className="outline-none w-full p-2" type="number" name="limitAt" value={formData.limitAt} placeholder="10"/>
                        <span className="bg-gray-100 w-12 h-full text-center">%</span>
                    </div>
                </div>
                <div className=" px-2 w-2/5 h-6 min-w-64">
                    <label htmlFor="burstLimit">Burst Limit</label>
                        <div className=" flex w-full h-full relative border rounded-md hover:shadow-lg ">
                        <input onChange={handleChange} className="outline-none w-full p-2" type="number" name="burstLimit" value={formData.burstLimit} placeholder="25" />
                    <span className="bg-gray-100 w-12 h-full text-center">%</span>
                    </div>
                </div>
                <div className=" px-2 w-2/5 h-6 min-w-64">
                    <label htmlFor="burstThreshold">Burst threshold</label>
                    <div className=" flex w-full h-full relative border rounded-md hover:shadow-lg ">
                    <input onChange={handleChange} className="outline-none w-full p-2" type="number" name="burstThreshold" value={formData.burstThreshold} placeholder="10" />
                    <span className="bg-gray-100 w-12 h-full text-center">%</span>
                </div>
                </div>
                <div className=" px-2 w-2/5 h-6 min-w-64">
                    <label htmlFor="burstTime">Burst time</label>
                    <div className=" flex w-full h-full relative border rounded-md hover:shadow-lg ">
                        <input onChange={handleChange} className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg" type="number" name="burstTime" value={formData.burstTime} placeholder="60" />
                        <span className="bg-gray-100  w-12 h-full text-center">Seg</span>
                </div>
                </div>
                <div className=" px-2 w-2/5 h-6 min-w-64">
                    <label htmlFor="priority">Prioridad</label>
                    <select value={formData.priority} name="priority" onChange={handleChange} className="w-full h-full relative outline-none border rounded-md focus:shadow-lg">
                    <option value="">Selecciona un abono</option>
                    <option value="8">Bajo (8)</option>
                    <option value="7">Bajo (7)</option>
                    <option value="6">Normal (6)</option>
                    <option value="5">Normal (5)</option>
                    <option value="4">Normal (4)</option>
                    <option value="3">Alto (3)</option>
                    <option value="2">Alto (2)</option>
                    <option value="1">Alto (1)</option>
                </select>  
                </div>
                <div className=" px-2 w-2/5 h-6 min-w-64">
                    <label htmlFor="addressList">Address List</label>
                    <input onChange={handleChange} className="w-full h-full relative outline-none border rounded-md p-2 focus:shadow-lg" type="text" name="addressList" value={formData.addressList} placeholder="Habilitados" />
                </div>  
                <div className=" px-2 w-2/5 h-6 min-w-64">
                    <label htmlFor="parents">Parents</label>
                    <input onChange={handleChange} className="w-full h-full relative outline-none border rounded-md p-2 focus:shadow-lg" type="text" name="parents" value={formData.parents} placeholder="Total" />
                </div> 
                </div>
                
                <button type="submit"  className="bg-sky-300 font-semibold rounded-lg p-2 m-2 w-1/2 hover:bg-sky-500" >Agregar</button>
        
        </form>
        <div className='text-red-600'>{errorMessage}</div>
    </div>
    
    </div>
    </>
}
export default AddPlans;