import LoginHeader from "../Components/LoginHeader";
import { Link } from "react-router-dom";

 function SuccessFullRecoveryEmailSend () {

    return(
        <>
        <LoginHeader></LoginHeader>
        <section className=" pt-8 relative h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col justify-items-center items-center py-2 w-1/2">
            <h2 className="text-sky-500 text-xl pb-4">CORREO ENVIADO CORRECTAMENTE</h2>
            <p>¡Hemos enviado un correo electrónico con instrucciones para recuperar tu contraseña! Por favor, revisa tu bandeja de entrada y sigue los pasos indicados. </p>
            <Link to={"/"} className="w-full ">
            <button
                    className="bg-sky-300 font-semibold rounded-lg p-2 mt-8 w-full hover:bg-sky-500"
                    type="submit">INICIAR SESION</button>
            </Link>
        </div>
        </section>
        </>
    )
}
export default SuccessFullRecoveryEmailSend;
