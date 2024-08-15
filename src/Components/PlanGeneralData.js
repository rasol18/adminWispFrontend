import { EditFinishButton } from "./EditFinishButton"

export const PlanGeneralData = ({formData, handleSubmit, viewMode, handleChange}) => {
    return (
        <form className="flex my-4 flex-wrap justify-center" onSubmit={handleSubmit}>
        <div className="mt-2 px-2 w-4/5 min-w-64">
                    <label for='name'>Nombre del Plan</label>        
                    <input
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        disabled={viewMode}
                        type="text" name='name' value={formData.name}  onChange={handleChange} placeholder="Nombre y apellido" required={true}/>
                </div>
                <div className="mt-2 px-2 w-4/5 min-w-64">
                    <label for='adress'>Descripción</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        disabled={viewMode}
                        type="text" name='billingText' value={formData.billingText}  required={true} onChange={handleChange} placeholder="Descripción del Plan"/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='phone'>Precio</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        disabled={viewMode}
                        type="number" name='price' value={formData.price} onChange={handleChange} placeholder="Precio del Abono"/>
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
                
                {viewMode ? null : <EditFinishButton></EditFinishButton>
                }
                
            </form>
    )
}