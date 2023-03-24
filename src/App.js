import logo from './logo.svg';
import './App.css';
import Dasboard from './components/dashboard/Dasboard';
import { Routes, Route, useNavigate } from "react-router-dom"
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Mobile from './components/mobiles/Mobile';
import Detailmobile from './components/detailmobile/Detailmobile';
import Mainhome from './components/mainhome/Mainhome';
import Admindash from './components/admin/admindash/Admindash';
import Adminmobiles from './components/admin/mobiles/Adminmobiles';
import Addmobile from './components/admin/addmobile/Addmobile';
import Orders from './components/admin/orders/Orders';
import Customers from './components/admin/customers/Customers';
import Login from './loginpage/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase-config/Firebase-config';
import { useEffect, useState } from 'react';
import Protected from './components/admin/protected/Protected';

function App() {
  // const navigate = useNavigate();
  // const [isLogIn, setIsLogIn] = useState(false);
  // console.log(isLogIn);

  // // useEffect(() => {
  // //   const unsub = onAuthStateChanged(auth, (user) => {
  // //     setIsLogIn(user);
  // //   });
  // //   return () => {
  // //     unsub();
  // //   }
  // // }, []);
  // const Redirect = () =>{
  //   return navigate('/admin')
  // }
  return (
    <div className='container-fluid'>
      <Routes>
        <Route path="/" element={<Mainhome />}>
          <Route path="/" element={<Dasboard />} />
          <Route path="/mobile/:id" element={<Detailmobile />} />
          {/* admin routes */}
          <Route path="/dashboard" element={<Admindash />
          } />
          <Route path="/mobiles" element={
            <Protected>
              <Adminmobiles />
            </Protected>
          } />
          <Route path="/add-mobile" element={
            <Protected>
              <Addmobile />
            </Protected>
          } />
          <Route path="/orders" element={
            <Protected>
              <Orders />
            </Protected>
          } />
          <Route path="/customers" element={
            <Protected>
              <Customers />
            </Protected>
          } />
        </Route>

        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="mobile" element={<Mobile />} />
        <Route path="admin" element={<Login />} />
      </Routes>

    </div>
  );
}

export default App;
