import { useNavigate } from 'react-router-dom';
import {  useDispatch, useSelector } from "react-redux";
import { addUser } from "../Redux/userSlice";
import LoginHeader from "../Components/LoginHeader";
import { setErrorMessage, clearErrorMessage } from '../Redux/errorSlice';
import React, { useState } from 'react';
 function RecoveryPassword () {
    
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
        email: formData.email,
    })); 
        const res = await fetch ('http://localhost:3001/auth/recovery', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: formData.email,
        })
    });

    if (res.ok === true) {
        navigate('/SuccessfullAccount');
    } else {
        dispatch(setErrorMessage('Hubo un error al procesar la solicitud'));
        setFormData({
        email: '',
      });
    }
    }
    return(
        <>
        <LoginHeader></LoginHeader>
        <section className=" pt-8 relative h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col justify-items-center items-center py-2 w-full">
            <h2 className="text-sky-500 text-xl">RECUPERAR CONTRASEÑA</h2>
            <form className="flex flex-col rounded-lg  justify-items-center items-center shadow-xl mt-2 flex-wrap w-4/5 " onSubmit={handleSubmit}>
                <div className="flex mt-2 px-2 w-2/5 min-w-64">
                <label htmlFor='email' className='p-2'>Correo</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        type="email" name='email' id="email" value={formData.email} placeholder="usuario@gmail.com" required={true} onChange={handleChange} />
                </div>
                <button
                    className="bg-sky-300 font-semibold rounded-lg p-2 m-8 w-1/2 hover:bg-sky-500"
                    type="submit">Enviar Correo</button>
            </form>
        </div>
        <div className='text-red-600'>{errorMessage}</div>
        </section>
        </>
    )
}
export default RecoveryPassword;
