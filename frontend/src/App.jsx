import {BrowserRouter,Routes,Route, useParams} from 'react-router-dom';
import SignUp from './components/Signup/SignUp';
import Login from './components/login/Login';
import Home from './components/Home/Home';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPass from './components/RestPass/ResetPass';
import Dashboard from './components/Dashboard/Dashboard';


function App() { 
const {username} = useParams();
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/forgotpass' element={<ForgotPassword />}></Route>
          <Route path='/resetpass/:token' element={<ResetPass />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
