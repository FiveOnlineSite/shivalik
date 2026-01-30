import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { toast } from "react-toastify";

const Counter = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [counters, setCounters] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/counter`);
        const counterData = response.data.counters;

        setCounters(counterData);
      } catch (error) {
        console.error("Error fetching counters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounters();
  }, []);

  const handleDeleteCounter = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this counter?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/counter/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data);
      setCounters((prev) => prev.filter((counter) => counter._id !== id));
      setTimeout(() => {
        navigate("/admin/counters");
      }, 3000);
      toast.success("Counter deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting counter:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete counter"
      );
      toast.error("Failed to delete counter");
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
         Counters
          <NavLink to="/admin/add/counters" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add counter
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
                    <th>Number</th>
                    <th className="text-center">Title</th>

                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {counters &&
                    counters.map((counter) => (
                      <tr key={counter._id}>
                        <td> {counter.number}</td>

                        <td className="text-center">{counter.title}</td>
        
                        <td className="text-center">
                          <Link
                            to={`/admin/edit/counters/${counter._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteCounter(counter._id)
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

export default Counter;
