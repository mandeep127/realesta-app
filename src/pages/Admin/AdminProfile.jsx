import React from "react";
import { useSelector, useDispatch } from "react-redux";
import proImg from "../../assets/profile.jpg";
import Loading from "../../assets/wait.gif";
import { adminProfile } from "../../store/AdminHomeAPI/adminhApiSlice";
import { format } from "date-fns";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { Profile, loading, error } = useSelector((state) => state.dashboard);

  React.useEffect(() => {
    dispatch(adminProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <img src={Loading} alt="Loading" className="img-fluid" />
        <p className="mt-2 text-muted">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-4">
        <p className="text-danger">Error: {error}</p>
      </div>
    );
  }

  if (!Profile) {
    return (
      <div className="text-center mt-4">
        <p className="text-muted">No profile data available</p>
      </div>
    );
  }

  const displayText =
    Profile?.name && Profile?.id
      ? `${Profile.name}.${Profile.id}`
      : "Loading...";

  return (
    <div className="container mt-4">
      <div className="row rounded-4 bg-light shadow-sm">
        <div className="col-md-3 d-flex justify-content-center align-items-center p-4">
          <div className="profile-pic-container rounded-circle border-5 p-2 shadow-sm">
            <img
              src={proImg}
              alt="Profile Pic"
              className="img-fluid rounded-circle border border-5"
              style={{ width: "130px", height: "130px", objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="col-md-9 d-flex flex-column justify-content-center p-4">
          <h2 className="mb-3 text-primary">{Profile.name || "No Name"}</h2>
          <div className="d-flex flex-wrap">
            <div className="flex-fill me-4">
              <p>
                <strong className="pe-1">Username:</strong>{" "}
                <span className="text-secondary">{displayText}</span>
              </p>

              <p>
                <strong className="pe-1">ID:</strong>{" "}
                <span className="text-secondary">{Profile.id || "N/A"}</span>
              </p>
              <p>
                <strong className="pe-1">Email:</strong>{" "}
                <span className="text-secondary">{Profile.email || "N/A"}</span>
              </p>
            </div>
            <div className="flex-fill">
              <p>
                <strong className="pe-1">Email Verified:</strong>
                <span
                  className={
                    Profile.isEmailVerified ? "text-success" : "text-danger"
                  }
                >
                  {Profile.isEmailVerified ? "Yes" : "No"}
                </span>
              </p>
              <p>
                <strong className="pe-1">Created Date:</strong>
                <span className="text-secondary">
                  {Profile.created_at
                    ? format(new Date(Profile?.created_at), "dd.MMM.yy")
                    : "N/A"}
                </span>
              </p>
              <p>
                <strong className="pe-1">Last Update Date:</strong>
                <span className="text-secondary">
                  {Profile.updated_at
                    ? format(new Date(Profile?.updated_at), "dd.MMM.yy")
                    : "N/A"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 text-center">
        <img src={Loading} alt="Loading" className="img-fluid" />
        <p className="mt-2 text-muted">More Details Not Found...</p>
      </div>
    </div>
  );
};

export default AdminProfile;
