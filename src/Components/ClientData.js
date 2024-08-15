import React from "react";
import { EditFinishButton } from "../Components/EditFinishButton";


function ClientData ({formData, viewMode, handleChange, plansList, handleSubmit}) {

    return <>
        <form className="flex my-4 flex-wrap justify-center" onSubmit={handleSubmit}>
        <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='name'>Titular del servicio</label>        
                    <input
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        disabled={viewMode}
                        type="text" name='fullname' value={formData.fullname}  onChange={handleChange} placeholder="Nombre y apellido" required={true}/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='adress'>Dirección</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        disabled={viewMode}
                        type="text" name='address' value={formData.address}  required={true} onChange={handleChange} placeholder="Dirección Completa"/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='phone'>Telefono</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        disabled={viewMode}
                        type="tel" name='phone' value={formData.phone} pattern="[0-9]{10}" onChange={handleChange} placeholder="Número telefónico"/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='email'>Correo</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        disabled={viewMode}
                        type="email" name='email' value={formData.email} onChange={handleChange} placeholder="Correo"/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='dni'>DNI</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        disabled={viewMode}
                        type="text" name='dni' value={formData.dni} onChange={handleChange} placeholder="Documento"/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='latitude' className="mr-28">Ubicación</label>        
                    <div>   
                        <input 
                            className="w-1/2 relative outline-none border rounded-md p-2 focus:shadow-lg"
                            disabled={viewMode}
                            type="text" name='latitude' value={formData.latitude.toString()} onChange={handleChange} placeholder="Latitud  GPS"/>
                        <input 
                            className="w-1/2 relative outline-none border rounded-md p-2 focus:shadow-lg"
                            disabled={viewMode}
                            type="text" name='longitude' value={formData.longitude.toString()} onChange={handleChange} placeholder="Longitud GPS"/>
                    </div>  
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='Active'>Estado</label>        
                    <select id="active" value={formData.active} name="active" onChange={handleChange} 
                      disabled={viewMode}
                      class="w-full relative outline-none border rounded-md p-2 focus:shadow-lg">
                        {
                          formData.active === 'true' ? 
                          <>
                            <option value='true' key={1}>Activo</option>
                            <option value='false' key={0}>Archivado</option>
                          </>
                          : 
                          <>
                          <option value='false' key={0}>Archivado</option>
                          <option value='true' key={1}>Activo</option>
                        </>
                          
                        }
                    </select>    
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='planId'>Abono</label>  
                    <select id="planId" value={formData.planId} name="planId" onChange={handleChange}
                      disabled={viewMode}
                      class="w-full relative outline-none border rounded-md p-2 focus:shadow-lg">
                        <option value="">Selecciona un abono</option>
                        {
                            plansList.map( plan => {
                                return  (<option value={plan.id} key={plan.id}>{plan.name}</option>)
                            })
                        }
                    </select>      
                </div>
                {viewMode ? null : <EditFinishButton></EditFinishButton>
                }
                
            </form>
    </>
}
export default ClientData;