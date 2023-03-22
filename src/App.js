import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Dasboard from './components/dashboard/Dasboard';
import { Routes, Route } from "react-router-dom"
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

function App() {
  return (
    <div className='container-fluid'>
      <Routes>
        <Route path="/" element={<Mainhome />}>          
          <Route path="/" element={<Dasboard />} />
          <Route path="/mobile/:id" element={<Detailmobile />} />
          <Route path="/dashboard" element={<Admindash />} />
          <Route path="/mobiles" element={<Adminmobiles />} />
          <Route path="/add-mobile" element={<Addmobile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
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
