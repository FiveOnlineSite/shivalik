import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditLocationInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // form state
  const [formData, setFormData] = useState({
    project: "",
    map_link: "",
  });

  // info array state
  const [info, setInfo] = useState([{ place: "", distance: "" }]);

  // fetch projects for select dropdown
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const access_token = localStorage.getItem("access_token");
        const res = await axios.get(`${apiUrl}/api/project/banners`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        const filtered = (res.data.Projects || []).filter(
          (pro) => pro.banner && pro.banner.length > 0
        );
        setProjects(filtered);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  // fetch existing location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const res = await axios.get(`${apiUrl}/api/location/${id}`);
        const loc = res.data.Location;

        setFormData({
          project: loc.project?._id || loc.project || "",
          map_link: loc.map_link || "",
        });

        setInfo(
          loc.info && loc.info.length > 0
            ? loc.info.map((i) => ({
                _id: i._id,
                place: i.place || "",
                distance: i.distance || "",
              }))
            : [{ place: "", distance: "" }]
        );
      } catch (err) {
        console.error("Error fetching location:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocation();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInfoChange = (index, field, value) => {
    const updated = [...info];
    updated[index][field] = value;
    setInfo(updated);
  };

  const handleAddInfo = () => {
    setInfo([...info, { place: "", distance: "" }]);
  };

  const handleRemoveInfo = (index) => {
    const updated = [...info];
    updated.splice(index, 1);
    setInfo(updated.length > 0 ? updated : [{ place: "", distance: "" }]);
  };

  const handleDeleteInfo = async (_id) => {
    if (!_id) return;
    if (!window.confirm("Are you sure you want to delete this info?")) return;

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const access_token = localStorage.getItem("access_token");
      await axios.delete(`${apiUrl}/api/location/info/${_id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      setInfo(info.filter((i) => i._id !== _id));
      toast.success("Info deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete info");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const access_token = localStorage.getItem("access_token");

      const payload = {
        project: formData.project,
        map_link: formData.map_link,
        info: JSON.stringify(
            info.map((i) => ({
            _id: i._id,
            place: i.place || "",
            distance: i.distance || "",
            }))
        ),
        };

      await axios.patch(`${apiUrl}/api/location/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Location updated successfully!");
      setTimeout(() => navigate("/admin/location"), 1000);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || "An error occurred");
      toast.error("Failed to update location");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit Location</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Project select */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Project</label>
                <select
                  required
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="" disabled>
                    Select Project
                  </option>
                  {projects.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Map Link */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Map Link</label>
                <input
                  type="text"
                  name="map_link"
                  value={formData.map_link}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Info Array */}
            {info.map((item, index) => (
              <div key={index} className="border p-3 mb-3 delete-button-div">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="theme-form">
                      <label>Place</label>
                      <input
                        type="text"
                        value={item.place}
                        onChange={(e) =>
                          handleInfoChange(index, "place", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="theme-form">
                      <label>Distance</label>
                      <input
                        type="text"
                        value={item.distance}
                        onChange={(e) =>
                          handleInfoChange(index, "distance", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  {item._id ? (
                    <button
                      type="button"
                      className="btn mt-2 delete-btn"
                      onClick={() => handleDeleteInfo(item._id)}
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn remove-btn mt-2"
                      onClick={() => handleRemoveInfo(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}

            {errorMessage && (
              <div className="text-danger col-12 mt-2">{errorMessage}</div>
            )}

            <div className="col-lg-6 col-12 d-flex align-items-center">
              <div className="theme-form">
                <button type="button" onClick={handleAddInfo}>
                  + Add New Location
                </button>
              </div>
              <div className="theme-form ms-3">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="d-flex align-items-center">
                      <span className="spinner-border me-2" role="status"></span>
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

export default EditLocationInfo;
