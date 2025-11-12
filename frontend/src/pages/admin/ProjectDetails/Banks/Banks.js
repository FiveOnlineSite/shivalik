import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { toast } from "react-toastify";

const Banks = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [Banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/bank`);
        const BanksData = response.data.Banks;
        setBanks(BanksData);

      } catch (error) {
        console.error("Error fetching project Banks:", error);
      } 
    };

    fetchBanks();
  }, []);

  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this bank?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/bank/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setBanks(null);
      console.log(response.data);
      setBanks(
        Banks.filter((Banks) => Banks._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/banks");
      }, 3000);

      toast.success("Bank deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting bank:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete bank"
      );

      toast.error("Failed to delete bank");
      
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Banks
          <NavLink to="/admin/add/banks" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Bank
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
                  {Banks &&
                    Banks.map((Banks) => (
                      <tr key={Banks._id}>
                        <td>{Banks.project.title}</td>
                        <td className="text-center">{Banks.title}</td>

                        <td className="text-center">
                          {Banks.image[0]?.filepath && (
                            <img
                              src={Banks.image[0]?.filepath}
                              alt={Banks.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {Banks.alt}</td>

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/banks/${Banks._id}`}
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
                                Banks._id
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

export default Banks;
