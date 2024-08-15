import { useNavigate } from 'react-router-dom';
import {  useDispatch, useSelector } from "react-redux";
import { addUser } from "../Redux/userSlice";
import LoginHeader from "../Components/LoginHeader";
import { setErrorMessage, clearErrorMessage } from '../Redux/errorSlice';
import React, { useState, useEffect } from 'react';
 function AddUser () {
    
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.error.errorMessage);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        service: ''
      });

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
        dispatch(clearErrorMessage());
      };
      
    //cuando se hace submit en el formulario redirecciona a la pagina principal//
    const handleSubmit = async event => {
      event.preventDefault();
      
      //envia los datos del usuario a redux//
      dispatch(addUser({
        username: formData.username, 
        password: formData.password,
        email: formData.email,
        service: formData.service,
    })); 
        const res = await fetch ('http://localhost:3001/users', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: formData.username, 
            password: formData.password,
            email: formData.email,
            service: formData.service,
            role: 'administrador'
        })
    });

    if (res.ok === true) {
        navigate('/SuccessfullAccount');
    } else {
        dispatch(setErrorMessage('Hubo un error al procesar la solicitud'));
        setFormData({
        username: '',
        password: '',
        email: '',
        service: ''
      });
    }
    }
    return(
        <>
        <LoginHeader></LoginHeader>
        <section className=" pt-8 relative h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col justify-items-center items-center py-2 w-full">
            <h2 className="text-sky-500 text-xl">Crea tu cuenta</h2>
            <form className="flex  rounded-lg shadow-xl mt-2 flex-wrap w-3/4 justify-center" onSubmit={handleSubmit}>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label htmlFor='username'>Usuario</label>        
                    <input
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        type="text" name='username' value={formData.username} placeholder="Juanma21" minLength="3"  onChange={handleChange} required={true}/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label htmlFor='password'>Contraseña</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        type="password" name='password' value={formData.password} placeholder="12345678" onChange={handleChange} required={true} />
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label htmlFor='email'>Correo</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        type="email" name='email' id="email" value={formData.email} placeholder="Correo" required={true} onChange={handleChange} />
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label htmlFor='service'>Servicio</label>  
                    <select id="service" name="service" required={true} value={formData.service} onChange={handleChange}  className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg">
                        <option value="">Selecciona un plan</option>
                        <option value="Free">Gratis</option>
                        <option value="Basic">Basico</option>
                        <option value="Total">Total</option>
                    </select>      
                </div>
                <button
                    className="bg-sky-300 font-semibold rounded-lg p-2 m-8 w-1/2 hover:bg-sky-500"
                    type="submit">Crear Cuenta</button>
            </form>
        </div>
        <div className='text-red-600'>{errorMessage}</div>
        </section>
        </>
    )
}
export default AddUser;
