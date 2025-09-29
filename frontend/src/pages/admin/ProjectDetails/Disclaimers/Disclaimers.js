import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { toast } from "react-toastify";

const Disclaimers = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [Disclaimers, setDisclaimers] = useState([]);

  useEffect(() => {
    const fetchDisclaimers = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/disclaimer`);
        const DisclaimersData = response.data.disclaimers;
        setDisclaimers(DisclaimersData);

      } catch (error) {
        console.error("Error fetching project Disclaimers:", error);
      } 
    };

    fetchDisclaimers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this disclaimer?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/disclaimer/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setDisclaimers(null);
      console.log(response.data);
      setDisclaimers(
        Disclaimers.filter((Disclaimers) => Disclaimers._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/disclaimers");
      }, 3000);

      toast.success("disclaimer deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting disclaimer:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete disclaimer"
      );

      toast.error("Failed to delete disclaimer");
      
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Disclaimers
          <NavLink to="/admin/add/disclaimers" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Disclaimer
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
                    <th className="text-center">QR</th>
                    <th className="text-center">Alt</th>
                    <th className="text-center">Registeration No.</th>


                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {Disclaimers &&
                    Disclaimers.map((Disclaimers) => (
                      <tr key={Disclaimers._id}>
                        <td>{Disclaimers.project.title}</td>
                        <td className="text-center">{Disclaimers.description}</td>
                        <td className="text-center">
                          {Disclaimers.qr[0]?.filepath && (
                            <img
                              src={Disclaimers.qr[0]?.filepath}
                              alt={Disclaimers.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {Disclaimers.alt}</td>
                        <td className="text-center"> {Disclaimers.registration_no}</td>

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/disclaimers/${Disclaimers._id}`}
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
                                Disclaimers._id
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

export default Disclaimers;
