import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditHighlight = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [highlight, setHighlight] = useState("");

  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    alt: "",
    title: "",
    image: {
      file: "",
      filepath: "",
    },
    project: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const access_token = localStorage.getItem("access_token");
        const response = await axios.get(`${apiUrl}/api/project/banners`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        const filtered = (response.data.Projects || []).filter(
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
    const fetchhighlight = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/highlight/${id}`);
        const highlightData = response.data.Highlight;
        setHighlight(highlightData);

        console.log("highlight data", highlightData);

        setFormData({
          alt: highlightData.alt,
    
          title: highlightData.title,
          image: {
            file: highlightData.image?.[0]?.filename || "",
            filepath: highlightData.image?.[0]?.filepath || "",
          },
          project: highlightData.project?._id || highlightData.project || "",
        });
      } catch (error) {
        console.error("Error fetching highlights:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchhighlight();
  }, []);

  const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "image") {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: {
        file: files[0],
        filepath: URL.createObjectURL(files[0]),
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

  const isImage = !!formData.image.file || !!formData.image.filepath;

  if (!isImage) {
    setValidationError("Image is required.");
    setIsSubmitting(false);
    return;
  }

  try {
    const access_token = localStorage.getItem("access_token");
    const apiUrl = process.env.REACT_APP_API_URL;
    const formDataToSend = new FormData();

    formDataToSend.append("alt", formData.alt || "");
    formDataToSend.append("title", formData.title || "");
  
    if (formData.image.file) {
      formDataToSend.append("image", formData.image.file);
    }
    formDataToSend.append("project", formData.project);

    await axios.patch(`${apiUrl}/api/highlight/${id}`, formDataToSend, 
        {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "description-Type": "multipart/form-data",
      },
    });

    setTimeout(() => {
      navigate("/admin/highlights");
    }, 1000);

    toast.success("highlights updated successfully!");
  } catch (error) {
    console.error("Error updating highlights:", error);
    setErrorMessage(error.response?.data?.message || "An error occurred");
    toast.error("Failed to update highlights");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit Highlight</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
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
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Image</label>
                <input
                  type="file"
                  name="image"
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
                        image: {
                          file,
                        filepath: URL.createObjectURL(file),
                        }
                    }));
                  }}
                />
                {formData.image.filepath && (
                  <img
                    className="form-profile"
                    src={formData.image.filepath}
                    alt={formData.alt}
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Alt</label>
                <input
                  type="text"
                  name="alt"
                  value={formData.alt}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            {errorMessage && (
              <div className="text-danger col-12 mt-2">{errorMessage}</div>
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

export default EditHighlight;
