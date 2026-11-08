import { Route, Routes } from 'react-router-dom'
import All from './All'
import AddProduct from './AddProduct'
import Edit from './Edit'
const index = () => {
  return (
    <Routes>
      <Route path='/' element={<All/>}>

      </Route>
      <Route path='/add-product' element={<AddProduct/>}>
              
      </Route>
      <Route path='/edit-product/:id' element={<Edit/>}>
              
      </Route>
    </Routes>
  )
}

export default index