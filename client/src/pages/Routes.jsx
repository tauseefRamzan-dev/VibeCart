import { Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import Cart from './Frontend/Cart'
import Checkout from './Frontend/Checkout'
import {useAuth} from "../context/Auth"
import { Navigate } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'
import PageNotFound from '../components/PageNotFound'
const index = () => {
  const {isAuth}=useAuth();
  return (
    <>
    <ScrollToTop/>
 <Routes>
    <Route path="/*" element={<Frontend/>}></Route>
    <Route path='auth/*' element={(!isAuth)?<Auth/> : <Navigate to="/" replace/> }></Route>
    <Route path='cart' element={<Cart/>}></Route>
    <Route path='checkout' element={(isAuth)?<Checkout/> : <Navigate to="/auth/login" replace/> }></Route>
    <Route path='*' element={<PageNotFound/>}></Route>
 </Routes>
    </>
  )
}

export default index