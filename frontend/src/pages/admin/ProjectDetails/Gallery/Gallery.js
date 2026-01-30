import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { toast } from "react-toastify";

const Gallery = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [Gallery, setGallery] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/gallery`);
        const GalleryData = response.data.Galleries;
        setGallery(GalleryData);

      } catch (error) {
        console.error("Error fetching project gallery:", error);
      } 
    };

    fetchGallery();
  }, []);

  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this image?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/gallery/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setGallery(null);
      console.log(response.data);
      setGallery(
        Gallery.filter((Gallery) => Gallery._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/gallery");
      }, 3000);

      toast.success("Image deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting image:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete image"
      );

      toast.error("Failed to delete image");
      
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Gallery
          <NavLink to="/admin/add/gallery" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Gallery
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

                    <th className="text-center">Edit</th>
                  </tr>
                </thead>

                <tbody>
                  {Gallery &&
                    Gallery.map((Gallery) => (
                      <tr key={Gallery._id}>
                        <td>{Gallery.project.title}</td>
                        <td className="text-center">
                          {Gallery.image[0]?.filepath && (
                            <img
                              src={Gallery.image[0]?.filepath}
                              alt={Gallery.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {Gallery.alt}</td>

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/gallery/${Gallery._id}`}
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
                                Gallery._id
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

export default Gallery;
