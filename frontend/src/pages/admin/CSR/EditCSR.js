import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../components/atoms/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { toast } from "react-toastify";

const EditCSR = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [validationError, setValidationError] = useState("");
const {id} = useParams()
  const [isLoading, setIsLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
const [formData, setFormData] = useState({
  title: "",
  description: "",
})

  useEffect(() => {
    const fetchCSR = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/csr/${id}`);
        const CSRData = response.data.csr;

        setFormData({
          title: CSRData.title,
          description: CSRData.description,
        })

      } catch (error) {
        console.error("Error fetching csr data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCSR();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
 setErrorMessage("");
    setValidationError("");
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }

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

  setValidationError("");
   setErrorMessage("");
    setIsSubmitting(true);

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title || "");
      formDataToSend.append("description", formData.description || "");

      await axios.patch(`${apiUrl}/api/csr/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("CSR content updated successfully!");
      setTimeout(() => {
        navigate("/admin/csr");
      }, 1000);
    } catch (error) {
      console.error("Error updating CSR data:", error);
             toast.error(error.response?.data?.message || "Failed to update knit about content");
      
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit CSR</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="theme-form">
                <label>Title</label>
           <input type="text" name="title" value={formData.title} required onChange={handleChange}/>
              </div>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                         <div className="theme-form">
                           <label>Content</label>
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

export default EditCSR;
