import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Authentication/Login';
import Signup from './Pages/Authentication/Signup';
import AddContact from './Pages/Home/AddContact';
import ContactDetails from './Pages/Home/ContactDetails';
import Contacts from './Pages/Home/Contacts';
import FreqeuntlyUsed from './Pages/Home/FreqeuntlyUsed';
import Home from './Pages/Home/Home';
import UpdateContact from './Pages/Home/UpdateContact';
import Footer from './Pages/Shared/Footer';
import Navbar from './Pages/Shared/Navbar';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Home />}>
          <Route index element={<Contacts />} />
          <Route path='/frequentlyUsed' element={<FreqeuntlyUsed />} />
          <Route path='/addContact' element={<AddContact />} />
          <Route path='/contactDetails/:_id' element={<ContactDetails />} />
          <Route path='/updateContact/:_id' element={<UpdateContact />} />
        </Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
