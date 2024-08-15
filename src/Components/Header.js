import {useState} from "react";
import { Link } from "react-router-dom";
import { SearchIcon } from "../Icons/SearchIcon";
import { BellIcon } from "../Icons/BellIcon";
import { DolarIcon } from "../Icons/DolarIcon";

function Header () {

    //el estado indica si la barra tiene que ser minimizada o no//
    const [isMinimized, setIsMinimized] = useState(false);

    //cambia el valor de minimized//
    const minimized = () => {
        setIsMinimized(!isMinimized)
    }

    return <>
        <nav className="bg-gray-100 h-12 flex items-center place-content-between flex-nowrap px-6">
            <Link to={""}>
                <a href="#"  class="rounded-full"><img src="./logo"></img></a>
            </Link>
            
            <div className="relative">
  <input
    type="text"
    placeholder="Buscar cliente"
    className="block w-full pl-10 pr-4 rounded-full focus:outline-none border border-gray-300 focus:border-sky-500"
    
  />
  <div className="absolute top-1/2 transform -translate-y-1/2 left-3 w-5 h-5 text-gray-400">
    <SearchIcon></SearchIcon>
  </div>
</div>
            <div className="flex items-center flex-nowrap w-28 place-content-between">
                <a href="#">
                    <DolarIcon></DolarIcon>
                </a>
                <a href="#">
                    <BellIcon></BellIcon>
                </a>
                <button className="rounded-full px-2" onClick={minimized}>Cuenta </button>
            <div>
                <ul className={`top-12 right-0 bg-gray-100 w-40 absolute rounded-md ${isMinimized ? "" : "hidden"}`}>
                    <li>
                        <a href=""  className="text-sm opacity-60  hover:opacity-100">Mi cuenta</a>
                    </li>
                    <li>
                        <a href=""  className="text-sm opacity-60 hover:opacity-100">Cambiar contraseña</a>
                    </li>
                    <li>
                        <a href=""  className="text-sm opacity-60 hover:opacity-100">Cerrar sesion</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>

    </>
}
export default Header;