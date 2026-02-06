import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../authcontext/authcontext";
import { useEmployee } from "../../../../authcontext/employeefetchcontext";

const EmpAddCard = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [errormsg, setErrorMsg] = useState("");
    const [profileimage, setprofileimage] = useState(null);
    const { fetchemployee } = useEmployee();
    const { departmentNames } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("")


        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("department", department);

            if (profileimage) {
                formData.append("profileimage", profileimage);
            }

            const response = await axios.post(
                "http://localhost:5800/api/auth/signup",
                formData
            );

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            alert("Employee added successfully!");


            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setDepartment("");
            setprofileimage(null);


            const modal = window.bootstrap.Modal.getOrCreateInstance(
                document.getElementById("addEmployeeModal")
            );
            modal.hide();
            fetchemployee();

        } catch (error) {
            console.error("Error during adding new member:", error);

            setErrorMsg(error.response?.data?.error || "adding falied Employee")
        }
    };

    const handlecancle = () => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setDepartment("");
        setErrorMsg("");
        setprofileimage("");
    }

    return (
        <div
            className="modal fade"
            id="addEmployeeModal"
            tabIndex="-1"
            aria-labelledby="addEmployeeModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title text-center" id="addEmployeeModalLabel">
                            Add New Employee
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>


                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">

                                <div className="col-md-6">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter name"
                                        required
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter password"
                                        required
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label className="form-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Enter confirm password"
                                        required
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label className="form-label">Department</label>
                                    <select
                                        className="form-select"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        required
                                    >
                                        <option value="">Select department</option>
                                        {departmentNames.map((dept) => (
                                            <option key={dept._id} value={dept.name}>
                                                {dept.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>


                                <div className="col-md-6">
                                    <label className="form-label">Profile Photo (Optional)</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={(e) => setprofileimage(e.target.files[0])}
                                    />
                                    <small className="text-muted">
                                        Accepted formats: JPG, PNG. Max size: 2MB.
                                    </small>
                                </div>
                            </div>


                            <div className="modal-footer justify-content-center d-flex mt-4">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={handlecancle}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Save Employee
                                </button>
                            </div>
                        </form>
                        {errormsg && <p className="text-danger fs-4"> {errormsg}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmpAddCard;
