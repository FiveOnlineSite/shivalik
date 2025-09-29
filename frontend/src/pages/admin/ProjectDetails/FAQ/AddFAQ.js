import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";


const AddProjectFAQ = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
   const [projects, setProjects] = useState([]);
    const [project, setProject] = useState("");
    const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
      const fetchProjects = async () => {
        try {
          const access_token = localStorage.getItem("access_token");
          const apiUrl = process.env.REACT_APP_API_URL;
  
          const res = await axios.get(`${apiUrl}/api/project/banners`, {
            headers: { Authorization: `Bearer ${access_token}` },
          });
  
          const filtered = (res.data.Projects || []).filter(
              (pro) => pro.banner && pro.banner.length > 0
              );
              setProjects(filtered);
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      };
      fetchProjects();
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
        `${apiUrl}/api/faq`,
        {
           project: project,
          question: question,
          answer: answer,
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      setTimeout(() => {
        navigate("/admin/project-faqs");
      }, 1000);
      toast.success("FAQ created successfully!");
      
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
        <h2>Add FAQ</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Project</label>
                <select
                  required
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="form-control"
                >
                  <option disabled value="">
                    Select Project
                  </option>
                  {projects.map((pro) => (
                    <option key={pro._id} value={pro._id}>
                      {pro.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

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

export default AddProjectFAQ;
