import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from '../pages/home';
import Login from '../pages/Login'
import Register from '../pages/register'
import UserProfile from '../pages/user';
import ForgotPassword from '../pages/forgot'
import Forgot_key from '../pages/forgot_key';

function App() {
  

  return (
    <>
      <Router>
          <Routes>
              <Route path="/home" element={<Homepage/>} />   
              <Route path='/' element = {<Login/>} />
              <Route path='register' element = {<Register />} />
              <Route path='/profile' element = {<UserProfile/>} />
              <Route path='/forgot-password' element= {<ForgotPassword/>} />
              <Route path='/forgot-password/:key' element = {<Forgot_key />} />
          </Routes>
      </Router>
    </>
  )
}

export default App;
