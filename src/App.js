import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Authentication/Login';
import RequiredAuth from './Pages/Authentication/RequiredAuth';
import Signup from './Pages/Authentication/Signup';
import AddContact from './Pages/Home/AddContact';
import ContactDetails from './Pages/Home/ContactDetails';
import Contacts from './Pages/Home/Contacts';
import FreqeuntlyUsed from './Pages/Home/FreqeuntlyUsed';
import Home from './Pages/Home/Home';
import AllLabel from './Pages/Home/Label/AllLabel';
import LabelContacts from './Pages/Home/Label/LabelContacts';
import Profile from './Pages/Home/Profile/Profile';
import UpdateProfile from './Pages/Home/Profile/UpdateProfile';
import Trash from './Pages/Home/Trash';
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
        <Route path='/profile' element={<Profile />} />
        <Route path='/updateProfile' element={<UpdateProfile />} />
        <Route path='/' element={<RequiredAuth><Home /></RequiredAuth>}>
          <Route index element={<Contacts />} />
          <Route path='/frequentlyUsed' element={<FreqeuntlyUsed />} />
          <Route path='/trash' element={<Trash />} />
          <Route path='/addContact' element={<AddContact />} />
          <Route path='/contactDetails/:_id' element={<ContactDetails />} />
          <Route path='/updateContact/:_id' element={<UpdateContact />} />
          <Route path='/allLabel' element={<RequiredAuth><AllLabel /></RequiredAuth>}></Route>
          <Route path='/labelContacts' element={<RequiredAuth><LabelContacts /></RequiredAuth>} />
        </Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
