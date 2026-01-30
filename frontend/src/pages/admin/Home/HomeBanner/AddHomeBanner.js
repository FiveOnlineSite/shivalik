import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddHomeBanner = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState({ file: "" });
  const [mobileImage, setMobileImage] = useState({ file: "" });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [alt, setAlt] = useState("");
  const [mobileAlt, setMobileAlt] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (!image.file) {
      setValidationError("Image is required.");
      setIsSubmitting(false);
      return;
    }
    if (image.file && alt=== "") {
      setValidationError("Alt text is required when uploading an image.");
      setIsSubmitting(false);
      return;
    }

    if (!mobileImage.file) {
      setValidationError("Mobile Image is required.");
      setIsSubmitting(false);
      return;
    }
    if (mobileImage.file && mobileAlt === "") {
      setValidationError("Alt text is required when uploading an mobile image.");
      setIsSubmitting(false);
      return;
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formData = new FormData();

      formData.append("title", title);
      formData.append("alt", alt);
      formData.append("mobile_alt", mobileAlt);
      formData.append("description", description);
      formData.append("link", link || "");

      if (image.file) {
        formData.append("image", image.file);
      }

      if (mobileImage.file) {
        formData.append("mobile_image", mobileImage.file);
      }

      await axios.post(`${apiUrl}/api/home-banner`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/home-banners");
      toast.success("Home Banner created successfully!");
      
    } catch (error) {
      console.error("Error adding home banner:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      toast.error("Failed to create home banner");
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add home banner</h2>
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

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Mobile Banner</label>
                <input
                  type="file"
                  name="mobile_banner"
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
                    setMobileImage({
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
                <label>Mobile Alt</label>
                <input
                  type="text"
                  name="mobileAlt"
                  value={mobileAlt}
                  required
                  onChange={(e) => setMobileAlt(e.target.value)}
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
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Description</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={description}
                  onChange={(event, editor) => {
                                                                                                 const data = editor.getData();
                                                                                                 setDescription(data);
                                                                              }}
                  config={{
                                                                                                 toolbar: [
                                                                                                   "heading", "|",
                                                                                                   "bold", "italic", "underline", "link", "|",
                                                                                                   "bulletedList", "numberedList", "|",
                                                                                                   "undo", "redo", "codeBlock"
                                                                                                 ],
                                                                                                 height: 200,
                                                                                               }}
                />
              </div>
            </div>

             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Link</label>
                <input
                  type="text"
                  name="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
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

export default AddHomeBanner;
