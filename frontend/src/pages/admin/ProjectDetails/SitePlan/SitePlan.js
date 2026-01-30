import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { toast } from "react-toastify";

const SitePlan = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [SitePlan, setSitePlan] = useState("");

  useEffect(() => {
    const fetchSitePlan = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/site-plan`);
        const SitePlanData = response.data.SitePlans;

        setSitePlan(SitePlanData);
        console.log("Fetched name:", SitePlanData.title);
     } catch (error) {
        console.error("Error fetching SitePlans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSitePlan();
  }, []);

 const handleDeleteSitePlan = async (id, site_plan) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this ${site_plan} SitePlan?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(`${apiUrl}/api/site-plan/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      setSitePlan(null);
      console.log(response.data);
      setSitePlan(
        SitePlan.filter((SitePlan) => SitePlan._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/site-plans");
      }, 3000);

      toast.success("SitePlan deleted successfully!");

    } catch (error) {
      console.error("Error deleting SitePlan:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete SitePlan"
      );
      toast.error("Failed to delete Site Plan");

    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
         SitePlans 
          <NavLink to="/admin/add/site-plans" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Site Plan
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
                    <th className="text-center">Site Plan</th>
                     <th className="text-center">FLoor Plan</th>
                     <th className="text-center">Alt</th>
                    <th className="text-center">Unit Plan</th>
                    <th className="text-center">Alt</th>

                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {SitePlan &&
                    SitePlan.map((SitePlan) => (
                      <tr key={SitePlan._id}>
                        <td>{SitePlan.project.title}</td>

                        <td className="text-center">{SitePlan.site_plan}</td>
                         <td className="text-center">
                          {SitePlan.floor_plan?.[0]?.filepath && (
                            <img
                              src={SitePlan.floor_plan?.[0]?.filepath}
                              alt={SitePlan.floor_plan_alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center">{SitePlan.floor_plan_alt}</td>
                        
                        <td className="text-center">
                          {SitePlan.unit_plan?.[0]?.filepath && (
                            <img
                              src={SitePlan.unit_plan?.[0]?.filepath}
                              alt={SitePlan.unit_plan_alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                         <td className="text-center">{SitePlan.unit_plan_alt}</td>
                         <td className="text-center">
                          <Link
                            to={`/admin/edit/site-plans/${SitePlan._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteSitePlan(SitePlan._id, SitePlan.site_plan)
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

export default SitePlan;

