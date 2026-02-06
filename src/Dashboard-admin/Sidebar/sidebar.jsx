import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-dark text-white vh-100 p-3" style={{ width: '250px' }}>
            <h4>Dashboard</h4>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/DashboardAdmin/dash-home">
                        <i className="bi bi-clipboard-check-fill text-white fs-4 m-1"></i>
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/DashboardAdmin/employees">
                        <i className="bi bi-person-fill text-white fs-4 m-1"></i>
                        Employees
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/DashboardAdmin/departments">
                        <i className="bi bi-stack-overflow text-white fs-4 m-1"></i>
                        Departments
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/DashboardAdmin/leaves">
                        <i className="bi bi-incognito text-white fs-4 m-1"></i>
                        Leaves
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/DashboardAdmin/salary">
                        <i className="bi bi-currency-exchange text-white fs-4 m-1"></i>
                        Salary
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/DashboardAdmin/settings">
                        <i className="bi bi-sliders text-white fs-4 m-1"></i>
                        Settings
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
