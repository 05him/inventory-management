import { useReducer, useEffect } from 'react';

import { data } from '../data';

const handleInventory = ( data, action ) => {
    switch(action.type){
        case 'addItem' : return({...data, inventoryData: [ ...data.inventoryData, { ...action.item } ]});
        case 'add-default-data': return({ ...data, inventoryData: action.data })
        default: throw Error(`some error occured in handeling ${action.type}`);
    }
}


export const useInventoryReducer = () => {

    useEffect( () => {
        console.log(localStorage.getItem('inventoryData'))
        if(localStorage.getItem('inventoryData')) {
            console.log(localStorage.getItem('inventoryData'));
            // setInventory({ type: 'add-default-data', data:  })
        }
        else{
            console.log('else')
            setInventory({ type: 'add-default-data', data: data })
        }
        console.log(localStorage.getItem('inventoryData'))
    } ,[] )

    const [ inventory, setInventory ] = useReducer( handleInventory, { inventoryData: [ ] } );
    
    const updateLocal = () => localStorage.setItem('inventoryData', inventory.inventoryData );

    updateLocal();

    const addProduct = prodObj => setInventory({ type:'addItem', item: prodObj });

    return ( {inventory, addProduct} )
}