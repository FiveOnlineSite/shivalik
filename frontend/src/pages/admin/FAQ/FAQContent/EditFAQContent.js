import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout";

import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";

const EditFAQContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [faqContent, setFaqContent] = useState("");

  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    faq_category: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const access_token = localStorage.getItem("access_token");
        const response = await axios.get(`${apiUrl}/api/faq-category`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFAQContent = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/faq-content/${id}`
        );
        const faqContentData = response.data.Content;
        setFaqContent(faqContentData);

        console.log("faq data", faqContentData);

        setFormData({
          question: faqContentData.question,
          answer: faqContentData.answer,
          faq_category: faqContentData.faq_category || "",
        });

    
      } catch (error) {
        console.error("Error fetching faq content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFAQContent();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios.patch(
        `${apiUrl}/api/faq-content/${id}`,
        {
          question: formData.question,
          answer: formData.answer,
          faq_category: formData.faq_category,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTimeout(() => {
        navigate("/admin/faq-contents");
      }, 1000);
      toast.success("FAQ content created successfully!");
    } catch (error) {
      console.error("Error adding faq content:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      toast.error("Failed to create faq content");
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit FAQ Content</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>FAQ Category</label>
                <select
                  required
                  name="faq_category"
                  value={formData.faq_category}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option disabled>
                    Select Category
                  </option>
                  {categories &&
                    categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.title}
                      </option>
                    ))}
                </select>
              </div>
            </div>


            <div className="col-lg-6">
              <div className="theme-form">
                <label>Question</label>
                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Answer</label>
                 <CKEditor
                   editor={ClassicEditor}
                   data={formData.answer}
                   required
                   onChange={(event, editor) => {
                                                                                                                                          const data = editor.getData();
                                                                                                                                           setFormData((prev) => ({ ...prev, answer: data }));
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

export default EditFAQContent;
