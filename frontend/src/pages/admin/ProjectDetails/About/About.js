import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { toast } from "react-toastify";

const About = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [About, setAbout] = useState([]);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/about`);
        const AboutData = response.data.Abouts;
        setAbout(AboutData);

      } catch (error) {
        console.error("Error fetching project about:", error);
      } 
    };

    fetchAbout();
  }, []);

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this about?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/about/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setAbout(null);
      console.log(response.data);
      setAbout(
        About.filter((About) => About._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/abouts");
      }, 3000);

      toast.success("About deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting about:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete about"
      );

      toast.error("Failed to delete about");
      
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          About
          <NavLink to="/admin/add/abouts" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add About
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
                    <th className="text-center">Image</th>
                    <th className="text-center">Alt</th>
                    <th className="text-center">Description</th>
                    <th className="text-center">Contact</th>
                    <th className="text-center">Brochure</th>

                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {About &&
                    About.map((about) => (
                      <tr key={about._id}>
                        <td>{about.project.title}</td>

                        <td className="text-center">
                          {about.image[0]?.filepath && (
                            <img
                              src={about.image[0]?.filepath}
                              alt={about.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {about.alt}</td>
                        <td className="text-center"> {about.description}</td>
                        <td className="text-center"> {about.contact}</td>
                        <td className="text-center">
                            {about.brochure?.[0]?.filepath && (
                                 <a
                                href={`${about.brochure?.[0]?.filepath}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                📄 View PDF - {about.brochure?.[0]?.filename}
                            </a>
                            )}
                            
                        </td>

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/abouts/${about._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteProduct(
                                about._id,
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

export default About;
