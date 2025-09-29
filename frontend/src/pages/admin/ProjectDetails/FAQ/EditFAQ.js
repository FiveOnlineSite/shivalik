import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout";

import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";

const EditProjectFAQ = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [faq, setFaq] = useState("");

  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    project: "",
  });

  const [projects, setProjects] = useState([]);
  

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
    const fetchFaq = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/faq/${id}`
        );
        const faqData = response.data.FAQ;
        setFaq(faqData);

        console.log("faq data", faqData);

        setFormData({
          question: faqData.question,
          answer: faqData.answer,
          project: faqData.project || "",
        });

    
      } catch (error) {
        console.error("Error fetching faq:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaq();
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
        `${apiUrl}/api/faq/${id}`,
        {
          question: formData.question,
          answer: formData.answer,
          project: formData.project,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTimeout(() => {
        navigate("/admin/project-faqs");
      }, 1000);
      toast.success("FAQ added successfully!");
    } catch (error) {
      console.error("Error adding faq:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      toast.error("Failed to create faq");
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit FAQ</h2>
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

export default EditProjectFAQ;
