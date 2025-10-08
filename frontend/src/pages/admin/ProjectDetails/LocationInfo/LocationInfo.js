import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { toast } from "react-toastify";

const LocationInfo = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [location, setLocation] = useState([]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/location`);
        const LocationData = response.data.Locations;
        setLocation(LocationData);

      } catch (error) {
        console.error("Error fetching project Locations:", error);
      } 
    };

    fetchLocation();
  }, []);

  const handleDeletelocation = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this location?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/location/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setLocation(null);
      console.log(response.data);
      setLocation(
        location.filter((location) => location._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/location");
      }, 3000);

      toast.success("Location deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting location:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete location"
      );
      toast.error("Failed to delete location");
    }
  };

  return (
    <AdminLayout>      
        <div className="pages-headers ">
        <h2>
          Location
          <NavLink to="/admin/add/location" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Location
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
                    <th className="text-center">Map Link</th>
                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {location &&
                    location.map((location) => (
                      <tr key={location._id}>
                        <td>{location.project.title}</td>
                        <td className="text-center">{location.map_link}</td>

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/location/${location._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeletelocation(
                                location._id,
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

export default LocationInfo;
