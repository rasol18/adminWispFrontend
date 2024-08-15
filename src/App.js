import React, { useState } from 'react';
import {  useDispatch, useSelector } from "react-redux";
import { addUser } from "./Redux/userSlice";
import LoginHeader from "./Components/LoginHeader";
import { setErrorMessage, clearErrorMessage } from '../src/Redux/errorSlice';
import { useNavigate } from 'react-router-dom';
import { LoginUserIcon } from './Icons/LoginUserIcon';
import { PasswordIcon } from './Icons/PasswordIcon';
import { VisibilityIcon } from './Icons/VisibilityIcon';


function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.error.errorMessage);

  const [inputPassword, setInputPassword] = useState({type:'password', color:'#000000'});
  const changeInput = () => {
    const newColor = inputPassword.color === '#0ea5e9' ? '#000000' : '#0ea5e9';
    const newType = inputPassword.type === 'text' ? 'password' : 'text';
    setInputPassword({type:newType ,color: newColor});
  };

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    dispatch(clearErrorMessage());
  };

  //envia los datos del usuario a redux//
  const login = async (e) => {
    e.preventDefault()
    dispatch(addUser({email : formData.email, password: formData.password})) ;
    //aca va el fetch
    const res = await fetch ('http://localhost:3001/auth/login', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: formData.email,
            password: formData.password,
        })
    });
    if (res.ok === true) {
      const data = await res.json();
      const role = data.user.role;
      if (role === 'admin') {
        navigate('/Admin');
      }
  } else {
      dispatch(setErrorMessage('Usuario o contraseña invalidos'));
     setFormData({
      password: '',
      email: '',
    });
  }
  }

  return (
    <>
    <LoginHeader></LoginHeader>
    <section className="relative h-screen flex flex-col justify-center items-center pt-16">
        <img src="./Assets/empresaLogo" alt="logoEmpresa"></img>
        <div className="relative bg-gray-100 p-4 z-[101] rounded-lg shadow-lg w-full max-w-xs">
          <h2 className="text-2xl text-center">Iniciar Sesion</h2>
           <form className="flex flex-col items-center" onSubmit={login}> 
            <div className="mt-2 relative w-full h-10">         
                <input onChange={handleChange}
                  className=" h-full w-full pl-8 bg-gray-100 border-b-2 hover:border-sky-500 outline-none"
                  type="email" name='email' value={formData.email} placeholder="Email" required={true}/>
                <div className="absolute top-1/4 origin-center left-0 ">
                  <LoginUserIcon></LoginUserIcon>
                </div>
            </div> 
            <div className="mt-2 relative w-full h-10 ">
                <input onChange={handleChange}
                  className=" h-full w-full px-8 bg-gray-100 border-b-2 border-sky-500 outline-none "
                  type={inputPassword.type} name='password' value={formData.password} placeholder="Contraseña" required={true}/>
                  <div className="absolute top-1/4 origin-center left-0">
                    <PasswordIcon></PasswordIcon>
                  </div>
                  <button onClick={changeInput} type="button" className="absolute top-1/4 origin-center right-0 ">
                    <VisibilityIcon color={inputPassword.color}></VisibilityIcon>
                  </button>
            </div>
                <button
                  className="w-full bg-sky-300 hover:bg-sky-500 font-semibold rounded-lg p-2 my-2"
                  type="submit" >Ingresar a AdminWisp</button>
          </form>
          <label
            className="font-light text-xs mx-auto"
            >¿Olvidaste tu contraseña? Haz click <a href="/RecoveryPassword"
              className="font-bold"
              > Aquí</a> para recuperarla. </label>
         </div>
         <div className='text-red-600'>{errorMessage}</div>
    </section>
    </>
  );
}

export default App;
