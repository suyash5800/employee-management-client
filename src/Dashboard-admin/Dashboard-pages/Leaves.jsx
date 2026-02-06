
import "./Dashboard_pages_css/Department.css";
import { useLeaves } from "../../authcontext/leavesContext.jsx";
import { useState } from "react";
import axios from "axios";

const Leaves = () => {
  const { leavesData, TotalLeaves } = useLeaves();
  

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  };

  const handleEditleave = async ({ id, status }) => {

    try {
      const newstatus = "accepted";
      await axios.put(`http://localhost:5800/api/auth/leaveUpdate/${id}`, { status: newstatus });

      console.log("leave is aproved ");
      alert("leave approved");
    } catch (error) {
      console.log("error in handle edit");
      alert(error);

    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Total Leaves = {TotalLeaves}</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Total Days</th>
            <th>Handle Leaves</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(leavesData) && leavesData.length > 0 ? (
            leavesData.map((leave) => {
              const totalDays =
                (new Date(leave.leave_to) - new Date(leave.leave_from)) / (1000 * 60 * 60 * 24) + 1;
              return (
                <tr key={leave._id}>
                  <td>{leave.emp_name}</td>
                  <td>{leave.leave_type}</td>
                  <td>{formatDate(leave.leave_from)}</td>
                  <td>{formatDate(leave.leave_to)}</td>
                  <td>{leave.status}</td>
                  <td>{totalDays} Days</td>
                  <td><button className="btn-primary btn m-2" value=""
                    onClick={() => {
                      handleEditleave({ id: leave._id, status: leave.status });

                    }}>Approved</button>
                    <button className="btn btn-danger text white ">Reject</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">No leave records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaves;
