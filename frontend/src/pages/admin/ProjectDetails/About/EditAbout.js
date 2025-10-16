import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout";

import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";

const EditAbout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [about, setAbout] = useState("");

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
    brochure: {
      file: "",
      filepath: "",
      filename: "",
    },
    contact: "",
    project: "",
    description: ""
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
    const fetchAbout = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/about/${id}`);
        const aboutData = response.data.about;
        setAbout(aboutData);

        console.log("about data", aboutData);

        setFormData({
          alt: aboutData.alt,
          image: {
            file: aboutData.image?.[0]?.filename || "",
            filepath: aboutData.image?.[0]?.filepath || "",
          },
          brochure: {
                filename: aboutData.brochure?.[0]?.filename || "",
                filepath: aboutData.brochure?.[0]?.filepath || "",
                file: null,
            },
          description: aboutData.description,
          contact: aboutData.contact,
          project: aboutData.project?._id || aboutData.project || "",
        });
      } catch (error) {
        console.error("Error fetching about:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAbout();
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
  } else if (name === "brochure") {
    setFormData((prevFormData) => ({
      ...prevFormData,
      brochure: {
       filepath: URL.createObjectURL(files[0]),
          filename: files[0].name,

        file: files[0],
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
    formDataToSend.append("description", formData.description || "");
    formDataToSend.append("contact", formData.contact || "");

    if (formData.image.file) {
      formDataToSend.append("image", formData.image.file);
    }
    formDataToSend.append("project", formData.project);

    if (formData.brochure.file) {
      formDataToSend.append("brochure", formData.brochure.file);
    }

    await axios.patch(`${apiUrl}/api/about/${id}`, formDataToSend, 
        {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "description-Type": "multipart/form-data",
      },
    });

    setTimeout(() => {
      navigate("/admin/abouts");
    }, 1000);

    toast.success("About updated successfully!");
  } catch (error) {
    console.error("Error updating about:", error);
    setErrorMessage(error.response?.data?.message || "An error occurred");
    toast.error("Failed to update about");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit About</h2>
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

              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Contact</label>
                <input
                  type="text"
                  name="contact"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                />
              </div>
            </div>

    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Brochure</label>
                <input
                  key={formData.contact} 
                  type="file"
                  name="brochure"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const maxSizeMB = 5; // 10 MB
                    const maxSizeBytes = maxSizeMB * 1024 * 1024;

                    if (file.size > maxSizeBytes) {
                      setErrorMessage(`File is too large! Maximum allowed size is ${maxSizeMB} KB.`);
                      e.target.value = ""; // clear the file input
                      return;
                    }

                    setErrorMessage("");

                    setFormData((prev) => ({
                      ...prev,
                        brochure: {
                          file,
                          filename: file.name,
                        filepath: URL.createObjectURL(file),
                        }
                    }));
                  }}
                />
                {formData.brochure.filepath && (
                          <a
                            href={`${formData.brochure?.filepath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            📄 View PDF - {`${formData.brochure?.filename}`}
                          </a>
                )}
              </div>
            </div>
              
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Description</label>
                 <CKEditor
                   editor={ClassicEditor}
                   data={formData.description}
                   onChange={(event, editor) => {
                                                                                                                                          const data = editor.getData();
                                                                                                                                           setFormData((prev) => ({ ...prev, description: data }));
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

export default EditAbout;
