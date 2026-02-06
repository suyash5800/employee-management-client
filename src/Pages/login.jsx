import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from '../authcontext/authcontext';

const Login = () => {
 

    useEffect(() => {
        const openFullscreen = () => {
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        };

        document.addEventListener("click", openFullscreen, { once: true });
    }, []);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {


        e.preventDefault();
        setErrorMsg('');

        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5800/api/auth/login", { email, password });
           
            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                
                if (response.data.user.role === "admin") {
                    navigate("/DashboardAdmin/dash-home");
                } else if (response.data.user.role === "employee") {
                    navigate("/Employee-DashBoard");
                } else {
                    navigate("/")
                }

            }






        } catch (error) {
            console.error("Login error:", error);
            setErrorMsg(error.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid bg-primary min-vh-100 d-flex align-items-center justify-content-center">
            <div className="col-md-6 text-center bg-light p-4 rounded shadow">
                <h1 className="mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group my-3 text-start">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group my-3 text-start">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="form-control"
                            required
                            autoComplete="off" 
                        />
                    </div>

                    {errorMsg && <p className="text-danger mt-2">{errorMsg}</p>}

                    <div className="d-flex justify-content-center mt-4">
                        <button type="submit" className="btn btn-danger me-3" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => navigate("/newuser")}
                        >
                            Sign up ??
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
