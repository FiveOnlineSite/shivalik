import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddBlog = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState({ file: "" });
  const [alt, setAlt] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");

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
      setValidationError("image is required.");
      setIsSubmitting(false);
      return;
    }
    if (image.file && alt.trim() === "") {
      setValidationError("Alt text is required when uploading an image.");
      setIsSubmitting(false);
      return;
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formData = new FormData();

      formData.append("title", title);

      formData.append("alt", alt);
      formData.append("content", content);
      formData.append("metaTitle", metaTitle);
      formData.append("metaDescription", metaDescription);
      formData.append("metaKeyword", metaKeyword);


      if (image.file) {
        formData.append("image", image.file);
      }

      await axios.post(`${apiUrl}/api/blog`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/blogs");
      toast.success("Blog created successfully!");
      
    } catch (error) {
      console.error("Error adding blog:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      toast.error("Failed to create blog");
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add Blog</h2>
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
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
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
                  accept=".webp,.jpg,.jpeg,.png"
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

             <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="theme-form">
                            <label>Content</label>
                            <CKEditor
                              editor={ClassicEditor}
                              data={content}
                              required
                              onChange={(event, editor) => {
                                                                                                             const data = editor.getData();
                                                                                                             setContent(data);
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
                <label>Meta Title</label>
                <input
                  type="text"
                  name="metaTitle"
                  value={metaTitle}
                  required
                  onChange={(e) => setMetaTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Meta Description</label>
                <input
                  type="text"
                  name="metaDescription"
                  value={metaDescription}
                  required
                  onChange={(e) => setMetaDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Meta Keyword</label>
                <input
                  type="text"
                  name="metaKeyword"
                  value={metaKeyword}
                  required
                  onChange={(e) => setMetaKeyword(e.target.value)}
                />
              </div>
            </div>

            {errorMessage && (
              <div className="text-danger col-12 mt-2">{errorMessage}</div>
            )}{validationError && (
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

export default AddBlog;
