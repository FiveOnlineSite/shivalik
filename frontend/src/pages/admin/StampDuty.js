import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../components/atoms/AdminLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StampDuty = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [male, setMale] = useState("");
  const [female, setFemale] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchStampDuty = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/stamp-duty`);
        const StampDutyData = response.data.StampDuty;

        setMale(StampDutyData.male || "");
        setFemale(StampDutyData.female || "");
    } catch (error) {
        console.error("Error fetching stamp duty data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStampDuty();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios.patch(
        `${apiUrl}/api/stamp-duty`,
        {
          male,
          female
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Stamp Duty content updated successfully!");
      setTimeout(() => {
        navigate("/admin/edit/stamp-duty-calculator");
      }, 1000);
    } catch (error) {
      console.error("Error updating stamp duty data:", error);
             toast.error(error.response?.data?.message || "Failed to update knit about content");
      
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit Stamp Duty Calculator</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Male</label>
                 <input
                  type="text"
                  name="male"
                  required
                  value={male}
                  onChange={(e) => setMale(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Female</label>
                <input
                  type="text"
                  name="female"
                  required
                  value={female}
                  onChange={(e) => setFemale(e.target.value)}
                />
              </div>
            </div>


            {errorMessage && (
              <div className="text-danger col-12 mt-2">{errorMessage}</div>
            )}

            <div className="col-12">
              <div className="theme-form">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="d-flex align-items-center">
                      <span
                        className="spinner-border me-2"
                        role="status"
                      ></span>
                      Save
                    </div>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default StampDuty;
