import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../../components/atoms/AdminLayout";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditNewsWorthy = () => {
    const { _id, id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [newsWorthy, setNewsWorthy] = useState("");
 
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
   const [formData, setFormData] = useState({
     title: "",
     alt: "",
     image: {
       file: "",
       filepath: "",
     },
     date: "",
     link: "",
     news_category: "",
     publisher_name: ""
   });

   const [totalNews, setTotalNews] = useState(0)
  useEffect(() => {
    const fetchNewsWorthy = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/news-worthy-mention/${id}`);
        const convertDateForInput = (dateStr) => {
        const [mm, dd, yyyy] = dateStr.split("-");
        return `${yyyy}-${mm}-${dd}`;
      };
        const newsWorthyData = response.data.NewsWorthyMention;
        setNewsWorthy(newsWorthyData);

        console.log("news worthy mention data", newsWorthyData);

        setFormData({
          alt: newsWorthyData.alt,
          image: {
            file: newsWorthyData.image?.[0]?.filename || "",
            filepath: newsWorthyData.image?.[0]?.filepath || "",
          },
          link: newsWorthyData.link || "",
          title: newsWorthyData.title || "",
          news_category: newsWorthyData.news_category || "",
          date:  newsWorthyData.date
            ? convertDateForInput(newsWorthyData.date)
            : "",
          publisher_name: newsWorthyData.publisher_name || "",
          sequence: newsWorthyData.sequence || "",


        });

          const totalDetailsResponse = await axios.get(
          `${apiUrl}/api/news-worthy-mention/category/${newsWorthyData.news_category?._id}`
        );
        const totalCount = totalDetailsResponse.data.count;
        setTotalNews(totalCount);
                console.log("Count", totalCount);
                

      } catch (error) {
        console.error("Error fetching news worthy mentions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsWorthy();
  }, []);

   const handleChange = (e) => {
    const { name, value, files } = e.target;
setErrorMessage("");
setValidationError("");
      if (name === "image") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: {
            file: files[0],
            filepath: URL.createObjectURL(files[0]),
          },
        }));
      } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault();

     const convertDateToDisplayFormat = (isoDate) => {
      const [yyyy, mm, dd] = isoDate.split("-");
      return `${mm}-${dd}-${yyyy}`;
    };
    if (isSubmitting) return;

    if (errorMessage) {
                                          toast.error(errorMessage);
                                          return;
                                        }
                    
                        if (validationError) {
                                          toast.error(validationError);
                                          return;
                                        }

                                        
     const seq = parseInt(formData.sequence, 10);
    if (isNaN(seq) || seq < 1) {
      setErrorMessage("Sequence must be a positive number.");
      return;
    }

    const allowedMax = totalNews > 0 ? totalNews : 1;
    if (seq > allowedMax) {
      setErrorMessage(`Sequence cannot be greater than ${allowedMax}`);
      return;
    }

    setErrorMessage("");
    setValidationError("");

    const isImage = !!formData.image.file;

    if (!isImage) {
      setValidationError("Image is required.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title || "");
      formDataToSend.append("publisher_name", formData.publisher_name || "");
      formDataToSend.append("date", convertDateToDisplayFormat(formData.date) || "");
      formDataToSend.append("sequence", formData.sequence || "");
      formDataToSend.append("link", formData.link || "");

      formDataToSend.append("alt", formData.alt || "");
            if (formData.image.file) {
        formDataToSend.append("image", formData.image.file); 
        }

      formDataToSend.append("news_category", formData.news_category || "");

      await axios.patch(`${apiUrl}/api/news-worthy-mention/${id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        navigate("/admin/news-worthy-mentions");
      }, 1000);

              toast.success("News Worthy Mention updated successfully!");

    } catch (error) {
      console.error("Error adding News Worthy Mention:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");

              toast.error("Failed to update News Worthy Mention");

    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit News and Worthy Mention</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
         <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>News Category</label>
                <select
                  name="news_category"
                  required
                  value={formData.news_category}
                  onChange={handleChange}
                  className="form-control"
                  disabled
                >
                   <option disabled value="">Select Category</option>
                  
                    <option value="News">
                      News
                    </option>
                    <option value="Worthy Mentions">
                      Worthy Mentions
                    </option>
                </select>
              </div>
            </div>

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

            {/* Image */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  accept=".webp, .png, .jpg, .jpeg"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const maxSizeMB = 500; // 10 MB
                    const maxSizeBytes = maxSizeMB * 1024;

                    if (file.size > maxSizeBytes) {
                      setErrorMessage(`File is too large! Maximum allowed size is ${maxSizeMB} KB.`);
                      e.target.value = ""; // clear the file input
                      return;
                    }

                    // Clear any previous error
                    setErrorMessage("");

                    // Proceed if size is okay
                    setFormData((prev) => ({
                      ...prev,
                        image: {
                          file,
                        filepath: URL.createObjectURL(file),
                        }
                    }));
                  }}
                />
                 {formData.image.filepath && (
                  <img
                    className="form-profile"
                    src={formData.image.filepath}
                    alt={formData.alt}
                    loading="lazy"
                  />
                )}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Alt</label>
                <input
                  type="text"
                  name="alt"
                  value={formData.alt}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Publisher Name</label>
                <input
                  type="text"
                  name="publisher_name"
                  value={formData.publisher_name}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  max={new Date().toISOString().split("T")[0]}
                  value={formData.date}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Link</label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Sequence</label>
                <input
                  type="text"
                  name="sequence"
                  value={formData.sequence}
                  required
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

export default EditNewsWorthy;
