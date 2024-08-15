import React,  { useState }  from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import AddPlans from "./AddPlans";
import AddProducts from "./AddProducts";
import AddSurcharges from "./AddSurcharges";
import PlansList from "../Components/PlansList"; 
import SurchargesList from "../Components/SurchargesList";
import ProductsList from "../Components/ProductsList";
import { SearchIcon } from "../Icons/SearchIcon";

function PlansAndProducts () {

    const [isOpen, setIsOpen] = useState(false);
    const [currentView, setCurrentView] = useState('Plans');
   

    const navigate = useNavigate();


    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOptionClick = (option) => {
      console.log(`Agregar ${option}`);
      navigate(`/Admin/PlansAndProducts/${option}`);
      // Aquí puedes manejar la lógica de navegación o apertura de formularios para cada opción.
    };

    const handleViewChange = (view) => {
      setCurrentView(view);
    };
    

    return <div className="flex flex-col justify-items-center items-center py-2 w-full">
            <h2 className="text-sky-500 text-xl">Planes de servicio y Productos</h2>
            <section className="flex  rounded-lg shadow-xl mt-2 flex-wrap w-11/12 justify-center">
            <div className=" w-full flex mx-auto justify-between p-4">
            <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={handleToggle}
        >
          Agregar
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
              onClick={() => handleOptionClick('AddPlans')}
            >
              Agregar Plan
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
              onClick={() => handleOptionClick('AddProducts')}
            >
              Agregar Producto
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
              onClick={() => handleOptionClick('AddSurcharges')}
            >
              Agregar Recargo
            </button>
          </div>
        </div>
      )}
    </div>
    <div className="relative">
  <input
    type="text"
    placeholder="Buscar cliente"
    className="block w-full py-2 pl-10 pr-4 rounded-full focus:outline-none border border-gray-300 focus:border-sky-500"
    
  />
  <div     className="absolute top-1/2 transform -translate-y-1/2 left-3 w-5 h-5 text-gray-400"  >
    <SearchIcon></SearchIcon>
  </div>

</div>
                <button className="hover:text-sky-500" >Filtrar</button>
            </div>
            <section className="w-full flex bg-gray-500 justify-between rounded-lg">
            <button onClick={() => handleViewChange('Plans')}className={`w-1/3 px-6 py-2 rounded-t-lg ${currentView === 'Plans' ? 'bg-sky-500 text-white' : 'bg-gray-500 text-black'}`}>
            <label>Planes de Servicio</label>
          </button>
          <button onClick={() => handleViewChange('Products')} className={`w-1/3 px-6 py-2 rounded-t-lg ${currentView === 'Products' ? 'bg-sky-500 text-white' : 'bg-gray-500 text-black'}`}>
            <label>Productos</label>
          </button>
          <button onClick={() => handleViewChange('Surcharges')}  className={`w-1/3 px-6 py-2 rounded-t-lg ${currentView === 'Surcharges' ? 'bg-sky-500 text-white' : 'bg-gray-500 text-black'}`}>
            <label>Recargos</label>
          </button>
            </section>
            <div className="w-full">
          {currentView === 'Plans' && <PlansList />}
          {currentView === 'Products' && <ProductsList />}
          {currentView === 'Surcharges' && <SurchargesList />}
        </div>
            <div>
                <Routes>
                    <Route path="AddPlans" element={<AddPlans />} />
                    <Route path="AddProducts" element={<AddProducts />} />
                    <Route path="AddSurcharges" element={<AddSurcharges />} />
                </Routes>
            </div>
                </section>
        </div>
        }
export default PlansAndProducts;