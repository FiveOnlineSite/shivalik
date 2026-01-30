import React, { useState, useEffect} from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditStatus = () => {
  const navigate = useNavigate();
    const { id } = useParams();
  
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState([]);
    const [projects, setProjects] = useState([]);
  
  const [images, setImages] = useState([
    { image: null, alt: "" },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
      date: "",
      status: "",
      possession: "",
      maharera: "",
      images: [{
        image: {
        file: "",
        filepath: "",
      },
        alt: ""
  }],
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
    const fetchStatus = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/current-status/${id}`);
         const convertDateForInput = (dateStr) => {
        const [mm, dd, yyyy] = dateStr.split("-");
        return `${yyyy}-${mm}-${dd}`;
      };

        const StatusData = response.data.Status;
        
         setFormData({
          date: convertDateForInput(StatusData.date),
          status: StatusData.status,
          maharera: StatusData.maharera,
          possession: convertDateForInput(StatusData.possession),
          images: [{
            image: {
            file: StatusData.image?.[0]?.filename || "",
            filepath: StatusData.image?.[0]?.filepath || "",
          },
          alt: StatusData.alt
          },],
          project: StatusData.project?._id || StatusData.project || "",
        });

       setCurrentStatus(
  (StatusData.images || []).map(img => ({
    _id: img._id,
    image: {
      file: null,
      filepath: img.image?.[0]?.filepath || "", // get first filepath
    },
    alt: img.alt || "",
  }))
);

        } catch (error) {
        console.error("Error fetching Status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
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

  const convertDateToDisplayFormat = (isoDate) => {
    if (!isoDate) return "";
    const [yyyy, mm, dd] = isoDate.split("-");
    return `${mm}-${dd}-${yyyy}`;
  };

  if (isSubmitting) return;

  if (errorMessage) {
    toast.error(errorMessage);
    return;
  }

  setIsSubmitting(true);
  setErrorMessage("");

  const hasImageErrors = currentStatus.some((img) => {
    return !img._id && !(img.image?.file instanceof File);
  });

  if (hasImageErrors) {
    setErrorMessage("Please upload image for new images.");
    setIsSubmitting(false);
    return;
  }

  try {
    const access_token = localStorage.getItem("access_token");
    const apiUrl = process.env.REACT_APP_API_URL;

    const fd = new FormData();

    // append basic fields
    fd.append("date", convertDateToDisplayFormat(formData.date) || "");
    fd.append("status", formData.status);
    fd.append(
      "possession",
      convertDateToDisplayFormat(formData.possession) || ""
    );
    fd.append("maharera", formData.maharera);
    fd.append("project", formData.project);

    const imagesArray = currentStatus.map((img, index) => {
      const imageKey = `image_${index}`;

      if (img.image?.file instanceof File) {
        fd.append(imageKey, img.image.file);
      }

      return {
        alt: img.alt,
        _id: img._id, // if it exists
        image_key: imageKey,
      };
    });

    fd.append("images", JSON.stringify(imagesArray));

    // API call
    await axios.patch(`${apiUrl}/api/current-status/${id}`, fd, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Current status updated successfully!");
    setTimeout(() => {
      navigate("/admin/current-status");
    }, 1000);
  } catch (error) {
    console.error("Error updating current status:", error);
    setErrorMessage(error.response?.data?.message || "An error occurred");
    toast.error("Failed to update current status");
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
        <h2>Edit Status</h2>
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
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  max={new Date().toISOString().split("T")[0]}
                  value={formData.date}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Status</label>
                <select
                  name="status"
                  required
                  value={formData.status}
                  onChange={handleChange}
                  className="form-control"
                >
                   <option disabled value="">Select Status</option>
                  
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
                  
                  value={formData.possession}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>MahaRERA</label>
                <input
                  type="text"
                  name="maharera"
                  value={formData.maharera}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>


            {currentStatus.map((image, index) => (
              <div key={index} className="border p-3 mb-3 delete-button-div">
                <div className="row">

 <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="theme-form">
                      <label>Image</label>

                      <input
                        type="file"
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

                          const updated = [...currentStatus];
                          updated[index].image = { file, filepath: URL.createObjectURL(file) };

                          setCurrentStatus(updated);
                        }}
                      />

                      {/* Show primgiew if filepath exists */}

                      {/* {Array.isArray(image.image) &&
                        image.image[0]?.filepath && (
                          <img
                            src={image.image[0].filepath}
                            alt={image.alt || ""}
                            className="form-profile mt-2"
                          />
                        )} */}
                        {image.image?.filepath && (
  <img src={image.image.filepath} alt={image.alt || ""} className="form-profile mt-2" />
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
                          const updated = [...currentStatus];
                          updated[index].alt = e.target.value;
                          setCurrentStatus(updated);
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
                      setCurrentStatus(updated);
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

            <div className="col-lg-6 col-12 d-flex align-items-center">
              <div className="theme-form">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentStatus([
  ...currentStatus,
  { image: { file: null, filepath: null }, alt: "" },
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

export default EditStatus;
