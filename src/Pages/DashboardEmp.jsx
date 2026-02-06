import { useAuth } from "../authcontext/authcontext.jsx";
import { Route, Routes, Link } from "react-router-dom";
import ApplyLeave from "../Dashboard-Employee/Dashboard-Pages/leaves.jsx";
import Content from "../Dashboard-Employee/Dashboard-Pages/mainContent.jsx";

const Empdashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="d-flex">
   
      <div className="bg-info text-white p-3 min-vh-100" style={{ width: '220px' }}>
        <h4>Employee Portal</h4>
        <ul className="nav flex-column mt-4">
         
          <li className="nav-item mb-2">
            <Link to="/Employee-DashBoard/main_page" className="nav-link text-white">Main Page</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/Employee-DashBoard/leave" className="nav-link text-white">Leaves Applying</Link>
          </li>
        </ul>
      </div>

    
      <div className="flex-grow-1">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light px-4" style={{ backgroundColor: '#00aaff' }}>
          <span className="navbar-brand text-white">Dashboard</span>
          <div className="ms-auto row">
            <div className="col-lg-6 ">
              <button className=" btn bg-danger text-white" onClick={logout}>Logout</button>
            </div>
            <div className="col-lg-6">
              <span className="text-white">Welcome, John Doe</span>
            </div>
          </div>
        </nav>

      
        <div className="p-4 bg-light min-vh-100">
          <Routes>
            <Route path="main_page" element={<Content />} />
            <Route path="leave" element={< ApplyLeave />} />
          
            { <Route path="*" element={<ApplyLeave/>} /> }
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Empdashboard;
