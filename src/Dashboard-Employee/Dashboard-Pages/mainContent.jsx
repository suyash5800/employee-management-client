

const Content =()=>{

    return(

      <div className="row mt-4">
            <div className="col-md-4">
              <div className="card text-white bg-info mb-3">
                <div className="card-body">
                  <h5 className="card-title">Total Projects</h5>
                  <p className="card-text fs-4">12</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-success mb-3">
                <div className="card-body">
                  <h5 className="card-title">Attendance</h5>
                  <p className="card-text fs-4">95%</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-warning mb-3">
                <div className="card-body">
                  <h5 className="card-title">Pending Tasks</h5>
                  <p className="card-text fs-4">5</p>
                </div>
              </div>
            </div>
          </div> 
    );
}

export default Content;