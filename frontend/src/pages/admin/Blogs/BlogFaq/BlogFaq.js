import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../components/atoms/AdminLayout";

import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BlogFAQ = () => {
  const [BlogFAQ, setBlogFAQ] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogFAQ = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;

        const response = await axios({
          method: "GET",
          baseURL: `${apiUrl}/api/`,
          url: "blog-faq",
        });

        setBlogFAQ(response.data.BlogFaqs);
        console.log("contents", response.data.BlogFaqs);
      } catch (error) {
        console.error("Error fetching blog faq:", error);
      }
    };

    fetchBlogFAQ();
  }, []);

  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete blog faq ?`
    );
    if (!confirmDelete) return; // Exit if user cancels
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios({
        method: "DELETE",
        baseURL: `${apiUrl}/api/`,
        url: `blog-faq/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setBlogFAQ(null);
      console.log(response.data);
      setBlogFAQ(
        BlogFAQ.filter((BlogFAQ) => BlogFAQ._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/blog-faq");
      }, 3000);
      toast.success("Blog FAQ deleted successfully!");

    } catch (error) {
      console.error("Error deleting faq content:", error);
      toast.error("Failed to delete blog faq content");
      
    }
  };
  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Blog FAQ
          <NavLink to="/admin/add/blog-faqs" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Blog FAQ Content
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
                    <th>Blog</th>
                    <th className="text-center">Question</th>
                    <th className="text-center">Answer</th>

                  </tr>
                </thead>
                <tbody>
                  {BlogFAQ &&
                    BlogFAQ.map((content) => (
                      <tr key={content._id}>
                        <td >{content.blog.title}</td>
                        <td className="text-center">{content.question}</td>
                        <td className="text-center">{content.answer}</td>

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/blog-faqs/${content._id}`}
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

export default BlogFAQ;
