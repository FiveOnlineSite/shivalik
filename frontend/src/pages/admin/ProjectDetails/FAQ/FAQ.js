import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProjectFAQ = () => {
  const [projectFAQs, setProjectFAQs] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectFAQ = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/faq`);
        const faqs = response.data.FAQs;

        // Group FAQs by project title
        const grouped = faqs.reduce((acc, faq) => {
          const title = faq.project.title;
          if (!acc[title]) acc[title] = [];
          acc[title].push(faq);
          return acc;
        }, {});

        setProjectFAQs(grouped);
        console.log("Grouped FAQs:", grouped);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchProjectFAQ();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this FAQ?");
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios.delete(`${apiUrl}/api/faq/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      // Remove deleted FAQ from state
      const updatedFAQs = { ...projectFAQs };
      for (const project in updatedFAQs) {
        updatedFAQs[project] = updatedFAQs[project].filter(faq => faq._id !== id);
        // Remove project if no FAQs left
        if (updatedFAQs[project].length === 0) delete updatedFAQs[project];
      }
      setProjectFAQs(updatedFAQs);

      toast.success("FAQ deleted successfully!");
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      toast.error("Failed to delete FAQ");
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          FAQs
          <NavLink to="/admin/add/project-faqs" className="theme-cta">
            <i className="las la-plus-circle"></i> Add FAQ
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
                    <th className="text-center">Edit</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(projectFAQs).map(([projectName, faqs]) => (
                    <React.Fragment key={projectName}>
                      {/* Project row */}
                      {/* <tr>
                        <td colSpan="5" style={{ fontWeight: "bold", background: "#f0f0f0" }}>
                          {projectName}
                        </td>
                      </tr> */}
                      {/* FAQs under project */}
                      {faqs.map((faq) => (
                        <tr key={faq._id}>
                          <td> {projectName}</td>
                          <td className="text-center">{faq.question}</td>
                          <td className="text-center">{faq.answer}</td>
                          <td className="text-center">
                            <Link to={`/admin/edit/project-faqs/${faq._id}`} title="Edit">
                              <i className="las la-pencil-alt"></i>
                            </Link>
                          </td>
                          <td className="text-center">
                            <button className="delete-btn" onClick={() => handleDelete(faq._id)}>
                              <i className="las la-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
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
