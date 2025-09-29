import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../components/atoms/AdminLayout";

import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProjectFAQ = () => {
  const [ProjectFAQ, setProjectFAQ] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectFAQ = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;

        const response = await axios({
          method: "GET",
          baseURL: `${apiUrl}/api/`,
          url: "faq",
        });

        setProjectFAQ(response.data.FAQs);
        console.log("FAQs", response.data.FAQs);
      } catch (error) {
        console.error("Error fetching faqs:", error);
      }
    };

    fetchProjectFAQ();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete faq?`
    );
    if (!confirmDelete) return; // Exit if user cancels
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios({
        method: "DELETE",
        baseURL: `${apiUrl}/api/`,
        url: `faq/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setProjectFAQ(null);
      console.log(response.data);
      setProjectFAQ(
        ProjectFAQ.filter((ProjectFAQ) => ProjectFAQ._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/faq");
      }, 3000);
      toast.success("FAQ deleted successfully!");

    } catch (error) {
      console.error("Error deleting faq:", error);
      toast.error("Failed to delete faq");
      
    }
  };
  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          FAQs
          <NavLink to="/admin/add/project-faqs" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add FAQ
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
                    <th>Project</th>
                    <th className="text-center">Question</th>
                    <th className="text-center">Answer</th>

                  </tr>
                </thead>
                <tbody>
                  {ProjectFAQ &&
                    ProjectFAQ.map((faq) => (
                      <tr key={faq._id}>
                        <td >{faq.project.title}</td>
                        <td className="text-center">{faq.question}</td>
                        <td className="text-center">{faq.answer}</td>


                        <td className="text-center">
                          <Link
                            to={`/admin/edit/project-faqs/${faq._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(faq._id)
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

export default ProjectFAQ;
