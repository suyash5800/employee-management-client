// Department CSS is applied globally

import { useEmployee } from "../../authcontext/employeefetchcontext";
import { useState } from "react";
import EmpCardInfo from "./Dashboard-Models/Employee-model/empCardInfo";
import EmpInfoEdit from "./Dashboard-Models/Employee-model/emInfoEdit";
import EmpAddCard from "./Dashboard-Models/Employee-model/empaddcard";

const EmpManagement = () => {
    const { tableData, employeeCount , deleteEmp } = useEmployee();

    const [showCardModel, setshowCardModel] = useState(false);
    const [showEditModel, setshowEditModel] = useState(false);
    const [selectEmployeee, setselectEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = tableData.filter((employee) => {
        const search = searchTerm.toLowerCase();
        return (
            employee.name.toLowerCase().includes(search) ||
            employee.email.toLowerCase().includes(search) ||
            (employee.department && employee.department.toLowerCase().includes(search))
        );
    });

    return (
        <div className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <h3><b>Maintain Employees Records</b></h3>
                    </div>
                    <div className="col-6 text-end">
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addEmployeeModal">
                            Add New Employee
                        </button>
                    </div>
                </div>

        
                <div className="row my-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name, email or department"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="row table-container table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    <table className="styled-table" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Profile</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((d, index) => (
                                <tr key={d._id}>
                                    <td>{index + 1}</td>
                                    <td>{d.name}</td>
                                    <td>{d.email}</td>
                                    <td>{d.department || "No Department"}</td>
                                    <td className="text-center">
                                        {d.profileimage ? (
                                            <img
                                                src={`http://localhost:5800/${d.profileimage.replace(/\\/g, "/")}`}
                                                alt="Profile"
                                                width="70"
                                                height="50"
                                                style={{ borderRadius: "50%", objectFit: "cover" }}
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td>
                                        <div className="gap-3 d-flex">
                                            <button className="btn btn-success" onClick={() => { setselectEmployee(d); setshowCardModel(true); }}>View</button>
                                            <button className="btn btn-warning" onClick={() => { setselectEmployee(d); setshowEditModel(true); }}>Edit</button>
                                            <button className="btn btn-danger" onClick={()=>{deleteEmp(d._id,d.name)}}>Delete</button>
                                            <button className="btn btn-primary">Leave</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h4>Total Employee: {employeeCount}</h4>
            </div>

            {showCardModel && (
                <div className="custom-modal">
                    <EmpCardInfo employee={selectEmployeee} setshowCardModel={setshowCardModel} />
                </div>
            )}

            {showEditModel && (
                <div className="custom-modal">
                    <EmpInfoEdit employee={selectEmployeee} setshowEditModel={setshowEditModel} />
                </div>
            )}

            <EmpAddCard />
        </div>
    );
};


export default EmpManagement;
