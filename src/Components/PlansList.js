import { Link } from "react-router-dom";
import useFetchPlans from '../hooks/useFetchPlans';
import { EditButton } from './EditButton';

function PlansList() {

  const {plansList}=useFetchPlans()

    return <>
        <section>
        <ul className="grid grid-flow-col-dense">
        <div>
          <h2 className="bg-gray-200 text-lg font-semibold px-2 text-center">Nombre</h2>
          {plansList.map(plan => (
            <li key={plan.id} className="bg-gray-100 p-2 rounded-md shadow ">
              <Link to={`/Admin/Plan?id=${plan.id}`}>
              {plan.name}
              </Link>
            </li>
          ))}
        </div>
        <div>
          <h2 className="bg-gray-200 text-lg font-semibold px-2 text-center">Precio</h2>
          {plansList.map(plan => (
            <li key={plan.id} className="bg-gray-100 p-2 rounded-md shadow ">
              {plan.price}
            </li>
          ))}
        </div>
        <div>
          <h2 className="bg-gray-200 text-lg font-semibold px-2 text-center">Clientes Activos</h2>
          {plansList.map(plan => (
            <li key={plan.id} className="bg-gray-100 p-2 rounded-md shadow ">
               110
            </li>
          ))}
        </div>
        <div>
          <h2 className="bg-gray-200 text-lg font-semibold px-2 text-center">Opciones</h2>
          {plansList.map(plan => (
            <div className=" text-center bg-gray-100 p-2 rounded-md shadow "> 
              <Link to={`/Admin/Plan?id=${plan.id}`}>
              <EditButton></EditButton>
            </Link>
          </div>
          ))}
        </div>
      </ul>
        </section>
          
    </>
}
export default PlansList;