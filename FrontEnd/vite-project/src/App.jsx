import React from 'react'
import {BrowserRouter ,Router,Route,Routes} from 'react-router-dom'
import Details from './Details'
import AllProducts from './AllProducts'
import Fetch from './Fetch'

const App = () => {
  return (
   <BrowserRouter>

    <Routes>
      
      <Route path='/product/:id' element={<Details/>}> </Route>
      <Route path='/'  element={<AllProducts/>}></Route>
      <Route path='/' element={<Fetch/>}> </Route>
    </Routes>
 
   </BrowserRouter>
  )
}

export default App







