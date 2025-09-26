import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../components/atoms/AdminLayout";

import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddProject = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [alt, setAlt] = useState("");
  const [bannerAlt, setBannerAlt] = useState("");
  const [mobileBannerAlt, setMobileBannerAlt] = useState("");
  const [projectCategory, setProjectCategory] = useState("")
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState({ file: "" });
  const [banner, setBanner] = useState({ file: "" });
  const [mobileBanner, setMobileBanner] = useState({ file: "" });
  

  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
    const handleSubmit = async (e) => {
  e.preventDefault();

  if (isSubmitting) return;

  
  // format date
  const formattedDate = (() => {
    if (!completionDate) return "";
    const [year, month, day] = completionDate.split("-");
    return `${month}-${day}-${year}`;
  })();

  if (!image.file) {
    setValidationError("Image is required.");
    return;
  }
  if (image.file && alt.trim() === "") {
    setValidationError("Alt text is required when uploading an image.");
    return;
  }

 if (banner.file || mobileBanner.file) {
  if (!banner.file || !bannerAlt.trim() || !mobileBanner.file || !mobileBannerAlt.trim()) {
    setValidationError(
      "Banner, Banner Alt, Mobile Banner, and Mobile Banner Alt are all required when adding a banner."
    );
    return;
  }
}

// reset errors
  setErrorMessage("");
  setValidationError("");

  setIsSubmitting(true);

  try {
    const access_token = localStorage.getItem("access_token");
    const apiUrl = process.env.REACT_APP_API_URL;
    const formData = new FormData();

    formData.append("project_category", projectCategory);
    formData.append("title", title);
    formData.append("excerpt", excerpt || "");
    formData.append("location", location);
    formData.append("completion_date", formattedDate);
    formData.append("alt", alt);

    formData.append("banner_alt", bannerAlt || "");
    formData.append("mobile_banner_alt", mobileBannerAlt || "");

    if (image.file) formData.append("image", image.file);
    if (banner.file) formData.append("banner", banner.file);
    if (mobileBanner.file) formData.append("mobile_banner", mobileBanner.file);

    await axios.post(`${apiUrl}/api/project`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Project created successfully!");
    navigate("/admin/projects");
  } catch (error) {
    console.error("Error adding project:", error);
    setErrorMessage(error.response?.data?.message || "An error occurred");
    toast.error("Failed to create project");
  } finally {
    setIsSubmitting(false);
  }
};


   return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add Project</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
         <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Project Category</label>
                <select
                  required
                  value={projectCategory}
                  onChange={(e) => setProjectCategory(e.target.value)}
                  className="form-control"
                >
                  <option selected disabled value="">Select Category</option>
                  
                    <option value="Shivalik">
                      Shivalik
                    </option>
                    <option value="Promoters">
                      Promoters
                    </option>
                </select>
              </div>
            </div>

            {/* Name */}
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
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                         <div className="theme-form">
                           <label>Excerpt</label>
                           <CKEditor
                             editor={ClassicEditor}
                             data={excerpt}
                             onChange={(event, editor) => {
                                                                 const data = editor.getData();
                                                                 setExcerpt(data);
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
                <label>Image</label>
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
                  value={alt}
                  required
                  onChange={(e) => setAlt(e.target.value)}
                />
              </div>
            </div>

             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Completion Date</label>
                <input
                  type="date"
                  name="completion_date"
                  required
                  max={new Date().toISOString().split("T")[0]} // This restricts future dates
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                />
              </div>
            </div>

          {projectCategory === "Shivalik" && (
            <>
             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Banner</label>
                <input
                  type="file"
                  name="banner"
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

                    setBanner({
                        file,
                        filepath: URL.createObjectURL(file),
                      
                    });
                  }}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Banner Alt</label>
                <input
                  type="text"
                  name="banner_alt"
                  value={bannerAlt}
                  onChange={(e) => setBannerAlt(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Mobile Banner</label>
                <input
                  type="file"
                  name="mobile_banner"
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

                    setMobileBanner({
                        file,
                        filepath: URL.createObjectURL(file),
                      
                    });
                  }}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Mobile Banner Alt</label>
                <input
                  type="text"
                  name="mobile_banner_alt"
                  value={mobileBannerAlt}
                  onChange={(e) => setMobileBannerAlt(e.target.value)}
                />
              </div>
            </div>

            </>
          )}
           

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

export default AddProject;

