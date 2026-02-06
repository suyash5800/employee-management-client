import React, { useState } from "react";
import{ useLeaves} from "../../authcontext/leavesContext.jsx";

const ApplyLeave = () => {
const { TotalLeaves } = useLeaves();
  const [formData, setFormData] = useState({
    emp_name: "",
    leave_type: "casual",
    leave_from: "",
    leave_to: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Optional: POST to backend
    try {
      const res = await fetch("http://localhost:5800/api/auth/leaveRegistor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Leave applied successfully!");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Error submitting form.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Total Leaves = {TotalLeaves}</h1>
      <div className="card shadow p-4">
        <h3 className="text-primary mb-3">Apply for Leave</h3>
        <form onSubmit={handleSubmit}>
          {/* Employee Name */}
          <div className="mb-3">
            <label className="form-label">Employee Name</label>
            <input
              type="text"
              name="emp_name"
              className="form-control"
              placeholder="Enter your name"
              value={formData.emp_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Leave Type */}
          <div className="mb-3">
            <label className="form-label">Leave Type</label>
            <select
              name="leave_type"
              className="form-select"
              value={formData.leave_type}
              onChange={handleChange}
              required
            >
              <option value="casual">Casual</option>
              <option value="sick">Sick</option>
              <option value="earned">Earned</option>
              <option value="maternity">Maternity</option>
            </select>
          </div>

          {/* Leave From */}
          <div className="mb-3">
            <label className="form-label">Leave From</label>
            <input
              type="date"
              name="leave_from"
              className="form-control"
              value={formData.leave_from}
              onChange={handleChange}
              required
            />
          </div>

          {/* Leave To */}
          <div className="mb-3">
            <label className="form-label">Leave To</label>
            <input
              type="date"
              name="leave_to"
              className="form-control"
              value={formData.leave_to}
              onChange={handleChange}
              required
            />
          </div>

          {/* Reason */}
          <div className="mb-3">
            <label className="form-label">Reason (Optional)</label>
            <textarea
              name="reason"
              className="form-control"
              rows="3"
              placeholder="Why are you taking leave?"
              value={formData.reason}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Leave Request
          </button>
        </form>
      </div>

    </div>
  );
};

export default ApplyLeave;
