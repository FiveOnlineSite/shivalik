import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../../../components/atoms/AdminLayout";

import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditProject = () => {

    const [formData, setFormData] = useState({
         title: "",
         alt: "",
         image: {
           file: "",
           filepath: "",
         },
         completion_date: "",
         location: "",
         project_category: "",
         banner: {
           file: "",
           filepath: "",
         },
         mobile_banner: {
           file: "",
           filepath: "",
         },
         banner_alt: "",
         mobile_banner_alt: "",
         sequence: ""
       });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
 
  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [project, setProject] = useState("");
    const {_id, id} = useParams()

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/project/${id}`);
        const convertDateForInput = (dateStr) => {
        const [mm, dd, yyyy] = dateStr.split("-");
        return `${yyyy}-${mm}-${dd}`;
      };
        const projectData = response.data.Project;
        setProject(projectData);

        console.log("project data", projectData);

        setFormData({
          alt: projectData.alt,
          banner_alt: projectData.banner_alt,
          mobile_banner_alt: projectData.mobile_banner_alt,

          image: {
            file: projectData.image?.[0]?.filename || "",
            filepath: projectData.image?.[0]?.filepath || "",
          },
          location: projectData.location || "",
          title: projectData.title || "",
          excerpt: projectData.excerpt,

          project_category: projectData.project_category || "",
          completion_date:  projectData.completion_date
            ? convertDateForInput(projectData.completion_date)
            : "",
          banner: {
            file: projectData.banner?.[0]?.filename || "",
            filepath: projectData.banner?.[0]?.filepath || "",
          },
          mobile_banner: {
            file: projectData.mobile_banner?.[0]?.filename || "",
            filepath: projectData.mobile_banner?.[0]?.filepath || "",
          },
          sequence: projectData.sequence


        });


      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, []);

   const handleChange = (e) => {
    const { name, value, files } = e.target;
 setErrorMessage("");
    setValidationError("");
    if (files && files.length > 0) {
      if (name === "image") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: {
            file: files[0],
            filepath: URL.createObjectURL(files[0]),
          },
        }));
      } else if (name === "banner") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          banner: {
            file: files[0],
            filepath: URL.createObjectURL(files[0]),
          },
        }));
      } else if (name === "mobile_banner") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          mobile_banner: {
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

  const convertDateToDisplayFormat = (isoDate) => { 
    const [yyyy, mm, dd] = isoDate.split("-"); 
    return `${mm}-${dd}-${yyyy}`; 
  };

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
  setValidationError("");
  setIsSubmitting(true);

  try {
    const access_token = localStorage.getItem("access_token");
    const apiUrl = process.env.REACT_APP_API_URL;
    const formDataToSend = new FormData();

    // Text fields
    formDataToSend.append("title", formData.title || "");
    formDataToSend.append("location", formData.location || "");
    formDataToSend.append("completion_date", formData.completion_date ? convertDateToDisplayFormat(formData.completion_date) : "");
    formDataToSend.append("excerpt", formData.excerpt || "");
    formDataToSend.append("alt", formData.alt || "");
    formDataToSend.append("banner_alt", formData.banner_alt || "");
    formDataToSend.append("mobile_banner_alt", formData.mobile_banner_alt || "");
    formDataToSend.append("sequence", formData.sequence || "");
    formDataToSend.append("project_category", formData.project_category || "");

    // Files — only append if it’s a real File object, not a string
    if (formData.image.file instanceof File) {
      formDataToSend.append("image", formData.image.file);
    }
    if (formData.banner.file instanceof File) {
      formDataToSend.append("banner", formData.banner.file);
    }
    if (formData.mobile_banner.file instanceof File) {
      formDataToSend.append("mobile_banner", formData.mobile_banner.file);
    }

    const response = await axios.patch(`${apiUrl}/api/project/${id}`, formDataToSend, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data?.message) {
      toast.success(response.data.message);
    } else {
      toast.success("Project updated successfully!");
    }

    navigate("/admin/projects");

  } catch (error) {
    console.error("Error updating project:", error);
    setErrorMessage(error.response?.data?.message || "An error occurred");
    toast.error("Failed to update project");
  } finally {
    setIsSubmitting(false);
  }
};


   return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit Project</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Project Category</label>
                <select
                  name="project_category"
                  required
                  value={formData.project_category}
                  onChange={handleChange}
                  className="form-control"
                >
                   <option disabled value="">Select Category</option>
                  
                    <option value="Shivalik">
                      Shivalik
                    </option>
                    <option value="Promoters">
                      Promoters
                    </option>
                </select>
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
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                   onChange={handleChange}
                />
              </div>
            </div>

             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                         <div className="theme-form">
                           <label>Excerpt</label>
                           <CKEditor
                             editor={ClassicEditor}
                             data={formData.excerpt}
                             onChange={(event, editor) => {
                                                                 const data = editor.getData();
                                                                  setFormData((prev) => ({ ...prev, excerpt: data }));
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

             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Completion Date</label>
                <input
                  type="date"
                  name="completion_date"
                  required
                  max={new Date().toISOString().split("T")[0]} // This restricts future dates
                  value={formData.completion_date}
                  onChange={handleChange}
                />
              </div>
            </div>

           {formData.project_category === "Shivalik" && (
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

                    setFormData((prev) => ({
                      ...prev,
                        banner: {
                          file,
                        filepath: URL.createObjectURL(file),
                        }
                    }));
                  }}
                />
                 {formData.banner.filepath && (
                  <img
                    className="form-profile"
                    src={formData.banner.filepath}
                    alt={formData.banner_alt}
                    
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Banner Alt</label>
                <input
                  type="text"
                  name="banner_alt"
                  value={formData.banner_alt}
                 onChange={handleChange}
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

                    setFormData((prev) => ({
                      ...prev,
                        mobile_banner: {
                          file,
                        filepath: URL.createObjectURL(file),
                        }
                    }));
                  }}
                />
                 {formData.mobile_banner.filepath && (
                  <img
                    className="form-profile"
                    src={formData.mobile_banner.filepath}
                    alt={formData.mobile_banner_alt}
                    
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Mobile Banner Alt</label>
                <input
                  type="text"
                  name="mobile_banner_alt"
                  value={formData.mobile_banner_alt}
                  onChange={handleChange}
                />
              </div>
            </div>
            </>
           )}
            

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Sequence</label>
                <input
                  type="text"
                  name="sequence"
                  value={formData.sequence}
                  required
                  onChange={handleChange}
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

export default EditProject;

