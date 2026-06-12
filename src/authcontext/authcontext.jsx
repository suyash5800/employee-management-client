import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UserContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [departmentCount, setDepartmentCount] = useState(0);
    const [departmentNames, setdepartmentNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchdeparmentscount = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/department`);
            setDepartmentCount(res.data.length);
            setdepartmentNames(res.data);
            console.log("fetching data is successfully from authcontext");
        } catch (error) {
            console.log("failed to fetch department count");
        }
    };




    useEffect(() => {
        fetchdeparmentscount();
    }, [location]);


    useEffect(() => {


        const verifyUser = async () => {
            const token = localStorage.getItem("token");
            console.log("getting token");

            try {
                if (token) {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.data.success) {
                        setUser(response.data.user);
                    } else {
                        setUser(null);
                    }
                } else {

                    if (
                        location.pathname !== "/login" &&
                        location.pathname !== "/newuser"
                    ) {
                        navigate("/");
                    }
                }
            } catch (error) {
                if (error.response) {
                    console.error("Verification failed:", error.response.data);

                    if (
                        location.pathname !== "/login" &&
                        location.pathname !== "/newuser"
                    ) {
                        // console.log("login falid , navigate to login ");
                        navigate("/");
                    }
                } else {
                    console.error("Network error or server down:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, [navigate, location.pathname]);

    const login = (userData, token) => {
        setUser(userData);

        if (token) {
            localStorage.setItem("token", token);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <UserContext.Provider value={{ user, login, logout, departmentCount, setDepartmentCount, departmentNames, fetchdeparmentscount, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);
export default AuthProvider;
