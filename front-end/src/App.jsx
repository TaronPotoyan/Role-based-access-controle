import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from '../pages/home';
import Login from '../pages/Login'
import Register from '../pages/register'
function App() {
  

  return (
    <>
      <Router>
          <Routes>
             <Route path="/home" element={<Homepage/>} />   
             <Route path='/' element = {<Login/>} />
             <Route path='register' element = {<Register />} />
             
          </Routes>
      </Router>
    </>
  )
}

export default App;
