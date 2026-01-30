import React, { useState, useEffect } from "react";
import AdminLayout from "../../../components/atoms/AdminLayout"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditBanner = () => {
  const { id } = useParams();
  const [banner, setBanner] = useState(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");

  const [formData, setFormData] = useState({
    alt: "",
    title: "",
    image: {
      file: "",
      filepath: "",
    },
    mobile_image: {
      file: "",
      filepath: "",
    },
    mobile_alt: "",
    page: "",
  });


  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/banner/${id}`);
        const bannerData = response.data.banner;
        setBanner(bannerData);

        setFormData({
          alt: bannerData.alt || "",
          mobile_alt: bannerData.mobile_alt || "",
          title: bannerData.title || "",
          page: bannerData.page || "",
          image: {
            file: bannerData.image[0].filename,
            filepath: bannerData.image[0].filepath || "",
          },
          mobile_image: {
            file: bannerData.mobile_image[0].filename,
            filepath: bannerData.mobile_image[0].filepath || "",
          },
        });

      } catch (error) {
        console.error("Error fetching banner:", error);
        
        setErrorMessage("Failed to fetch banner data.");
      }
    };

    fetchBanner();
  }, [id]);

 const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      if (name === "image") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: {
            file: files[0],
            filepath: URL.createObjectURL(files[0]),
          },
        }));
      } else if (name === "mobile_image") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          mobile_image: {
            file: files[0],
            filepath: URL.createObjectURL(files[0]),
          },
        }));
      }
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
    setErrorMessage("");
    setIsSubmitting(true);

    const isImage = !!formData.image.file;
    const isMobileImage = !!formData.mobile_image.file;

    if (!isMobileImage) {
      setValidationError("Mobile Image is required.");
      setIsSubmitting(false);
      return;
    }

    if (!isImage) {
      setValidationError("Image is required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title || "");
      formDataToSend.append("page", formData.page || "");
      formDataToSend.append("alt", formData.alt || "");
      formDataToSend.append("mobile_alt", formData.mobile_alt || "");
      if (isImage) {
        formDataToSend.append("image", formData.image.file);
      }
      if (isMobileImage) {
        formDataToSend.append("mobile_image", formData.mobile_image.file);
      }

      await axios.patch(`${apiUrl}/api/banner/${id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        navigate("/admin/banners");
      }, 1000);

              toast.success("Banner updated successfully!");
      
      
    } catch (error) {
      console.error("Error adding banner:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
              toast.error("Failed to update banner");
      
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit Banner</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Desktop Banner</label>
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
                 {formData.image?.filepath && (
                  <img
                    className="form-profile"
                    src={formData.image?.filepath}
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

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Mobile Banner</label>
                <input
                  type="file"
                  name="mobile_image"
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
                        mobile_image: {
                          file,
                        filepath: URL.createObjectURL(file),
                        }
                    }));
                  }}
                />
                  {formData.mobile_image?.filepath && (
                  <img
                    className="form-profile"
                    src={formData.mobile_image?.filepath}
                    alt={formData.mobile_alt}
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Mobile Alt</label>
                <input
                  type="text"
                  name="mobile_alt"
                  value={formData.mobile_alt}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
            </div>
             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="theme-form">
                <label>Page</label>
                <select
                  name="page"
                  required
                  value={formData.page} 
                  onChange={handleChange} disabled
                >
                  <option value="">
                    Select a Page
                  </option>

                  <option value="/about-us">About Us</option>
                  <option value="/projects">Projects</option>
                  <option value="/csr">CSR</option>
                  <option value="/faqs">FAQs</option>
                  {/* <option value="/emi-calculator">EMI Calculator</option> */}
                  {/* <option value="/stamp-duty-calculator">Stamp Duty Calculator</option> */}
                  {/* <option value="/news">News</option> */}
                  {/* <option value="/blogs">Blogs</option> */}
                  <option value="/contact-us">Contact Us</option>
                

                </select>
              </div>

            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
            </div>

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

export default EditBanner;
