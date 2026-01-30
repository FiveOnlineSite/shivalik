import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";


const AddBlogFaq = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const access_token = localStorage.getItem("access_token");
        const apiUrl = process.env.REACT_APP_API_URL;

        const res = await axios.get(`${apiUrl}/api/blog`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        setBlogs(res.data.Blogs || []); // adjust key based on your API
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
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
        `${apiUrl}/api/blog-faq`,
        {
           blog,
          question: question,
          answer: answer,
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
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
        <h2>Add Blog FAQ Content</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* category Dropdown */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Blog</label>
                <select
                  required
                  value={blog}
                  onChange={(e) => setBlog(e.target.value)}
                  className="form-control"
                >
                  <option selected disabled value="">
                    Select Blog
                  </option>
                  {blogs.map((blog) => (
                    <option key={blog._id} value={blog._id}>
                      {blog.title}
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

export default AddBlogFaq;
