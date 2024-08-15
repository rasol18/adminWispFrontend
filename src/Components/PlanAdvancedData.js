import { EditFinishButton } from "./EditFinishButton"

export const PlanAdvancedData = ({formData, handleSubmit, viewMode, handleChange}) => {
    return (
        <form className="flex my-4 flex-wrap justify-center" onSubmit={handleSubmit}>
        <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='download'>Descarga</label>        
                    <input
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        disabled={viewMode}
                        type="number" name='download' value={formData.download}  onChange={handleChange} placeholder="Velocidad de descarga" required={true}/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='upload'>Subida</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        disabled={viewMode}
                        type="number" name='upload' value={formData.upload}  required={true} onChange={handleChange} placeholder="Velocidad de subida"/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='limitAt'>Limit At</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        disabled={viewMode}
                        type="number" name='limitAt' value={formData.limitAt} onChange={handleChange} placeholder="Velocidad Minima"/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='burstLimit'>Burst Limit</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        disabled={viewMode}
                        type="number" name='burstLimit' value={formData.burstLimit} onChange={handleChange} placeholder="Velocidad Maxima de Rafaga"/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='burstThreshold'>Burst Threshold</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        disabled={viewMode}
                        type="number" name='burstThreshold' value={formData.burstThreshold} onChange={handleChange} placeholder="Velocidad Maxima que Activa la Rafaga"/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='addressList'>Address List</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        disabled={viewMode}
                        type="text" name='addressList' value={formData.addressList} onChange={handleChange} placeholder="Lista en Mikrotik"/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='parent'>Parents</label>        
                    <input 
                        className="w-full relative outline-none border rounded-md p-2 focus:shadow-lg"
                        disabled={viewMode}
                        type="text" name='parent' value={formData.parent} onChange={handleChange} placeholder="Padre en la queau"/>
                </div>
                <div className="mt-2 px-2 w-2/5 min-w-64">
                    <label for='priority'>Priority</label>        
                    <select id="priority" value={formData.priority} name="priority" onChange={handleChange} 
                      disabled={viewMode}
                      class="w-full relative outline-none border rounded-md p-2 focus:shadow-lg">
                            <option value='8' key={8}>Baja(8)</option>
                            <option value='7' key={7}>Baja(7)</option>
                            <option value='6' key={6}>Normal(6)</option>
                            <option value='5' key={5}>Normal(5)</option>
                            <option value='4' key={4}>Normal(4)</option>
                            <option value='3' key={3}>Alto(3)</option>
                            <option value='2' key={2}>Alto(2)</option>
                            <option value='1' key={1}>Alto(1)</option>
                    </select>    
                </div>
                
                {viewMode ? null : <EditFinishButton></EditFinishButton>
                }
                
            </form>
    )
}