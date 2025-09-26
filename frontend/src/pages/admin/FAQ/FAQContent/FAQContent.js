import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../components/atoms/AdminLayout";

import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const FAQContent = () => {
  const [FAQContent, setFAQContent] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFAQContent = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;

        // const response = await axios.get("/api/user/allUsers");
        const response = await axios({
          method: "GET",
          baseURL: `${apiUrl}/api/`,
          url: "faq-content",
        });

        setFAQContent(response.data.Contents);
        console.log("contents", response.data.Contents);
      } catch (error) {
        console.error("Error fetching faq content:", error);
      }
    };

    fetchFAQContent();
  }, []);

  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete faq ?`
    );
    if (!confirmDelete) return; // Exit if user cancels
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios({
        method: "DELETE",
        baseURL: `${apiUrl}/api/`,
        url: `faq-content/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setFAQContent(null);
      console.log(response.data);
      setFAQContent(
        FAQContent.filter((FAQContent) => FAQContent._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/faq-contents");
      }, 3000);
      toast.success("FAQ content deleted successfully!");

    } catch (error) {
      console.error("Error deleting faq content:", error);
      toast.error("Failed to delete faq content");
      
    }
  };
  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          FAQ Contents
          <NavLink to="/admin/add/faq-contents" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add FAQ Content
          </NavLink>
        </h2>
      </div>
      <div className="row mobilerows">
        <div className="col-md-12">
          <div className="infos-table">
            <div className="table-responsive">
              <table id="example" className="table nowrap">
                <thead>
                  <tr>
                    <th>FAQ Category</th>
                    <th className="text-center">Question</th>
                    <th className="text-center">Answer</th>

                  </tr>
                </thead>
                <tbody>
                  {FAQContent &&
                    FAQContent.map((content) => (
                      <tr key={content._id}>
                        <td >{content.faq_category.title}</td>
                        <td className="text-center">{content.question}</td>
                        <td className="text-center">{content.answer}</td>


                        <td className="text-center">
                          <Link
                            to={`/admin/edit/faq-contents/${content._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(content._id)
                            }
                          >
                            <i className="las la-trash"></i>{" "}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default FAQContent;
