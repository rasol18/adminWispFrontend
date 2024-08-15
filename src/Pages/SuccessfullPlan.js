import LoginHeader from "../Components/LoginHeader";
import { Link } from "react-router-dom";

 function SuccessfullPlan () {

    return(
        <>
        <LoginHeader></LoginHeader>
        <section className=" pt-8 relative h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col justify-items-center items-center py-2 w-1/2">
            <h2 className="text-sky-500 text-xl">PLAN CREADO CON EXITO</h2>
            <Link to={"/Admin/PlansAndProducts"} className="w-full ">
            <button
                    className="bg-sky-300 font-semibold rounded-lg p-2 mt-8 w-full hover:bg-sky-500"
                    type="submit">VER PLANES</button>
            </Link>
        </div>
        </section>
        </>
    )
}
export default SuccessfullPlan;
