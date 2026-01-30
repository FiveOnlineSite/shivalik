import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { toast } from "react-toastify";

const Status = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [Status, setStatus] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/current-status`);
        const StatusData = response.data.Statuses;
        setStatus(StatusData);

      } catch (error) {
        console.error("Error fetching project Statuses:", error);
      } 
    };

    fetchStatus();
  }, []);

  const handleDeleteStatus = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this status?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/current-status/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setStatus(null);
      console.log(response.data);
      setStatus(
        Status.filter((Status) => Status._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/current-status");
      }, 3000);

      toast.success("Status deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting Status:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete Status"
      );

      toast.error("Failed to delete Status");
      
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Current Status
          <NavLink to="/admin/add/current-status" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Status
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
                    <th className="text-center">Date</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Possession By</th>
                    <th className="text-center">MahaRERA</th>
                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {Status &&
                    Status.map((Status) => (
                      <tr key={Status._id}>
                        <td>{Status.project.title}</td>
                        <td className="text-center">{new Date(
                            Status.date
                          ).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}</td>

                        <td className="text-center"> {Status.status}</td>
                        <td className="text-center">{new Date(
                            Status.possession
                          ).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}</td>
                        <td className="text-center"> {Status.maharera}</td>
                       

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/current-status/${Status._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteStatus(
                                Status._id,
                              )
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

export default Status;
