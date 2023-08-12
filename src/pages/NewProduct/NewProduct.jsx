import { useReducer } from "react";
import { useInventory } from "../../context/InventoryContext";

const handleProductData = (data, action) => {
    switch(action.type){
        case 'name' : return ({ ...data, name: action.value });
        case 'price' : return ({ ...data, price: action.value });
        case 'description' : return ({ ...data, description: action.value });
        case 'stock' : return ({ ...data, stock: action.value });
        case 'sku' : return ({ ...data, sku: action.value });
        case 'supplier' : return ({ ...data, supplier: action.value });
        case 'imageUrl' : return ({ ...data, imageUrl: action.value });
        case 'department' : return({ ...data, department: action.value });

        default: throw Error(`some error in handleing ${action.type}`);
    }
}

export const NewProduct = () => {

    const [ { name, price, description, stock, sku, supplier, delivered, imageUrl, department }, setProductData ] = useReducer( handleProductData, { name: '', description: '', price: 0, stock: 0, sku: '', supplier: '', delivered: 0, imageUrl: '', department: ''} )

    const { addProduct } = useInventory();

    const handleAdd = (e) => {
        e.preventDefault();
        addProduct({ name, price, description, stock, sku, supplier, delivered, imageUrl, department });
    }
    
    return <section>
        <form>
            <label>
                Department: 
                <select required onChange={ e => setProductData({ type: 'department', value:e.target.value }) } >
                    <option value='' > Select Department </option>
                    <option value='Kitchen'> Kitchen </option>
                    <option value='Clothing'> Clothing </option>
                    <option value='Toys'> Toys </option>
                </select>
            </label>
            <label>
                Name: 
                <input type='text' value={name} onChange={ e => setProductData({ type: 'name', value:e.target.value }) } required />
            </label>
            <label>
                Description: 
                <input type='text' value={description} onChange={ e => setProductData({ type: 'description', value:e.target.value }) } required />
            </label>
            <label>
                Price: 
                <input type='number' min={0} value={price} onChange={ e => setProductData({ type: 'price', value:Number(e.target.value) }) } required />
            </label>
            <label>
                Stock:
                <input type='number' min={0} value={stock} onChange={ e => setProductData({ type: 'stock', value:Number(e.target.value) }) } required />
            </label>
            <label>
                SKU:
                <input type='text' required value={sku} onChange={ e => setProductData({ type: 'sku', value:e.target.value }) } />
            </label>
            <label>
                Supplier: 
                <input type='text' required value={supplier} onChange={ e => setProductData({ type: 'supplier', value:e.target.value }) } />
            </label>
            <label>
                Delivered:
                <input type='number' value={0} readOnly />
            </label>
            <label>
                ImageUrl:
                <input type='text' required value={imageUrl} onChange={ e => setProductData({ type: 'imageUrl', value:e.target.value }) } />
            </label>
            <button onClick={ e => handleAdd(e) } > Add Product </button>
        </form>
    </section>
}