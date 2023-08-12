import { useInventory } from "../../context/InventoryContext"

export const Departments = () => {

    const { navigate } = useInventory();

    return <section>
        <div onClick={ () => navigate({ pathname: '/products', search: '?department=Kitchen' }) } >  Kitchen  </div>
        <div onClick={ () => navigate({ pathname: '/products', search: '?department=Clothing' }) } >  Clothing  </div>
        <div onClick={ () => navigate({ pathname: '/products', search: '?department=Toys' }) } >  Toys  </div>
    </section>
}