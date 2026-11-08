import { Routes,Route, Navigate } from 'react-router-dom'
// import Home from './Home'
import AdminHome from './Home/AdminHome'
import CustomerHome from './Home/CustomerHome'
import Products from './Products'
import Orders from './Orders'
import Users from './Users'
import MyOrders from './MyOrders'
import {useAuth} from '../../../context/Auth'
const index = () => {
  const {user}=useAuth();
  return (
    <Routes>
        <Route path='/' element={(user.role==="customer")? <CustomerHome/>:<AdminHome/>}></Route>
        <Route path='products/*' element={(user.role==="admin" || user.role==="superAdmin")?<Products/>: <Navigate to="/dashboard" replace/>}></Route>
        <Route path='orders' element={(user.role==="admin" || user.role==="superAdmin")?<Orders/>: <Navigate to="/dashboard" replace/>}></Route>
        <Route path='users' element={(user.role==="admin" || user.role==="superAdmin")?<Users/>: <Navigate to="/dashboard" replace/>}></Route>
        <Route path='my-orders' element={(user.role==="customer")?<MyOrders/>: <Navigate to="/dashboard/orders" replace/>}></Route>
    </Routes>
  )
}

export default index