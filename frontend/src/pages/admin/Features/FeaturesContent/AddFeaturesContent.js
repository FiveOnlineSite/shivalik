import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddFeaturesContent = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState({ file: "" });
  const [alt, setAlt] = useState("");
  const [title, setTitle] = useState("");

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
  

    if (!image.file) {
      setValidationError("Image is required.");
      setIsSubmitting(false);
      return;
    }

    if (image.file && alt === "") {
      setValidationError("Alt text is required when uploading an image.");
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
      formData.append("alt", alt);
      formData.append("title", title);

      if (image.file) {
        formData.append("image", image.file);
      }

      await axios.post(`${apiUrl}/api/feature-content`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "description-Type": "multipart/form-data",
        },
      });

      navigate("/admin/feature-contents");

      toast.success("Feature content created successfully!");
      
    } catch (error) {
      console.error("Error adding feature content:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");

      toast.error("Failed to create feature content");
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add Feature Content</h2>
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
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            {/* Image */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  required
                  accept=".webp, .png, .jpg, .jpeg, .svg"
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
                    setImage({
                        file,
                        filepath: URL.createObjectURL(file),
                      
                    });
                  }}
                />
              </div>
            </div>

            {/* Alt */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Alt</label>
                <input
                  type="text"
                  name="alt"
                  value={alt}
                  required
                  onChange={(e) => setAlt(e.target.value)}
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

export default AddFeaturesContent;
