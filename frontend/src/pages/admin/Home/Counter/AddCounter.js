import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCounter = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
 const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
 const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (errorMessage) {
                              toast.error(errorMessage);
                              return;
                            }
        
            if (validationError) {
                              toast.error(validationError);
                              return;
                            }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.post(
        `${apiUrl}/api/counter`,
        {
          title: title,
          number: number,
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      navigate("/admin/counters");
      toast.success("Counter created successfully!");
      
    } catch (error) {
      console.error("Error adding counter:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      toast.error("Failed to create counter");
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add counter</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Number</label>
                <input
                  type="text"
                  name="number"
                  value={number}
                  required
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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

export default AddCounter;
