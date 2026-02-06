import axios from "axios";
import { useState, useContext, useEffect, createContext, useCallback } from "react";
import { useLocation } from "react-router-dom";

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
    const [tableData, setTableData] = useState([]);
    const [employeeCount, setEmployeeCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();

    const fetchemployee = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5800/api/auth/employee");
            const filteredemployee = res.data.filter(user => user.role === "employee");
            setTableData(filteredemployee);
            setEmployeeCount(filteredemployee.length);
            setError(null);
        } catch (error) {
            console.error("Failed to fetch employees:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteEmp = async (_id,name) => {
        try {
            await axios.delete(`http://localhost:5800/api/auth/deletedEmp/${_id}`);
            await fetchemployee();
            console.log("Employee deleted!");
            alert(`Employes is Deleted \nName: ${name}`);
        } catch (error) {
            console.error("Failed to delete employee:", error);
        }
    };


    useEffect(() => {
        fetchemployee();
    }, [location, fetchemployee]);

    return (
        <EmployeeContext.Provider value={{ tableData, employeeCount, fetchemployee, deleteEmp, loading, error }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployee = () => useContext(EmployeeContext);
export default EmployeeProvider;
