import React, { useState, useEffect } from "react";
import AdminLayout from "../../../components/atoms/AdminLayout"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddBanner = () => {

  const [image, setImage] = useState({ file: "" });
  const [alt, setAlt] = useState("");
  const [mobileImage, setMobileImage] = useState({ file: "" });
  const [mobileAlt, setMobileAlt] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState("");
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

     if (validationError) {
             toast.error(validationError);
             return;
         }
     
          if (errorMessage) {
             toast.error(errorMessage);
             return;
         }

    setIsSubmitting(true);
    setErrorMessage("");
    setValidationError("")

  const isImage = !!image.file;
    const isMobileImage = !!mobileImage.file;

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
    
    if (isImage && alt.trim() === "") {
      setValidationError("Alt text is required when uploading an desktop banner.");
      setIsSubmitting(false);
      return;
    }

    if (isMobileImage && mobileAlt.trim() === "") {
      setValidationError("Alt text is required when uploading mobile banner.");
      setIsSubmitting(false);
      return;
    }

setValidationError("")

    try {
      const formData = new FormData();

      formData.append("title", title || "");
      formData.append("page", page || "");
      formData.append("alt", alt);
      formData.append("mobile_alt", mobileAlt);
      if (image.file) {
        formData.append("image", image.file);
      }
      if (mobileImage.file) {
        formData.append("mobile_image", mobileImage.file);
      }

      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios.post(`${apiUrl}/api/banner`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      });

      navigate("/admin/banners");
      toast.success("Banner created successfully!");
      
    } catch (error) {
      console.error("Error creating banner:", error);
            toast.error("Failed to create banner");
      
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add Banner</h2>
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
    setValidationError("");


                    // Proceed if size is okay
                    setImage({
                        file,
                        filepath: URL.createObjectURL(file),
                      
                    });
                  }}
                />
              </div>
            </div>

           <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Alt</label>
                <input
                  type="text"
                  name="alt"
                  required
                  onChange={(e) => {setAlt(e.target.value); setErrorMessage(""); setValidationError(""); }}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Mobile Banner</label>
                <input
                  type="file"
                  name="mobile_image"
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
    setValidationError("");
                    

                    // Proceed if size is okay
                    setMobileImage({
                        file,
                        filepath: URL.createObjectURL(file),
                      
                    });
                  }}
                />
              </div>
            </div>

           <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Mobile Alt</label>
                <input
                  type="text"
                  name="mobile_alt"
                  value={mobileAlt}
                  required
                  onChange={(e) => {setMobileAlt(e.target.value); setErrorMessage(""); setValidationError("");}}
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
                  value={title}
                  onChange={(e) => {setTitle(e.target.value); setErrorMessage(""); setValidationError("");}}
                />
              </div>
            </div>

           <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Page</label>
                <select
                  name="page"
                  required
                  value={page}
                  onChange={(e) =>{setPage(e.target.value); setErrorMessage(""); setValidationError("");}}
                >
                  <option value="" disabled>
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


            {errorMessage && (
              <div className="error-message text-danger mt-2">
                {errorMessage}
              </div>
            )}

            {validationError && (
              <div className="validation-message text-danger mt-2">
                {validationError}
              </div>
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

export default AddBanner;
