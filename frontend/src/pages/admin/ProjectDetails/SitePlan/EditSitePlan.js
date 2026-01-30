import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditSitePlan = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
    const [sitePlan, setSitePlan] = useState("");
  
    const [validationError, setValidationError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [projects, setProjects] = useState([]);
      const { id } = useParams();
    
  
    const [formData, setFormData] = useState({
      floor_plan_alt: "",
      floor_plan: {
        file: "",
        filepath: "",
      },
      unit_plan_alt: "",
      unit_plan: {
        file: "",
        filepath: "",
      },
      site_plan: "",
      project: "",
    });

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
  
  useEffect(() => {
      const fetchSitePlan = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/site-plan/${id}`);
          const sitePlanData = response.data.SitePlan;
          setSitePlan(sitePlanData);
  
          console.log("site plan data", sitePlanData);
  
          setFormData({
            floor_plan_alt: sitePlanData.floor_plan_alt,
            unit_plan_alt: sitePlanData.unit_plan_alt,
  
            site_plan: sitePlanData.site_plan,
            floor_plan: {
              file: sitePlanData.floor_plan?.[0]?.filename || "",
              filepath: sitePlanData.floor_plan?.[0]?.filepath || "",
            },
            unit_plan: {
              file: sitePlanData.unit_plan?.[0]?.filename || "",
              filepath: sitePlanData.unit_plan?.[0]?.filepath || "",
            },
            project: sitePlanData.project?._id || sitePlanData.project || "",
          });
        } catch (error) {
          console.error("Error fetching site plan:", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchSitePlan();
    }, []);

   const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "floor_plan") {
    setFormData((prevFormData) => ({
      ...prevFormData,
      floor_plan: {
        file: files[0],
        filepath: URL.createObjectURL(files[0]),
      },
    }));
  } else if (name === "unit_plan") {
    setFormData((prevFormData) => ({
      ...prevFormData,
      unit_plan: {
       filepath: URL.createObjectURL(files[0]),
        file: files[0],
      },
    }));
  } else {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
};

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
  
    const isFloorPlan = !!formData.floor_plan.file || !!formData.floor_plan.filepath;
  
    if (!isFloorPlan) {
      setValidationError("Floor Plan is required.");
      setIsSubmitting(false);
      return;
    }

    const isUnitPlan = !!formData.unit_plan.file || !!formData.unit_plan.filepath;
  
    if (!isUnitPlan) {
      setValidationError("Unit Plan is required.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formDataToSend = new FormData();
  
      formDataToSend.append("floor_plan_alt", formData.floor_plan_alt || "");
      formDataToSend.append("unit_plan_alt", formData.unit_plan_alt || "");
      formDataToSend.append("site_plan", formData.site_plan || "");
  
      if (formData.floor_plan.file) {
        formDataToSend.append("floor_plan", formData.floor_plan.file);
      }
      formDataToSend.append("project", formData.project);
  
      if (formData.unit_plan.file) {
        formDataToSend.append("unit_plan", formData.unit_plan.file);
      }
  
      await axios.patch(`${apiUrl}/api/site-plan/${id}`, formDataToSend, 
          {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "description-Type": "multipart/form-data",
        },
      });
  
      setTimeout(() => {
        navigate("/admin/site-plans");
      }, 1000);
  
      toast.success("Site plan updated successfully!");
    } catch (error) {
      console.error("Error updating site plan :", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      toast.error("Failed to update site plan ");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit Site Plan</h2>
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
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option selected disabled value="">
                    Select Project
                  </option>
                  {projects &&
                    projects.map((pro) => (
                      <option key={pro._id} value={pro._id}>
                        {pro.title}
                      </option>
                    ))}
                </select>
              </div>
            </div>

             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Site Plan</label>
                <input
                  type="text"
                  name="site_plan"
                  value={formData.site_plan}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Floor Plan</label>
                <input
                  type="file"
                  name="floor_plan"
                  accept=".webp, .png, .jpg, .jpeg"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const maxSizeMB = 500; // 10 MB
                    const maxSizeBytes = maxSizeMB * 1024;

                    if (file.size > maxSizeBytes) {
                      setErrorMessage(`File is too large! Maximum allowed size is ${maxSizeMB} KB.`);
                      e.target.value = ""; // clear the file input
                      return;
                    }

                    // Clear any previous error
                    setErrorMessage("");

                    // Proceed if size is okay
                    setFormData((prev) => ({
                      ...prev,
                        floor_plan: {
                          file,
                        filepath: URL.createObjectURL(file),
                        }
                    }));
                  }}
                />
                {formData.floor_plan.filepath && (
                  <img
                    className="form-profile"
                    src={formData.floor_plan.filepath}
                    alt={formData.floor_plan_alt}
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Floor Plan Alt</label>
                <input
                  type="text"
                  name="floor_plan_alt"
                  value={formData.floor_plan_alt}
                  required
                  onChange={handleChange}

                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Unit Plan</label>
                <input
                  type="file"
                  name="unit_plan"
                  accept=".webp, .png, .jpg, .jpeg"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const maxSizeMB = 500; // 10 MB
                    const maxSizeBytes = maxSizeMB * 1024;

                    if (file.size > maxSizeBytes) {
                      setErrorMessage(`File is too large! Maximum allowed size is ${maxSizeMB} KB.`);
                      e.target.value = ""; // clear the file input
                      return;
                    }

                    // Clear any previous error
                    setErrorMessage("");

                    // Proceed if size is okay
                    setFormData((prev) => ({
                      ...prev,
                        unit_plan: {
                          file,
                        filepath: URL.createObjectURL(file),
                        }
                    }));
                  }}
                />
                {formData.unit_plan.filepath && (
                  <img
                    className="form-profile"
                    src={formData.unit_plan.filepath}
                    alt={formData.unit_plan_alt}
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Unit Plan Alt</label>
                <input
                  type="text"
                  name="unit_plan_alt"
                  value={formData.unit_plan_alt}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            {errorMessage && (
              <div className="text-danger col-12 mt-2">{errorMessage}</div>
            )}
            {validationError && (
              <div className="text-danger col-12 mt-2">{validationError}</div>
            )}

            <div className="col-12">
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

export default EditSitePlan;
