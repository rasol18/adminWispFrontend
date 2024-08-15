import { Link } from "react-router-dom";

function LoginHeader () {

    return <>
        <header className="fixed w-full h-16 bg-gray-100 z-[100] py-2 px-2 ">
      <nav className="flex items-center place-content-between gap-x-6">
        <a href="http://localhost:3000/" className="text-2xl hover:text-sky-500">AdminWisp</a>
        <ul>
          <li className="flex items-center place-content-between gap-x-6">
            <a href="http://localhost:3000/" className="hover:text-sky-500" >Manual</a>
            <a href="#" className="hover:text-sky-500">Planes</a>
            <a href="#" className="hover:text-sky-500">Contacto</a>
          </li>
        </ul>
        <Link to={"/AddUser"}>
        <button className="hover:text-sky-500 py-1 px-4 border-sky-500 border-2 rounded-lg active:scale-95"
        >Crear Cuenta</button>
        </Link>
      </nav>
    </header>
    </>
}
export default LoginHeader;