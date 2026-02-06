
const EmpCardInfo = ({ setshowCardModel,employee }) => {

    return (
     


<div style={{
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    maxWidth: "350px",
    margin: "20px auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    textAlign: "center"
}}>
    <div style={{ marginBottom: "15px" }}>
        {employee.profileimage ? (
            <img
                src={`http://localhost:5800/${employee.profileimage.replace(/\\/g, "/")}`}
               
                alt={`${employee.name}'s profile`}
                width="100"
                height="100"
                style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #ccc"
                }}
            />
        ) : (
            <div style={{
                width: "100px",
                height: "100px",
                lineHeight: "100px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                color: "#aaa",
                display: "inline-block",
                fontSize: "14px"
            }}>
                No Image
            </div>
        )}
    </div>

    <h4 style={{ marginBottom: "10px" }}>{employee.name }</h4>
    <p><strong>Email:</strong> {employee.email }</p>
    <p><strong>Department:</strong> {employee.department || "No Department"}</p>

    <button
        className="btn btn-outline-danger"
        onClick={() => setshowCardModel(false)}
        style={{
            marginTop: "15px",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer"
        }}
    >
        Cancel
    </button>
</div>


        
    )
}

export default EmpCardInfo;