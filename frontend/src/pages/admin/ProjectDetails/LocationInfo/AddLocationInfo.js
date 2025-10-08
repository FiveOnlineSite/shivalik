import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddLocationInfo = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  
  const [maplink, setMaplink] = useState("");
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState([]);

   const [info, setInfo] = useState([
      { distance: "", place: "" },
    ]);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const access_token = localStorage.getItem("access_token");
        const apiUrl = process.env.REACT_APP_API_URL;

        const res = await axios.get(`${apiUrl}/api/project/banners`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        const filtered = (res.data.Projects || []).filter(
            (pro) => pro.banner && pro.banner.length > 0
            );
            setProjects(filtered);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (isSubmitting) return;

  if (errorMessage) {
    toast.error(errorMessage);
    return;
  }

  if (validationError) {
    toast.error(validationError);
    return;
  }

  setIsSubmitting(true);
  setErrorMessage("");
  setValidationError("");

  try {
    const access_token = localStorage.getItem("access_token");
    const apiUrl = process.env.REACT_APP_API_URL;

    const payload = {
  project,
  map_link: maplink,
  info: info.map((loc) => ({
    place: loc.place,
    distance: loc.distance,
    _id: loc._id || undefined,
  })),
};

    await axios.post(`${apiUrl}/api/location`, payload, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json", // important
      },
    });

    toast.success("Location created successfully!");
    navigate("/admin/location");
  } catch (error) {
    console.error("Error adding location:", error);
    setErrorMessage(error.response?.data?.message || "An error occurred");
    toast.error("Failed to create location");
  } finally {
    setIsSubmitting(false);
  }
};

  const handleDeleteinfo = async (infoId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this location?"
    );
    
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios.delete(`${apiUrl}/api/location/info/${infoId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const updatedinfo = location.filter((loc) => loc._id !== infoId);
      setLocation(updatedinfo);
                                      toast.success("info deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting info:", error);
                                      toast.error("Failed to delete info");
      
      setErrorMessage(
        error.response?.data?.message || "Failed to delete info"
      );
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add Location</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* project */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Project</label>
                <select
                  required
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="form-control"
                >
                  <option disabled value="">
                    Select Project
                  </option>
                  {projects.map((pro) => (
                    <option key={pro._id} value={pro._id}>
                      {pro.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>


                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Map Link</label>
                <input
                  type="text"
                  name="map_link"
                  value={maplink}
                  required
                  onChange={(e) => setMaplink(e.target.value)}
                />
              </div>
            </div>

             {info.map((item, index) => (
              <div key={index} className="border p-3 mb-3 delete-button-div">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="theme-form">
                      <label>Place</label>
                      <input
                        type="text"
                        value={item.place}
                        required
                        onChange={(e) => {
                          const updated = [...info];
                          updated[index].place = e.target.value;
                          setInfo(updated);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="theme-form">
                      <label>Distance</label>
                      <input
                        type="text"
                        value={item.distance}
                        required
                        onChange={(e) => {
                          const updated = [...info];
                          updated[index].distance = e.target.value;
                          setInfo(updated);
                        }}
                      />
                    </div>
                  </div>

                </div>

                {info._id ? (
                  <button
                    type="button"
                    className="btn mt-2 delete-btn"
                    onClick={() => handleDeleteinfo(info._id)}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn remove-btn mt-2"
                    onClick={() => {
                      const updated = [...location];
                      updated.splice(index, 1);
                      setInfo(updated);
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            {errorMessage && (
              <div className="text-danger col-12 mt-2">{errorMessage}</div>
            )}
            {validationError && (
              <div className="text-danger col-12 mt-2">{validationError}</div>
            )}

             <div className="col-lg-6 col-12 d-flex align-items-center">
              <div className="theme-form">
                <button
  type="button"
  onClick={() =>
    setInfo([
      ...info,
      { place: "", distance: "" } // add a new empty info object
    ])
  }
>
  + Add New info
</button>

              </div>

              <div className="theme-form">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="d-flex align-items-center">
                      <span
                        className="spinner-border me-2"
                        role="status"
                      ></span>
                      Save
                    </div>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddLocationInfo;
