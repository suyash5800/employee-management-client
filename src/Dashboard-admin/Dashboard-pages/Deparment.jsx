import "./Dashboard_pages_css/Department.css";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authcontext/authcontext";


const Departments = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModel, setshowEditModel] = useState(false);
 
  const [departments, setDepartments] = useState("");
  const [editData, seteditData] = useState(null);
  const {departmentNames,fetchdeparmentscount}= useAuth();



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5800/api/auth/department", { name: departments });
      setDepartments("");
      fetchdeparmentscount();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditData = async (e) => {
    e.preventDefault();
    if (!editData) return;
    try {
      await axios.put(`http://localhost:5800/api/auth/department/${editData._id}`, { name: departments });
      setshowEditModel(false);
      setDepartments("");
      seteditData(null);
     fetchdeparmentscount();
    } catch (error) {
      console.log("error in handle edit", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:5800/api/auth/department/${_id}`);
      fetchdeparmentscount();
    } catch (error) {
      console.log("Error deleting department", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6"><h3>Department Overview</h3></div>
        <div className="col-md-6 text-end"> 
           <button
          type="button"
          className="btn btn-primary w-50"
          value={""}
          onClick={() => setShowModal(true)}
        >
          Add New Record
        </button></div>
      </div>
      
      <div className="row table-container">
        <div className="col-lg-12">
          <div className="table-responsive-wrapper">
            <table className="styled-table" cellSpacing="0" cellPadding="10">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Departments</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {departmentNames.map((d, index) => (
                  <tr key={d._id}>
                    <td>{index + 1}</td>
                    <td>{d.name}</td>
                    <td>
                      <div className="w-100 gap-3 d-flex">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => {
                            setshowEditModel(true);
                            seteditData(d);
                            setDepartments(d.name);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(d._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td className="fs-4 text-center" colSpan={2}>
                    Total Departments: <b>{departmentNames.length}</b>
                  </td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Add New Department */}
      {showModal && (
        <div className="custom-modal">
          <div className="custom-modal-content">
            <h4>Add New Department</h4>
            <form
              className="form-controls bg-light rounded shadow-sm w-50 mx-auto mt-4"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="mb-3">
                <label htmlFor="departmentName" className="form-label fw-bold">
                  Department Name
                </label>
                <input
                  type="text"
                  id="departmentName"
                  name="name"
                  className="form-control"
                  placeholder="e.g., SalesDepartment"
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault();
                      alert("No spaces allowed. Use camelCase if needed.");
                    }
                  }}
                  onChange={(e) => setDepartments(e.target.value)}
                  value={departments}
                  required
                />
                <div className="form-text text-muted">
                  * No spaces allowed. Use camelCase (e.g., HumanResources).
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => {

                    setShowModal(false)
                  }}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-success" disabled={!departments.trim()}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Edit Department */}
      {showEditModel && (
        <div className="custom-modal">
          <div className="custom-modal-content">
            <h4>Edit Department</h4>
            <form className="form-controls w-50 mx-auto mt-4" onSubmit={handleEditData} noValidate>
              <label htmlFor="editDepartmentName" className="form-label">
                Edit name:
              </label>
              <input
                id="editDepartmentName"
                className="form-control"
                value={departments}
                onChange={(e) => setDepartments(e.target.value)}
                type="text"
                name="name"
                required
              />
              <div className="m-4 d-flex ms-2 gap-2">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => {
                    setshowEditModel(false)
                    setDepartments("");
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn bg-success text-white" disabled={!departments.trim()}>
                  Update record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
