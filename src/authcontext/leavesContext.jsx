
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const LeavesContext = createContext();

const LeavesProvider = ({ children } = {}) => {
  const [leavesData, setLeavesData] = useState([]);
  const [TotalLeaves, setTotalLeaves] = useState(0);
  const location = useLocation();

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:5800/api/auth/leavesGets");
      setLeavesData(res.data);
      setTotalLeaves(res.data.length);
    } catch (error) {
      console.error("Failed to fetch leaves:", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [location]);

  return (
    <LeavesContext.Provider value={{ fetchLeaves, leavesData, TotalLeaves }}>
      {children}
    </LeavesContext.Provider>
  );
};

export const useLeaves = () => useContext(LeavesContext);
export default LeavesProvider;
