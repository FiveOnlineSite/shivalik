import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout";

import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";

const EditBlogFaq = () => {
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
    blog: "",
  });

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchblogs = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const access_token = localStorage.getItem("access_token");
        const response = await axios.get(`${apiUrl}/api/blog`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        setBlogs(response.data.Blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchblogs();
  }, []);

  useEffect(() => {
    const fetchFAQContent = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/blog-faq/${id}`
        );
        const faqContentData = response.data.BlogFaq;
        setFaqContent(faqContentData);

        console.log("faq data", faqContentData);

        setFormData({
          question: faqContentData.question,
          answer: faqContentData.answer,
          blog: faqContentData.blog || "",
        });

    
      } catch (error) {
        console.error("Error fetching blog faq content:", error);
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
        `${apiUrl}/api/blog-faq/${id}`,
        {
          question: formData.question,
          answer: formData.answer,
          blog: formData.blog,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTimeout(() => {
        navigate("/admin/blog-faqs");
      }, 1000);
      toast.success("Blog FAQ content created successfully!");
    } catch (error) {
      console.error("Error adding blog faq content:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      toast.error("Failed to create blog faq content");
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit Blog FAQ Content</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Blog</label>
                <select
                  required
                  name="blog"
                  value={formData.blog}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option disabled>
                    Select Blog
                  </option>
                  {blogs &&
                    blogs.map((blog) => (
                      <option key={blog._id} value={blog._id}>
                        {blog.title}
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

export default EditBlogFaq;
