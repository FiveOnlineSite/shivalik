import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddStatus = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [possession, setPossession] = useState("");
  const [maharera, setMaharera] = useState("");
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStatus, setCurrentStatus] = useState([]);

   const [images, setImages] = useState([
      { image: null, alt: "" },
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

  const formattedDate = (() => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${month}-${day}-${year}`;
  })();

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

  // validate images
  const imagesErrors = images.some((img) => {
    return !img._id && !(img.image instanceof File);
  });
  if (imagesErrors) {
    setErrorMessage("Please upload image for new status.");
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
    formData.append("date", formattedDate);
    formData.append("status", status || "");
    formData.append(
      "possession",
      possession ? (() => {
        const [year, month, day] = possession.split("-");
        return `${month}-${day}-${year}`;
      })() : ""
    );
    formData.append("maharera", maharera || "");

    const imagesArray = images.map((img, index) => {
      const imageKey = `image_${index}`;

      if (img.image instanceof File) {
        formData.append(imageKey, img.image);
      }

      return {
        alt: img.alt,
        _id: img._id,
        image_key: imageKey,
      };
    });

    formData.append("images", JSON.stringify(imagesArray));

    await axios.post(`${apiUrl}/api/current-status`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Current status created successfully!");
    navigate("/admin/current-status");
  } catch (error) {
    console.error("Error adding current status:", error);
    setErrorMessage(error.response?.data?.message || "An error occurred");
    toast.error("Failed to create current status");
  } finally {
    setIsSubmitting(false);
  }
};

  const handleDeleteImages = async (imageId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this images?"
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios.delete(`${apiUrl}/api/current-status/image/${imageId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // Remove from local state
      const updatedStatus = currentStatus.filter((img) => img._id !== imageId);
      setCurrentStatus(updatedStatus);
                                      toast.success("Image deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting image:", error);
                                      toast.error("Failed to delete image");
      
      setErrorMessage(
        error.response?.data?.message || "Failed to delete image"
      );
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add Status</h2>
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
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={date}
                  max={new Date().toISOString().split("T")[0]} 
                  required
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Current Status</label>
                <select
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-control"
                >
                  <option selected disabled value="">Select Status</option>
                  
                    <option value="Ongoing Construction">
                      Ongoing Construction
                    </option>
                    <option value="Completed">
                      Completed
                    </option>
                </select>
              </div>
            </div>

                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Possession By</label>
                <input
                  type="date"
                  name="possession"
                  value={possession}
                  required
                  onChange={(e) => setPossession(e.target.value)}
                />
              </div>
            </div>

                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>MahaRERA</label>
                <input
                  type="text"
                  name="maharera"
                  value={maharera}
                  required
                  onChange={(e) => setMaharera(e.target.value)}
                />
              </div>
            </div>

             {images.map((image, index) => (
              <div key={index} className="border p-3 mb-3 delete-button-div">
                <div className="row">
                
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="theme-form">
                      <label>Image</label>

                      <input
                        type="file"
                        required
                        accept=".webp,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file && file.size > 500 * 1024) {
                            setErrorMessage(
                              "Image too large. Max size is 500KB."
                            );
                            return;
                          }

                          setErrorMessage("");

                          const updated = [...images];
                          updated[index].image = file;
                          setImages(updated);
                        }}
                      />

                      {Array.isArray(image.image) &&
                        image.image[0]?.filepath && (
                          <img
                            src={image.image[0].filepath}
                            alt={image.alt || ""}
                            className="form-profile mt-2"
                          />
                        )}
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="theme-form">
                      <label>Alt</label>
                      <input
                        type="text"
                        value={image.alt}
                        required
                        onChange={(e) => {
                          const updated = [...images];
                          updated[index].alt = e.target.value;
                          setImages(updated);
                        }}
                      />
                    </div>
                  </div>

                </div>

                {image._id ? (
                  <button
                    type="button"
                    className="btn mt-2 delete-btn"
                    onClick={() => handleDeleteImages(image._id)}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn remove-btn mt-2"
                    onClick={() => {
                      const updated = [...currentStatus];
                      updated.splice(index, 1);
                      setImages(updated);
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
    setImages([
      ...images,
      { image: null, alt: "" } // add a new empty image object
    ])
  }
>
  + Add New Image
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

export default AddStatus;
