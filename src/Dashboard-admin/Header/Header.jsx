import { useAuth } from "../../authcontext/authcontext";


const Header = () => {
 const {logout} = useAuth();


  return (
    <nav className="navbar navbar-expand bg-success shadow-sm px-4">
      <span className="navbar-brand mb-0 h1 text-white">My Dashboard</span>

      <div className="ms-auto">
        <button className="btn btn-danger " onClick={logout}>Logout</button>
      </div>
    </nav>

  );
};

export default Header;
