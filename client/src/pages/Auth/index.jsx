import { Route, Routes } from 'react-router-dom'
import Login from './login'
import Register from './register'
import ForgetPassword from './forgetPassword'
const index = () => {
  return (
    <Routes>
      <Route path='login' element={<Login/>}></Route>
      <Route path='register' element={<Register/>}></Route>
      <Route path='forgetPassword' element={<ForgetPassword/>}></Route>
      <Route path='*' element={<div className='d-flex justify-content-center align-items-center'>Sorry, Page not found</div>}></Route>
    </Routes>
  )
}

export default index