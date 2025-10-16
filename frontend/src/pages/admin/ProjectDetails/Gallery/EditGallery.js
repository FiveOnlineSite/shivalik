import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditGallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [gallery, setGallery] = useState("");

  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    alt: "",
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
    const fetchgallery = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/gallery/${id}`);
        const galleryData = response.data.Gallery;
        setGallery(galleryData);

        console.log("gallery data", galleryData);

        setFormData({
          alt: galleryData.alt,
    
          image: {
            file: galleryData.image?.[0]?.filename || "",
            filepath: galleryData.image?.[0]?.filepath || "",
          },
          project: galleryData.project?._id || galleryData.project || "",
        });
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchgallery();
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

    if (formData.image.file) {
      formDataToSend.append("image", formData.image.file);
    }
    formDataToSend.append("project", formData.project);

    await axios.patch(`${apiUrl}/api/gallery/${id}`, formDataToSend, 
        {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "description-Type": "multipart/form-data",
      },
    });

    setTimeout(() => {
      navigate("/admin/gallery");
    }, 1000);

    toast.success("Image updated successfully!");
  } catch (error) {
    console.error("Error updating image:", error);
    setErrorMessage(error.response?.data?.message || "An error occurred");
    toast.error("Failed to update image");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit Gallery</h2>
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

export default EditGallery;
