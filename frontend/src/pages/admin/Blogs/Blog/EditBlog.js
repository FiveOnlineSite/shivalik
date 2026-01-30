import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [award, setAward] = useState("");

  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalAwards, setTotalAwards] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    alt: "",
    image: {
      file: "",
      filepath: "",
    },
    sequence: "",
    metaTitle: "",
    metaDescription: "",
    metaKeyword: ""
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/blog/${id}`
        );
        const blogData = response.data.Blog;
        setAward(blogData);

        console.log("blog data", blogData);

        setFormData({
          title: blogData.title,
          content: blogData.content,
          alt: blogData.alt,
          sequence: blogData.sequence,
          metaTitle: blogData.metaTitle,
          metaDescription: blogData.metaDescription,
          metaKeyword: blogData.metaKeyword,

          image: {
            file: blogData.image?.[0]?.filename || "",
            filepath: blogData.image?.[0]?.filepath || "",
          },
        });

        const totalBlogsResponse = await axios.get(`${apiUrl}/api/blog`);
        
                    const totalCount = totalBlogsResponse.data.BlogsCount
                     setTotalAwards(totalCount);
                     console.log("count", totalCount)
                       
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
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
    if (formData.sequence > totalAwards) {
      setErrorMessage(
        `Total entries are ${totalAwards}. Sequence number cannot be greater than ${totalAwards}`
      );
      return;
    }


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

    const isimage = !!formData.image.file;

    if (!isimage) {
      setValidationError("image is required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title || "");
      formDataToSend.append("content", formData.content || "");

      formDataToSend.append("alt", formData.alt || "");
      formDataToSend.append("sequence", formData.sequence || "");
      formDataToSend.append("metaTitle", formData.metaTitle || "");
      formDataToSend.append("metaDescription", formData.metaDescription || "");
      formDataToSend.append("metaKeyword", formData.metaKeyword || "");

      if (isimage) {
        formDataToSend.append("image", formData.image.file);
      }
      await axios.patch(
        `${apiUrl}/api/blog/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTimeout(() => {
        navigate("/admin/blogs");
      }, 1000);
      toast.success("Blog updated successfully!");
      
    } catch (error) {
      console.error("Error updating blog:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      toast.error("Failed to update blog");
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit Blog</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">

             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            
            
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  accept=".webp, .jpg, .jpeg, .png"
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

             <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                           <div className="theme-form">
                             <label>Content</label>
                              <CKEditor
                                editor={ClassicEditor}
                                data={formData.content}
                                required
                                onChange={(event, editor) => {
                                                                                                                                                       const data = editor.getData();
                                                                                                                                                        setFormData((prev) => ({ ...prev, content: data }));
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

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Meta Title</label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Meta Description</label>
                <input
                  type="text"
                  name="metaDescription"
                  value={formData.metaDescription}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Meta Keyword</label>
                <input
                  type="text"
                  name="metaKeyword"
                  value={formData.metaKeyword}
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

export default EditBlog;
