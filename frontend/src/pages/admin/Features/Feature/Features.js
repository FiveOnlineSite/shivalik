import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { toast } from "react-toastify";

const Features = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [Features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/feature`);
        const FeaturesData = response.data.Features;
        setFeatures(FeaturesData);

      } catch (error) {
        console.error("Error fetching project Feature:", error);
      } 
    };

    fetchFeatures();
  }, []);

  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this ${title} Feature?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/feature/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setFeatures(null);
      console.log(response.data);
      setFeatures(
        Features.filter((Features) => Features._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/features");
      }, 3000);

      toast.success("Feature deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting Feature:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete Feature"
      );

      toast.error("Failed to delete Feature");
      
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Features
          <NavLink to="/admin/add/features" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Feature
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
                    <th className="text-center">Title</th>
                    <th className="text-center">Description</th>
                    <th className="text-center">Image</th>
                    <th className="text-center">Alt</th>

                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {Features &&
                    Features.map((Features) => (
                      <tr key={Features._id}>
                        <td>{Features.project.title}</td>
                        <td className="text-center">{Features.title}</td>
                        <td className="text-center">{Features.description}</td>

                        <td className="text-center">
                          {Features.image[0]?.filepath && (
                            <img
                              src={Features.image[0]?.filepath}
                              alt={Features.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {Features.alt}</td>

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/features/${Features._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(
                                Features._id,
                                Features.title
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

export default Features;
