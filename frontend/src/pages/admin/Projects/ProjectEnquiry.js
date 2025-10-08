import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/atoms/AdminLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProjectEnquiry = () => {
  const [ProjectEnquiry, setProjectEnquiry] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectEnquiry = async () => {
      try {
          const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

        const response = await axios({
          method: "GET",
          baseURL: `${apiUrl}/api/`,
          url: "project-enquiry",
          headers: {
          Authorization: `Bearer ${access_token}`,
        },
        });

        const ProjectEnquiryData = response.data.Enquiries;

        const sortedProjectEnquiry = [...ProjectEnquiryData].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setProjectEnquiry(sortedProjectEnquiry);
      } catch (error) {
        console.error("Error fetching ProjectEnquiry:", error);
      }
    };

    fetchProjectEnquiry();
  }, []);

  const handleDelete = async (id) => {
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios({
        method: "DELETE",
        baseURL: `${apiUrl}/api/`,
        url: `contact-response/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      setProjectEnquiry((prev) => prev.filter((ProjectEnquiry) => ProjectEnquiry._id !== id));
              toast.success("ProjectEnquiry deleted successfully!");

    } catch (error) {
      console.error("Error deleting ProjectEnquiry:", error);
    }
  };

  const filteredProjectEnquirys = ProjectEnquiry.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="pages-headers">
        <div className="row align-items-center justify-content-center">
            <h2>Project Enquiry Responses</h2>
        </div>
      </div>

      <div className="row mobilerows">
        <div className="col-md-12">
          <div className="infos-table">
            <div className="table-responsive">
              <table className="table nowrap">
                <thead>
                  <tr>
                    <th>Page</th>

                    <th className="text-center">Name</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Phone</th>
                    <th className="text-center">Date & Time</th>

                    {/* <th className="text-center">Delete</th> */}
                  </tr>
                </thead>
                <tbody>
                  {filteredProjectEnquirys.length > 0 ? (
                    filteredProjectEnquirys.map((ProjectEnquiry) => (
                      <tr key={ProjectEnquiry._id}>
                        <td>{ProjectEnquiry.page}</td>
                        <td className="text-center">{ProjectEnquiry.name}</td>
                        <td className="text-center">{ProjectEnquiry.email}</td>
                        <td className="text-center">{ProjectEnquiry.phone}</td>
                        <td className="text-center">
                          {new Date(ProjectEnquiry.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              timeZone: "Asia/Kolkata",
                            }
                          )}{" "}
                          at{" "}
                          {new Date(ProjectEnquiry.createdAt).toLocaleTimeString(
                            "en-IN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              timeZone: "Asia/Kolkata",
                            }
                          )}
                        </td>
                        {/* <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(ProjectEnquiry._id)}
                          >
                            <i className="las la-trash"></i>
                          </button>
                        </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Contact data found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProjectEnquiry;
