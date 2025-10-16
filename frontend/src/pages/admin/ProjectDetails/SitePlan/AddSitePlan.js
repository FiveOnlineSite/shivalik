import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout";

import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";

const AddSitePlan = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [floorPlan, setFloorPlan] = useState({ file: "" });
  const [unitPlan, setUnitPlan] = useState({ file: "" });
  const [floorPlanAlt, setFloorPlanAlt] = useState("");
  const [unitPlanAlt, setUnitPlanAlt] = useState("");
  const [sitePlan, setSitePlan] = useState("");
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (!floorPlan.file) {
      setValidationError("Image is required.");
      setIsSubmitting(false);
      return;
    }

    if (floorPlan.file && floorPlanAlt.trim() === "") {
      setValidationError("Alt text is required when uploading an floor plan.");
      setIsSubmitting(false);
      return;
    }

    if (!unitPlan.file) {
      setValidationError("Image is required.");
      setIsSubmitting(false);
      return;
    }

    if (unitPlan.file && unitPlanAlt.trim() === "") {
      setValidationError("Alt text is required when uploading an unit plan.");
      setIsSubmitting(false);
      return;
    }
      setErrorMessage("");
    setValidationError("");

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formData = new FormData();

      formData.append("project", project);
      formData.append("floor_plan_alt", floorPlanAlt);
      formData.append("unit_plan_alt", unitPlanAlt);
      formData.append("site_plan", sitePlan);

      if (floorPlan.file) {
        formData.append("floor_plan", floorPlan.file);
      }
      if (unitPlan.file) {
        formData.append("unit_plan", unitPlan.file);
      }

      await axios.post(`${apiUrl}/api/site-plan`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "description-Type": "multipart/form-data",
        },
      });

      navigate("/admin/site-plans");

      toast.success("Site plan created successfully!");
      
    } catch (error) {
      console.error("Error adding site plan:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");

      toast.error("Failed to create site plan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add Site Plan</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">

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
                <label>Site Plan</label>
                <input
                  type="text"
                  name="site_plan"
                  value={sitePlan}
                  required
                  onChange={(e) => setSitePlan(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Floor Plan</label>
                <input
                  type="file"
                  name="floor_plan"
                  required
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

                    setErrorMessage("");

                    setFloorPlan({
                        file,
                        filepath: URL.createObjectURL(file),
                      
                    });
                  }}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Floor Plan Alt</label>
                <input
                  type="text"
                  name="floor_plan_alt"
                  value={floorPlanAlt}
                  required
                  onChange={(e) => setFloorPlanAlt(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Unit Plan</label>
                <input
                  type="file"
                  name="unit_plan"
                  required
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
                    setUnitPlan({
                        file,
                        filepath: URL.createObjectURL(file),
                      
                    });
                  }}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Unit Plan Alt</label>
                <input
                  type="text"
                  name="unit_plan_alt"
                  value={unitPlanAlt}
                  required
                  onChange={(e) => setUnitPlanAlt(e.target.value)}
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

export default AddSitePlan;
