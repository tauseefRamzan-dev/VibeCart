import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import Products from './Products'
import Product from './Product/product'
import Dashboard from './Dashboard'
import PageNotFound from '../../components/PageNotFound'
import Forbidden from '../../components/Forbidden.jsx'
import { useAuth } from '../../context/Auth'

const index = () => {
const {isAuth}=useAuth();
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='products' element={<Products/>}></Route>
        <Route path='about' element={<About/>}></Route>
        <Route path='contact' element={<Contact/>}></Route>
        <Route path="product/:id" element={<Product/>} ></Route>
        <Route 
          path="dashboard/*" 
          element={isAuth ? <Dashboard/> : <Forbidden/>} 
        ></Route>
        <Route path='*' element={<PageNotFound/>}></Route>
    </Routes>
  )
}

export default index