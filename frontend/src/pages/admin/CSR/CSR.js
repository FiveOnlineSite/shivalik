import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../components/atoms/AdminLayout"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminCSR = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [csr, setCsr] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchcsr = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/csr`);
        const csrData = response.data.csr;

        setCsr(csrData);
       
      } catch (error) {
        console.error("Error fetching csr:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchcsr();
  }, []);

  const handleDeletecsr = async (id) => {
    const confirmDelete = window.confirm(
      "  Are you sure you want to delete this award?"
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/csr/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data);
      setCsr((prev) => prev.filter((csr) => csr._id !== id));
      setTimeout(() => {
        navigate("/admin/csr");
      }, 3000);
      toast.success("csr deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting csr:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete csr"
      );
      toast.error("Failed to delete csr");
      
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          CSR
          <NavLink to="/admin/add/csr" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add CSR
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
                    <th>Title</th>
                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {csr &&
                    csr.map((csr) => (
                      <tr key={csr._id}>

                        <td>{csr.title}</td>
                      

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/csr/${csr._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeletecsr(csr._id)
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

export default AdminCSR;
