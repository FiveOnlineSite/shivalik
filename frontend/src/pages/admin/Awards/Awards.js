import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../components/atoms/AdminLayout"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Awards = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [awards, setAwards] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/award`);
        const AwardsData = response.data.awards;

        setAwards(AwardsData);
       
        
      } catch (error) {
        console.error("Error fetching awards:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAwards();
  }, []);

  const handleDeleteAwards = async (id) => {
    const confirmDelete = window.confirm(
      "  Are you sure you want to delete this award?"
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/award/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data);
      setAwards((prev) => prev.filter((award) => award._id !== id));
      setTimeout(() => {
        navigate("/admin/awards-recognition");
      }, 3000);
      toast.success("Award deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting award:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete award"
      );
      toast.error("Failed to delete award");
      
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Awards
          <NavLink to="/admin/add/awards-recognition" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Award
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
                    <th>Image</th>
                    <th className="text-center">Alt</th>
                    <th className="text-center">Sequence</th>

                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {awards &&
                    awards.map((award) => (
                      <tr key={award._id}>

                        <td>
                          {award.image[0]?.filepath && (
                            <img
                              src={award.image[0]?.filepath}
                              alt={award.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center">{award.alt}</td>
                        <td className="text-center">{award.sequence}</td>


                        <td className="text-center">
                          <Link
                            to={`/admin/edit/awards-recognition/${award._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteAwards(award._id)
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

export default Awards;
