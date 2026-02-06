import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 

const UserContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [departmentCount, setDepartmentCount] = useState(0);
    const [departmentNames,setdepartmentNames]= useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchdeparmentscount = async () => {
        try {
            const res = await axios.get("http://localhost:5800/api/auth/department");
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

            try {
                if (token) {
                    const response = await axios.get("http://localhost:5173/api/auth/verify", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.data.success) {
                        setUser(response.data.user);
                    }
                } else {
                 
                    if (
                        location.pathname !== "/login" &&
                        location.pathname !== "/newuser"
                    )
                     {
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
                        navigate("/");
                    }
                } else {
                    console.error("Network error or server down:", error);
                }
            }
        };

        verifyUser();
    }, [navigate, location.pathname]); 

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <UserContext.Provider value={{ user, login, logout, departmentCount, setDepartmentCount , departmentNames , fetchdeparmentscount }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);
export default AuthProvider;
