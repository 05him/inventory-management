import { createContext, useContext } from "react"; 
import { useNavigate } from "react-router-dom";

import { useInventoryReducer } from "./InventoryReducer";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) =>  {

    const navigate = useNavigate();

    const { inventory, addProduct } = useInventoryReducer();

    const { inventoryData } = inventory;

    const totalStock = inventoryData.reduce( ( total, { stock } ) => total+stock , 0 );
    const totalDelivered = inventoryData.reduce( (total, { delivered }) => total+delivered, 0 );
    const lowStockItems = inventoryData.reduce( (total, { stock }) => stock<=10 ? total+1 : total , 0 );


    return <InventoryContext.Provider value={{ navigate, ...inventory, addProduct, totalStock, totalDelivered, lowStockItems }} >
        { children }
    </InventoryContext.Provider>
}

export const useInventory = () => useContext(InventoryContext);