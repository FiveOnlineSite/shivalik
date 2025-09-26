import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { toast } from "react-toastify";

const FeaturesContent = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [FeaturesContent, setFeaturesContent] = useState([]);

  useEffect(() => {
    const fetchFeaturesContent = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/feature-content`);
        const FeaturesContentData = response.data.FeaturesContents;
        setFeaturesContent(FeaturesContentData);

      } catch (error) {
        console.error("Error fetching project Feature Content:", error);
      } 
    };

    fetchFeaturesContent();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this Feature Content?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/feature-content/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setFeaturesContent(null);
      console.log(response.data);
      setFeaturesContent(
        FeaturesContent.filter((FeaturesContent) => FeaturesContent._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/feature-contents");
      }, 3000);

      toast.success("Features Content deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting Features Content:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete Features Content"
      );

      toast.error("Failed to delete Features Content");
      
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Feature Content
          <NavLink to="/admin/add/feature-contents" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Feature Content
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

                    <th className="text-center">Image</th>
                    <th className="text-center">Alt</th>

                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {FeaturesContent &&
                    FeaturesContent.map((FeaturesContent) => (
                      <tr key={FeaturesContent._id}>
                        <td>{FeaturesContent.project.title}</td>
                        <td className="text-center"> {FeaturesContent.title}</td>

                        <td className="text-center">
                          {FeaturesContent.image[0]?.filepath && (
                            <img
                              src={FeaturesContent.image[0]?.filepath}
                              alt={FeaturesContent.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {FeaturesContent.alt}</td>

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/feature-contents/${FeaturesContent._id}`}
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
                                FeaturesContent._id,
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

export default FeaturesContent;
