import Login from './Pages/login';
import Signup from './Pages/signup';

import Empdashboard from './Pages/DashboardEmp';
import Dashboard from './Pages/DashboardAdmin';
import { Route, Routes } from 'react-router-dom';


function App() {


  return (
    <>

      <Routes>
        <Route path="/" element={<Login />} />
  
        <Route path="/Employee-DashBoard/*" element={<Empdashboard />} />
        <Route path="/DashboardAdmin/*" element={<Dashboard />} />
        <Route path="/newuser" element={<Signup />} />
      </Routes>


    </>
  )
}

export default App
