import { EditFinishButton } from "../Components/EditFinishButton";
import useFetchProducts from "../hooks/useFetchProducts";
import { useEffect, useState } from 'react';

function ClientService({viewMode, editMode, formData, setFormData, handleSubmit}) {

  const {productsList} = useFetchProducts();
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    if (viewMode && !originalData) {
        // Guardar el estado original solo cuando entra en modo edición
        setOriginalData({ ...formData });
    }
}, [viewMode, formData, originalData]);
    
const handleProductChange = (event, index) => {
  const newProducts = formData.products.map((product, i) =>
    i === index ? event.target.value : typeof product === 'object' ? product.id : product
  );
  setFormData({ ...formData, products: newProducts });
};

// Add a new product selection field
const addProduct = () => {
  setFormData({
    ...formData,
    products: [...(formData.products || []), ''] // Allow adding multiple instances of the same product
  });
};

// Custom submit handler that checks for changes before calling handleSubmit
const handleSubmitWithChangeCheck = (e) => {
  e.preventDefault();

  // Check if the data has changed
  const isDataChanged = JSON.stringify(formData) !== JSON.stringify(originalData);

  if (!isDataChanged) {
    // If no changes, log a message and don't submit
    editMode()
    return
  }

  // If there are changes, proceed with handleSubmit
  handleSubmit(e);
};

    return (
      <>
         <form className="flex mt-2 flex-wrap justify-center" onSubmit={handleSubmitWithChangeCheck}>

                <div className="mt-2 px-2 w-4/5 min-w-64">
                    <label for='products'>Productos</label> 
                    {
  formData.products.length === 0 ? (
    <select
      id="products"
      value=""
      name="products"
      onChange={(e) => handleProductChange(e, 0)}
      disabled={viewMode}
      className="w-full relative outline-none border rounded-md p-2 m-1 focus:shadow-lg"
    >
      <option value="">Selecciona un producto</option>
      {productsList.map(product => (
        <option value={product.id} key={product.id}>{product.name}</option>
      ))}
    </select>
   ) : (
    formData.products.map((productId, index) => {
      return (
      <select
        id={`product-${index}`}
        value={productId}
        name={`product-${index}`}
        onChange={(e) => handleProductChange(e, index)}
        disabled={viewMode}
        className="w-full relative outline-none border rounded-md p-2 m-1 focus:shadow-lg"
        key={index}
      >
        <option value={productId.id} key={productId.id}>{formData.products[index].name}</option>
        {productsList.map(product => (
          <option value={product.id} key={product.id}>{product.name}</option>
        ))}
      </select>)
      
  })
  )
}
{viewMode ? null :  <button
                                      type="button"
                                      onClick={addProduct}
                                      disabled={viewMode}
                                      className="mt-4 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                      >
                                       Agregar Producto
                                    </button>
                }

                </div>
             
                {viewMode ? null : <EditFinishButton></EditFinishButton>
                }
            </form>
        
      </>
  

    );
  }
  
  export default ClientService;
  