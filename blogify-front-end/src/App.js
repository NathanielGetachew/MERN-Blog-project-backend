import { BrowserRouter,Routes,Route }     from "react-router-dom"
import { useSelector } from "react-redux"
import Homepage from "./Component/HomePage/Homepage"
import Login from "./Component/Users/Login"
import UserProfile from "./Component/Users/UserProfile"
import PublicNavBar from "./Component/Navbar/PublicNavBar"
import PrivateNavbar from "./Component/Navbar/PrivateNavbar"





export default function App() {
  //! get the login user from the state
  const {userAuth} = useSelector((state)=>state?.users)
  const isLoggedin = userAuth?.userInfo?.token
   return (
<BrowserRouter>
{/* Navbar here */}
{isLoggedin ? <PrivateNavbar/>: <PublicNavBar/>} 
<Routes>
  <Route path ="" element={<Homepage/>}></Route>
    <Route path ="/login" element={<Login/>}></Route>
    {/* profile */}
    <Route path ="/user-profile" element={<UserProfile/>}></Route>



    
  </Routes>
</BrowserRouter>
  )
}

