
import Sidebar from "../Dashboard-admin/Sidebar/sidebar.jsx";
import Header from "../Dashboard-admin/Header/Header.jsx";


const DashboardLayout = ({ children }) => {
  return (<>

    <div className=" w-100 flex-grow-1">
      <Header />

    </div>
    <div className="d-flex">
      <Sidebar />
      <main className=" container-fluid p-4" style={{background:"	#f2f2f291"}}>
        {children}
      </main>
    </div>
  </>
  );
};

export default DashboardLayout;
