import { useInventory } from "../../context/InventoryContext"


export const Dashboard= () => {

    const { lowStockItems, totalStock, totalDelivered } = useInventory();

    return <section>
        <div> Total Items : { totalStock } </div>
        <div> Delivered : { totalDelivered } </div>
        <div> Low Stock : { lowStockItems } </div>
    </section>
}