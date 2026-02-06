import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../authcontext/authcontext";
import { useEmployee } from "../../../../authcontext/employeefetchcontext";

const EmpInfoEdit = ({ setshowEditModel, employee }) => {
    const {fetchemployee}= useEmployee();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "",
        password: "",
        confirmpassword: "",
        profileimage: null
    });
    const { departmentNames } = useAuth();

    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name || "",
                email: employee.email || "",
                department: employee.department,
                password: "",
                confirmpassword: "",
                profileimage: null
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profileimage") {
            setFormData({ ...formData, profileimage: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchemployee();

        // Get token from localStorage (adjust if you're storing it elsewhere)
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Session expired. Please log in again.");
            return;
        }

        if (formData.password !== formData.confirmpassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const updateData = new FormData();
            updateData.append("name", formData.name);
            updateData.append("email", formData.email);
            updateData.append("department", formData.department);

            if (formData.password.trim() !== "") {
                updateData.append("password", formData.password);
            }

            if (formData.profileimage) {
                updateData.append("profileimage", formData.profileimage);
            }

            await axios.put(
                `http://localhost:5800/api/auth/updateemployee/${employee._id}`,
                updateData,
                {
                    headers: {

                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Employee updated successfully!");
            setshowEditModel(false);
        } catch (error) {
            console.error("Error updating employee", error);
            console.error("Error updating employee:", error.response?.data || error.message);
        }
    };

    return (
        <div className="container py-4">
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white" style={{ maxWidth: "600px", margin: "0 auto" }}>
                <h4 className="mb-4 text-center">Edit Employee Info</h4>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={formData.name} name="name" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" value={formData.email} name="email" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="department" className="form-label">Department</label>
                    
                    <select className="form-select" name="department" value={formData.department} onChange={handleChange} required>
                        <option value="">Select department</option>
                        {departmentNames.map((dept) => (
                            <option key={dept._id} value={dept.name}>
                                {dept.name}
                            </option>
                        ))}


                    </select>




                   
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" name="confirmpassword" value={formData.confirmpassword} onChange={handleChange} />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="profileimage" className="form-label">Profile Picture</label>
                    <input type="file" className="form-control" accept="image/*" name="profileimage" onChange={handleChange} />
                </div>

                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-success px-4">Update</button>
                    <button type="button" className="btn btn-outline-danger px-4" onClick={() => setshowEditModel(false)}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EmpInfoEdit;
