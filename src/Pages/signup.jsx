import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authcontext/authcontext";

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [departmentname, setdepartmentname] = useState('');
    const { departmentNames } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (password !== confirmPassword) {
            alert("Password and confirm password do not match");
            return;
        }

        try {

            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("department", departmentname);
            if (profilePic) {
                formData.append("profileimage", profilePic);
            }


            const response = await axios.post("http://localhost:5800/api/auth/signup", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            navigate("/");

        } catch (error) {
            console.error("Signup error:", error);
            setErrorMsg(error.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div className="container-fluid bg-primary min-vh-100 d-flex justify-content-center align-items-center">
            <div className="bg-white p-4 rounded shadow" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center text-primary mb-4">Welcome to Signup</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group mb-3 text-start">
                        <label htmlFor="name">Enter the name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-3 text-start">
                        <label htmlFor="email">Enter your email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="deparment">Enter the Deparment</label>
                        
                        <select id="department"
                            className="form-select" value={departmentname}
                            onChange={(e) => setdepartmentname(e.target.value)}
                            required

                        >
                            <option value=""  >Select Department   </option>
                            {departmentNames.map((dept) => (
                                <option key={dept._id} value={dept.name}>
                                    {dept.name}
                                </option>))}

                        </select>


                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="password">Enter your password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="confirmPassword">Confirm password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="addpic my-3">
                        <label htmlFor="addpic">Add Profile Picture</label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setProfilePic(e.target.files[0])}
                        />
                    </div>

                    <button className="btn btn-danger w-100" type="submit">
                        Register New User
                    </button>

                    {errorMsg && <p className="text-danger mt-2">{errorMsg}</p>}
                </form>
            </div>
        </div>
    );
};

export default Signup;
