import Header from './components/Header'
import Footer from './components/Footer'
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from  './screens/ProductScreen';
import Cart from './screens/Cart';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

//import {Drawer} from '@mui/material';

function App() {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
        <Container>
          <Routes>
        <Route path='/' element={<HomeScreen/>} exact/>
        <Route path='/product/:id' element={<ProductScreen/>}/>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/koszyk/:id?" element={<Cart />} />
          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
