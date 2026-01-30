import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../components/atoms/AdminLayout"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddCSR = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
setValidationError("")

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);

      await axios.post(`${apiUrl}/api/csr`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });

      navigate("/admin/csr");
      toast.success("CSR created successfully!");
      
    } catch (error) {
      console.error("Error adding csr:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      toast.error("Failed to create csr");
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add CSR</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">

            {/* Alt */}
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

            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="theme-form">
                            <label>Content</label>
                            <CKEditor
                              editor={ClassicEditor}
                              data={description}
                              required
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

export default AddCSR;
