import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../components/atoms/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditCSRBanners = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [csrBanner, setCsrBanner] = useState("");

  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalCSRBanners, setTotalCSRBanners] = useState(0)
  
  const [formData, setFormData] = useState({
    title: "",
    image: {
      file: "",
      filepath: "",
    },
    alt: "",
    mobile_image: {
      file: "",
      filepath: "",
    },
    mobile_alt: "",
    sequence: ""
  });

  useEffect(() => {
    const fetchcsrBanner = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/csr-banner/${id}`
        );
        const csrBannerData = response.data.banner;
        setCsrBanner(csrBannerData);

        setFormData({
          title: csrBannerData.title,
          alt: csrBannerData.alt,
          mobile_alt: csrBannerData.mobile_alt,
          sequence: csrBannerData.sequence,

          image: {
            file: csrBannerData.image?.[0]?.filename || "",
            filepath: csrBannerData.image?.[0]?.filepath || "",
          },
          mobile_image: {
            file: csrBannerData.mobile_image?.[0]?.filename || "",
            filepath: csrBannerData.mobile_image?.[0]?.filepath || "",
          },
        });
        const totalCSRBanners = await axios.get(`${apiUrl}/api/home-banner`);
        
                    const totalCount = totalCSRBanners.data.count
                     setTotalCSRBanners(totalCount);
                        console.log("Count", totalCount);
      } catch (error) {
        console.error("Error fetching csr banner:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchcsrBanner();
  }, []);

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

    setIsSubmitting(true);
    if (errorMessage) {
                                  toast.error(errorMessage);
                                  return;
                                }
            
                if (validationError) {
                                  toast.error(validationError);
                                  return;
                                }

    setErrorMessage("");

    const isImage = !!formData.image.file;

    if (!isImage) {
      setValidationError("Desktop Banner is required.");
      setIsSubmitting(false);
      return;
    }

    const isMobileImage = !!formData.mobile_image.file;

    if (!isMobileImage) {
      setValidationError("Mobile Banner is required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title || "");
     formDataToSend.append("alt", formData.alt || "");
      formDataToSend.append("mobile_alt", formData.mobile_alt || "");
      formDataToSend.append("sequence", formData.sequence || "");


      if (isImage) {
        formDataToSend.append("image", formData.image.file);
      }

      if (isMobileImage) {
        formDataToSend.append("mobile_image", formData.mobile_image.file);
      }


      await axios.patch(
        `${apiUrl}/api/csr-banner/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTimeout(() => {
        navigate("/admin/csr-banners");
      }, 1000);
      toast.success("Csr banner updated successfully!");
    } catch (error) {
      console.error("Error updating csr banner:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      toast.error("Failed to update csr banner");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit csr banner</h2>
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
             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Mobile Banner</label>
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
                    src={formData.mobile_image.filepath}
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
                <label>Sequence</label>
                <input
                  type="text"
                  name="sequence"
                  required
                  value={formData.sequence}
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

export default EditCSRBanners;
