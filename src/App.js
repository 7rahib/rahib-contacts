import { Route, Routes } from 'react-router-dom';
import './App.css';
import Contacts from './Pages/Home/Contacts';
import FreqeuntlyUsed from './Pages/Home/FreqeuntlyUsed';
import Home from './Pages/Home/Home';
import Footer from './Pages/Shared/Footer';
import Navbar from './Pages/Shared/Navbar';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<Contacts />} />
          <Route path='/frequentlyUsed' element={<FreqeuntlyUsed />} />
        </Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
