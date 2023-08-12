import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useInventory } from "../../context/InventoryContext";

export const Products = () => {

    useEffect( ()=> {
        const departmentValue =  searchParams.get('department');
        const onlyLowStockValue = searchParams.get('onlyLowStock');
        const sortValue = searchParams.get('sortBy');
        if(departmentValue){
            setSelectedDepartment(departmentValue)
        }
        if(onlyLowStockValue){
            setShowLowStockOnly(JSON.parse(onlyLowStockValue));
        }
        if(sortValue){
            setSortBy(sortValue);
        }
    }  ,[] )
    
    const [ searchParams, setSearchParams ] = useSearchParams('department', 'sortBy', 'onlyLowStock');
    const [ selectedDepartment, setSelectedDepartment ] = useState('All');
    const [ showLowStockOnly, setShowLowStockOnly ] = useState(false);
    const [ sortBy, setSortBy ] = useState('Name');
    const { inventoryData, navigate } = useInventory();

    const handleSort = (a,b) => {
        switch(sortBy){
            case 'Name' : { if(a.name>b.name) return 1; else return -1 }
            case 'Price' : { if(a.price>b.price) return 1; else return -1 }
            case 'Stock' : { if(a.stock>b.stock) return 1; else return -1 }

            default : throw Error(`some error occured while sorting in ${sortBy}`);
        }
    }

    const itemsToShow = inventoryData.filter( ({ stock, department }) => (selectedDepartment==='All' ? true : department===selectedDepartment) && (showLowStockOnly ? stock<=10 : true) ).toSorted( (a,b) => handleSort(a,b))

    const handleDepartmentChange = newDepartment => {
        setSearchParams(obj => ({ ...obj, department : newDepartment}));
        setSelectedDepartment(newDepartment);
    }

    const handleLowStockOnly = () => {
        setShowLowStockOnly( value => !value );
        setSearchParams( obj => ({ ...obj, onlyLowStock: !showLowStockOnly }));
        
    }

    const handleSortChange = sortBy => {
        setSearchParams( obj => ({ ...obj, sortBy: sortBy }));
        setSortBy(sortBy);
    }

    return <section className="section" >
        <div className="products-header" >
            <div> Prodcuts  </div>
            <div> <label> Department : <select value={selectedDepartment} onChange={ e => handleDepartmentChange(e.target.value) } >
                <option value='All' > All Departments </option>
                <option value='Kitchen' > Kitchen </option>
                <option value='Clothing' > Clothing </option>
                <option value='Toys' > Toys </option>
                </select> </label> </div>
            <div> <label> Show Low Stock Items <input type='checkbox' onChange={ handleLowStockOnly } checked={showLowStockOnly} /> </label> </div>
            <div> <label> Sort by : <select value={sortBy} onChange={ e => handleSortChange(e.target.value) } > 
                <option value='Name' > Name </option>
                <option value='Price' > Price </option>
                <option value='Stock' > Stock </option>
                </select> </label> </div>
            <div> <button onClick={ () => navigate('/newProduct') } > Add New Product </button> </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th> Image </th>
                    <th> Name </th>
                    <th> Description </th>
                    <th> Price </th>
                    <th> Stock </th>
                    <th> Supplier </th>
                </tr>
            </thead>
            {
                itemsToShow?.map( ({name, price, description, stock, supplier, imageUrl}) => <tr> 
                    <td className="prod-img" > <img src={imageUrl} alt={name} /> </td>
                    <td className="prod-name" > {name} </td>
                    <td className="prod-desc" > {description} </td>
                    <td className="prod-price" > {price} </td>
                    <td className="prod-stock" > {stock} </td>
                    <td className="prod-supplier" > {supplier} </td>
                </tr> )
            }
        </table>

    </section>
}