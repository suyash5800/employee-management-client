import { useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../authcontext/authcontext.jsx";
import DashboardLayout from "../Layout/DashboardLayout";

// Import dashboard pages
import DashboardHome from "../Dashboard-admin/Dashboard-pages/DashboardHome.jsx";
import Departments from "../Dashboard-admin/Dashboard-pages/Deparment.jsx";
import EmpManagement from "../Dashboard-admin/Dashboard-pages/Employee.jsx";
import Leaves from "../Dashboard-admin/Dashboard-pages/Leaves.jsx";
import Salary from "../Dashboard-admin/Dashboard-pages/Salary.jsx";
import Setting from "../Dashboard-admin/Dashboard-pages/Setting.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <DashboardLayout>
      <Routes>
        <Route path="dash-home" element={<DashboardHome />} />
        <Route path="departments" element={<Departments />} />
        <Route path="employees" element={<EmpManagement />} />
        <Route path="leaves" element={<Leaves />} />
        <Route path="salary" element={<Salary />} />
        <Route path="settings" element={<Setting />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
