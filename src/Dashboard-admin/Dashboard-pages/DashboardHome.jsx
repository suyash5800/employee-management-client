import { useAuth } from "../../authcontext/authcontext";
import { useEmployee } from "../../authcontext/employeefetchcontext";
import { useLeaves } from "../../authcontext/leavesContext";

const DashboardHome = () => {
  const { departmentCount } = useAuth();
  const { employeeCount } = useEmployee();
  const { TotalLeaves, leavesData } = useLeaves();

  const PendingLeaves = Array.isArray(leavesData)
    ? leavesData.filter((leave) => leave.status === "pending").length
    : 0;

  const ApprovedLeaves = Array.isArray(leavesData)
    ? leavesData.filter((leave) => leave.status === "accepted").length
    : 0;

  const RejectedLeaves = Array.isArray(leavesData)
    ? leavesData.filter((leave) => leave.status === "rejected").length
    : 0;

  return (
    <div className="container-fluid py-4 px-3 px-md-4">
      {/* Header */}
      <div className="mb-4">
        <div
          className="rounded-4 p-4 shadow-sm text-white"
          style={{
            background:
              "linear-gradient(135deg, #0d6efd 0%, #6610f2 55%, #6f42c1 100%)",
          }}
        >
          <h3 className="mb-1 fw-bold">Dashboard Overview</h3>
          <p className="mb-0 opacity-75">
            Quick summary of employees, departments and leave records.
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="row g-4">
        {/* Total Employees Card */}
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <p className="text-muted mb-1 fw-semibold">
                    Total Employees
                  </p>
                  <h2 className="fw-bold mb-0">{employeeCount}</h2>
                </div>

                <div
                  className="d-flex align-items-center justify-content-center rounded-4 text-primary"
                  style={{
                    width: "64px",
                    height: "64px",
                    background: "rgba(13, 110, 253, 0.12)",
                  }}
                >
                  <i className="bi bi-bookmark-heart-fill fs-2"></i>
                </div>
              </div>
            </div>

            <div
              style={{
                height: "5px",
                background: "linear-gradient(90deg, #0d6efd, #6ea8fe)",
              }}
            ></div>
          </div>
        </div>

        {/* Total Departments Card */}
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <p className="text-muted mb-1 fw-semibold">
                    Total Departments
                  </p>
                  <h2 className="fw-bold mb-0">{departmentCount}</h2>
                </div>

                <div
                  className="d-flex align-items-center justify-content-center rounded-4 text-success"
                  style={{
                    width: "64px",
                    height: "64px",
                    background: "rgba(25, 135, 84, 0.12)",
                  }}
                >
                  <i className="bi bi-building-fill-gear fs-2"></i>
                </div>
              </div>
            </div>

            <div
              style={{
                height: "5px",
                background: "linear-gradient(90deg, #198754, #75b798)",
              }}
            ></div>
          </div>
        </div>

        {/* Total Monthly Pay Card */}
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <p className="text-muted mb-1 fw-semibold">
                    Total Monthly Pay
                  </p>
                  <h2 className="fw-bold mb-0">$96500</h2>
                </div>

                <div
                  className="d-flex align-items-center justify-content-center rounded-4 text-danger"
                  style={{
                    width: "64px",
                    height: "64px",
                    background: "rgba(220, 53, 69, 0.12)",
                  }}
                >
                  <i className="bi bi-cash-coin fs-2"></i>
                </div>
              </div>
            </div>

            <div
              style={{
                height: "5px",
                background: "linear-gradient(90deg, #dc3545, #ea868f)",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Leaves Details */}
      <div className="mt-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
          <div>
            <h3 className="text-primary fw-bold mb-1">Leaves Details</h3>
            <p className="text-muted mb-0">
              Track applied, approved, pending and rejected leaves.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {/* Leaves Applied */}
          <div className="col-12 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle text-warning flex-shrink-0"
                    style={{
                      width: "60px",
                      height: "60px",
                      background: "rgba(255, 193, 7, 0.15)",
                    }}
                  >
                    <i className="bi bi-archive-fill fs-3"></i>
                  </div>

                  <div>
                    <p className="text-muted fw-semibold mb-1">
                      Leaves Applied
                    </p>
                    <h3 className="fw-bold mb-0">{TotalLeaves}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leaves Approved */}
          <div className="col-12 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle text-primary flex-shrink-0"
                    style={{
                      width: "60px",
                      height: "60px",
                      background: "rgba(13, 110, 253, 0.12)",
                    }}
                  >
                    <i className="bi bi-send-check-fill fs-3"></i>
                  </div>

                  <div>
                    <p className="text-muted fw-semibold mb-1">
                      Leaves Approved
                    </p>
                    <h3 className="fw-bold mb-0">{ApprovedLeaves}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leaves Pending */}
          <div className="col-12 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle text-info flex-shrink-0"
                    style={{
                      width: "60px",
                      height: "60px",
                      background: "rgba(13, 202, 240, 0.15)",
                    }}
                  >
                    <i className="bi bi-hourglass-split fs-3"></i>
                  </div>

                  <div>
                    <p className="text-muted fw-semibold mb-1">
                      Leaves Pending
                    </p>
                    <h3 className="fw-bold mb-0">{PendingLeaves}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leaves Rejected */}
          <div className="col-12 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle text-danger flex-shrink-0"
                    style={{
                      width: "60px",
                      height: "60px",
                      background: "rgba(220, 53, 69, 0.12)",
                    }}
                  >
                    <i className="bi bi-x-square-fill fs-3"></i>
                  </div>

                  <div>
                    <p className="text-muted fw-semibold mb-1">
                      Leaves Rejected
                    </p>
                    <h3 className="fw-bold mb-0">{RejectedLeaves}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;