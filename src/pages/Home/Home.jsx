import { NavLink, Routes, Route } from 'react-router-dom';

import { Dashboard } from '../Dashboard/Dashboard';
import { Departments } from '../Departments/Departments';
import { Products } from '../Products/Products';
import { NewProduct } from '../NewProduct/NewProduct';

export const Home = () => {

    return <div className='main-div' >
        <aside className='aside' >
            <ul>
                <li> <NavLink to='/' style={ ({ isActive })=> ({ color: isActive ? 'white' : 'rgb(178, 176, 176)' }) } > Dashboard </NavLink> </li>
                <li> <NavLink to='/departments' style={ ({ isActive })=> ({ color: isActive ? 'white' : 'rgb(178, 176, 176)' }) } > Departments </NavLink> </li>
                <li> <NavLink to='/products' style={ ({ isActive })=> ({ color: isActive ? 'white' : 'rgb(178, 176, 176)' }) } > Products </NavLink> </li>
            </ul>
        </aside>
        <main className='main' >
            <Routes>
                <Route path='/' element={ <Dashboard /> } />
                <Route path='/departments' element={ <Departments /> } />
                <Route path='/products' element={ <Products /> } />
                <Route path='/newProduct' element={ <NewProduct /> } />
            </Routes>
        </main>
    </div>
}