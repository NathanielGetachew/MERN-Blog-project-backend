import { BrowserRouter,Routes,Route }     from "react-router-dom"
import Homepage from "./Component/HomePage/Homepage"
import Login from "./Component/HomePage/Users/Login"



export default function App() {
   return (
<BrowserRouter>
  <Routes>
    <Route path ="" element={<Homepage/>}></Route>
    <Route path ="/login" element={<Login/>}></Route>


    
  </Routes>
</BrowserRouter>
  )
}

