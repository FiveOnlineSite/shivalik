import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";


const AddFAQContent = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [faqcategories, setFaqCategories] = useState([]);
  const [faqCategory, setFaqCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const access_token = localStorage.getItem("access_token");
        const apiUrl = process.env.REACT_APP_API_URL;

        const res = await axios.get(`${apiUrl}/api/faq-category`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        setFaqCategories(res.data.categories || []); // adjust key based on your API
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;


      await axios.post(
        `${apiUrl}/api/faq-content`,
        {
           faq_category: faqCategory,
          question: question,
          answer: answer,
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
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
        <h2>Add FAQ Content</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* category Dropdown */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>FAQ Category</label>
                <select
                  required
                  value={faqCategory}
                  onChange={(e) => setFaqCategory(e.target.value)}
                  className="form-control"
                >
                  <option selected disabled value="">
                    Select Category
                  </option>
                  {faqcategories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Yellow Title */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Question</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
              </div>
            </div>


            {/* Content */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Answer</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={answer}
                  required
                  onChange={(event, editor) => {
                                                                                                 const data = editor.getData();
                                                                                                 setAnswer(data);
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

export default AddFAQContent;
