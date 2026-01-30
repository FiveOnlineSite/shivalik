import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { toast } from "react-toastify";

const Highlights = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [Highlights, setHighlights] = useState([]);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/highlight`);
        const HighlightsData = response.data.Highlights;
        setHighlights(HighlightsData);

      } catch (error) {
        console.error("Error fetching project highlight:", error);
      } 
    };

    fetchHighlights();
  }, []);

  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this ${title} highlight?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/highlight/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setHighlights(null);
      console.log(response.data);
      setHighlights(
        Highlights.filter((Highlights) => Highlights._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/highlights");
      }, 3000);

      toast.success("Highlight deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting highlight:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete highlight"
      );

      toast.error("Failed to delete highlight");
      
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Highlights
          <NavLink to="/admin/add/highlights" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Highlight
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
                  {Highlights &&
                    Highlights.map((Highlights) => (
                      <tr key={Highlights._id}>
                        <td>{Highlights.project.title}</td>
                        <td className="text-center">{Highlights.title}</td>
                        <td className="text-center">
                          {Highlights.image[0]?.filepath && (
                            <img
                              src={Highlights.image[0]?.filepath}
                              alt={Highlights.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {Highlights.alt}</td>

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/highlights/${Highlights._id}`}
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
                                Highlights._id, Highlights.title
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

export default Highlights;
