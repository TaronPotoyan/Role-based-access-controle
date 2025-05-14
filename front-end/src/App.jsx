import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from '../pages/home';
import Login from '../pages/Login'
import Register from '../pages/register'
import UserProfile from '../pages/user';

function App() {
  

  return (
    <>
      <Router>
          <Routes>
             <Route path="/home" element={<Homepage/>} />   
             <Route path='/' element = {<Login/>} />
             <Route path='register' element = {<Register />} />
              <Route path='/profile' element = {<UserProfile/>} />
          </Routes>
      </Router>
    </>
  )
}

export default App;
