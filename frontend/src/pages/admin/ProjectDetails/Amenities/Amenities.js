import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { toast } from "react-toastify";

const Amenities = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [Amenities, setAmenities] = useState([]);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/amenity`);
        const AmenitiesData = response.data.Amenities;
        setAmenities(AmenitiesData);

      } catch (error) {
        console.error("Error fetching project amenities:", error);
      } 
    };

    fetchAmenities();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this amenity?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/amenity/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setAmenities(null);
      console.log(response.data);
      setAmenities(
        Amenities.filter((Amenities) => Amenities._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/amenities");
      }, 3000);

      toast.success("Amenity deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting amenity:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete amenity"
      );

      toast.error("Failed to delete amenity");
      
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Amenities
          <NavLink to="/admin/add/amenities" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Amenity
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
                    <th className="text-center">Description</th>
                    <th className="text-center">Image</th>
                    <th className="text-center">Alt</th>

                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {Amenities &&
                    Amenities.map((Amenities) => (
                      <tr key={Amenities._id}>
                        <td>{Amenities.project.title}</td>
                        <td className="text-center">{Amenities.description}</td>
                        <td className="text-center">
                          {Amenities.image[0]?.filepath && (
                            <img
                              src={Amenities.image[0]?.filepath}
                              alt={Amenities.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {Amenities.alt}</td>

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/Amenities/${Amenities._id}`}
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
                                Amenities._id, Amenities.title
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

export default Amenities;
