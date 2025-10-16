import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../components/atoms/AdminLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddNewsWorthy = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState({ file: "" });
  const [title, setTitle] = useState("");
  const [alt, setAlt] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState("");
  const [publisherName, setPublisherName] = useState("");
  const [newsCategory, setNewsCategory] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = (() => {
      if (!date) return "";
      const [year, month, day] = date.split("-");
      return `${month}-${day}-${year}`;
    })();
    if (isSubmitting) return;

    if (errorMessage) {
                                          toast.error(errorMessage);
                                          return;
                                        }
                    
                        if (validationError) {
                                          toast.error(validationError);
                                          return;
                                        }
    
 

    if (!image.file) {
      setValidationError("Image is required.");
      setIsSubmitting(false);
      return;
    }
    if (image.file && alt === "") {
      setValidationError("Alt text is required when uploading an image.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
       setErrorMessage("");
    setValidationError("")

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formData = new FormData();

      formData.append("news_category", newsCategory); 
      formData.append("title", title);
      formData.append("link", link);
      formData.append("publisher_name", publisherName);

      formData.append("date", formattedDate);

      formData.append("alt", alt);
      if (image.file) {
        formData.append("image", image.file);
      }

      await axios.post(`${apiUrl}/api/news-worthy-mention`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/news-worthy-mentions");

              toast.success("News Worthy Mentions created successfully!");

    } catch (error) {
      console.error("Error adding news-worthy-mentions:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
              toast.error("Failed to create news worthy mentions");

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add News and Worthy Mention</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
         <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>News Category</label>
                <select
                  required
                  value={newsCategory}
                  onChange={(e) => setNewsCategory(e.target.value)}
                  className="form-control"
                >
                  <option selected disabled value="">Select Category</option>
                  
                    <option value="News">
                      News
                    </option>
                    <option value="Worthy Mentions">
                      Worthy Mentions
                    </option>
                </select>
              </div>
            </div>

            {/* Name */}
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

                    setErrorMessage("");

                    setImage({
                        file,
                        filepath: URL.createObjectURL(file),
                      
                    });
                  }}
                />
              </div>
            </div>

            {/* Alt */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Alt</label>
                <input
                  type="text"
                  name="alt"
                  value={alt}
                  required
                  onChange={(e) => setAlt(e.target.value)}
                />
              </div>
            </div>

             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Publisher Name</label>
                <input
                  type="text"
                  name="publisher_name"
                  required
                  value={publisherName}
                  onChange={(e) => setPublisherName(e.target.value)}
                />
              </div>
            </div>


             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  max={new Date().toISOString().split("T")[0]} // This restricts future dates
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Link</label>
                <input
                  type="text"
                  name="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
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

export default AddNewsWorthy;
