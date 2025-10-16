import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditFAQCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [faq, setFaq] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
  });

  useEffect(() => {
    const fetchFAQCategory = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/faq-category/${id}`);
        const EditFAQCategoryData = response.data.category;

        setFormData({
          title: EditFAQCategoryData.title || "",
        });

        console.log("Fetched alt:", EditFAQCategoryData.title);
        console.log("Fetched EditFAQCategory:", EditFAQCategoryData);
      } catch (error) {
        console.error("Error fetching EditFAQCategory:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFAQCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title || "");

      await axios.patch(`${apiUrl}/api/faq-category/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });

      setTimeout(() => {
        navigate("/admin/faq-categories");
      }, 1000);
      toast.success("FAQ category updated successfully!");
      
    } catch (error) {
      console.error("Error updating faq category:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      toast.error("Failed to update faq category");
      
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit FAQ Category</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
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

export default EditFAQCategory;
