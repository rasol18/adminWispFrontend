import {useState} from "react";
import { Link} from "react-router-dom";
import { RedIcon } from "../Icons/RedIcon";
import { ArrowDownIcon } from "../Icons/ArrowDownIcon";
import { BillIcon } from "../Icons/BillIcon";
import { ClientsIcons } from "../Icons/ClientsIcons";
import { DoubleArrowIcon } from "../Icons/DoubleArrowIcon";


function LeftSideBar () {
    //el estado indica si la barra tiene que ser minimizada o no//
    const [isMinimized, setIsMinimized] = useState(false);

    //el estado indica si la sublista se tiene que mostrar o no//
    const [subList, setSubList] = useState({
        red: false,
        billing: false,
        client: false
    });

    //cambia el valor de minimized//
    const minimized = () => {
        setIsMinimized(!isMinimized)
    }

    //muestra las sublistas//
    const viewSubList = (value) => {
        //dependiendo que lista recibe el click se vuelve true diferente valor del estado//
            setSubList( prevState => ({
                ...prevState,
                [value]: !prevState[value]
            }))
        
        console.log(subList)
    }


    return <nav className={` bg-gray-100 sidebar-height relative h-full ${isMinimized ? "w-16" : "w-60"}`}>
            <div className={`bg-sky-100 ${isMinimized ? "h-10" : "h-20"}`}> 
            <span>
                <img src="..\Assets\empresaLogo" className="rounded-full w-8 p-2"/>
                {isMinimized ? <></> : <h2 className="px-2">Nombre</h2> }  
                {isMinimized ? <></> : <h3 className="text-xs px-2">Administrador</h3> }  
            </span>
                
            </div>
            <div className="w-full">
            {isMinimized ? <></> : <h3>Menu</h3> }  
            <>
                <ul>
                    <li onClick={() => viewSubList('red')}>
                        <div className="flex place-content-between p-2 items-center transition duration-300 ease-in-out transform hover:scale-100 hover:bg-sky-400 hover:shadow-lg">
                        <a href="#" className="flex">
                            <RedIcon></RedIcon>
                            {isMinimized ? <></> : <span className="pl-2"> Gestionar red </span> } 
                        </a>
                        <button>
                            <ArrowDownIcon></ArrowDownIcon>
                        </button>
                        </div>
                        <ul className= {`pl-10 bg-gray-100 w-56 rounded-md  ${subList.red ? " " : "hidden"}`}>
                            <li>
                                <a href="#" className=" opacity-60 transition duration-300 ease-in-out transform hover:font-bold hover:text-sky-500">Dispositivos</a>
                            </li>
                            <li>
                                <a href="#" className=" opacity-60 transition duration-300 ease-in-out transform hover:font-bold hover:text-sky-500">Redes</a>
                            </li>
                        </ul>
                    </li>
                    <li onClick={() => viewSubList('billing')}>
                        <div className="flex place-content-between p-2 items-center transition duration-300 ease-in-out transform hover:scale-100 hover:bg-sky-400 hover:shadow-lg">
                        <a href="#" className="flex ">
                            <BillIcon></BillIcon>
                            {isMinimized ? <></> : <span className="pl-2"> Facturación </span> } 
                        </a>
                        <button>
                            <ArrowDownIcon></ArrowDownIcon>
                        </button>
                        </div>
                        <ul className={`pl-10 bg-gray-100 w-56 rounded-md ${subList.billing ? " " : "hidden"}`}>
                            <li>
                                <a href="#" className=" opacity-60 transition duration-300 ease-in-out transform hover:font-bold hover:text-sky-500">Reportes</a>
                            </li>
                            <li>
                                <Link to="/Admin/PlansAndProducts" className=" opacity-60 transition duration-300 ease-in-out transform hover:font-bold hover:text-sky-500">Planes y Productos</Link>
                            </li>
                            <li>
                                <Link to="/Admin/Billing" className=" opacity-60 transition duration-300 ease-in-out transform hover:font-bold hover:text-sky-500">Pagos y Facturas</Link>
                            </li>
                            <li>
                                <a href="#" className=" opacity-60 transition duration-300 ease-in-out transform hover:font-bold hover:text-sky-500">Personalizar</a>
                            </li>
                        </ul>
                    </li>
                    <li onClick={() => viewSubList('client')}> 
                        <div className="flex place-content-between p-2 items-center transition duration-300 ease-in-out transform hover:scale-100 hover:bg-sky-400 hover:shadow-lg">
                        <a href="#" className="flex">
                            <ClientsIcons></ClientsIcons>
                            {isMinimized ? <></> : <span className="pl-2"> Clientes </span> } 
                        </a>
                        <button >
                            <ArrowDownIcon></ArrowDownIcon>
                        </button>
                        </div>
                        <ul className={`pl-10 bg-gray-100 w-56 rounded-md ${subList.client ? " " : "hidden"}`}>
                            <li >
                                <Link to="AddClient" className="  opacity-60 transition duration-300 ease-in-out transform hover:font-bold hover:text-sky-500">Agregar Cliente</Link>
                            </li>
                            <li>
                                <Link to="ClientList" className="  opacity-60 transition duration-300 ease-in-out transform hover:font-bold hover:text-sky-500">Lista de clientes</Link>
                            </li>
                            <li><a href="#" className="  opacity-60 transition duration-300 ease-in-out transform hover:font-bold hover:text-sky-500">Mapa de clientes</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                </>
            </div>
            <button  className="translate-y-1/2 absolute right-0 bg-gray-300 rounded-full p-2 translate-x-4
             transition duration-300 ease-in-out transform hover:scale-110 hover:bg-sky-400 hover:shadow-lg" onClick={minimized}>
                <DoubleArrowIcon></DoubleArrowIcon>    
            </button>
        </nav>
}
export default LeftSideBar;
