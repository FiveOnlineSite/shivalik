import React, { useState, useEffect } from "react";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditTestimonial = () => {
    
  const [testimonial, setTestimonial] = useState("")
  const [validationError, setValidationError] = useState(""); // State for validation error message
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [totalTestimonials, setTotalTestimonials] = useState(0);
  
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {id} = useParams()

  const [formData, setFormData] = useState({
      name: "",
      content: "",
      alt: "",
      media: {
        file: "",
        filepath: "",
      },
    sequence: "",
      
    });

     useEffect(() => {
        const fetchTestmonial = async () => {
          try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.get(
              `${apiUrl}/api/testimonial/${id}`
            );
            const testimonialData = response.data.testimonial;
            setTestimonial(testimonialData);
    
            setFormData({
              name: testimonialData.name,
              content: testimonialData.content,
              alt: testimonialData.alt,
              media: {
                file: testimonialData.media.filename || "",
                filepath: testimonialData.media.filepath || "",
              },
               type: testimonialData.type,
               sequence: testimonialData.sequence,
            });
            const totalTestimonialsResponse = await axios.get(`${apiUrl}/api/testimonial`);

            const totalCount = totalTestimonialsResponse.data.count
             setTotalTestimonials(totalCount);
                console.log("Count", totalCount);
          } catch (error) {
            console.error("Error fetching testimonial:", error);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchTestmonial();
      }, []);
    
    const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media" && files?.length > 0) {
    const file = files[0];
    const ext = file.name.split(".").pop().toLowerCase();
    const isImage = ["webp", "jpg", "jpeg", "png"].includes(ext);
    const isVideo = ["mp4"].includes(ext);

    setFormData((prev) => ({
      ...prev,
      type: isImage ? "image" : "video", 
      media: {
        file,
        filepath: URL.createObjectURL(file),
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

    if (formData.sequence > totalTestimonials) {
      setErrorMessage(
        `Total entries are ${totalTestimonials}. Sequence number cannot be greater than ${totalTestimonials}`
      );
      return;
    }


     if (validationError) {
        toast.error(validationError);
        return;
    }

     if (errorMessage) {
        toast.error(errorMessage);
        return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    if (isSubmitting) return;

    const isImage = formData.type === "image";
  const isVideo = formData.type === "video";

  if (isImage && formData.alt === "") {
    setValidationError("Alt text is required for images.");
    setIsSubmitting(false);
    return;
  }

    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name || "");
    formDataToSend.append("content", formData.content || "");
    formDataToSend.append("sequence", formData.sequence || "");


    if (formData.media.file instanceof File) {
    formDataToSend.append("media", formData.media.file);
  }
  
  if (isImage) {
    formDataToSend.append("alt", formData.alt);
  } else if (isVideo) {
    formDataToSend.append("alt", "");
  }
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.patch(
        `${apiUrl}/api/testimonial/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log("Updated testimonial:", response.data.updatedBanner);
      navigate("/admin/testimonials");
              toast.success("Testimonial updated successfully!");

    } catch (error) {
      console.error("Error updating testimonial:", error);
              toast.error("Failed to update testimonial");

      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit Testimonial</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Media (Image OR Video)</label>
                 <input
                 type="file"
                 name="media"
                 accept=".webp,.jpg,.jpeg,.png,.mp4"
                 onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const ext = file.name.split(".").pop().toLowerCase();
                    const isImage = ["webp", "jpg", "jpeg", "png"].includes(ext);
                    const isVideo = ext === "mp4";

                    let maxSizeBytes = 0;

                    if (isImage) maxSizeBytes = 500 * 1024; // 500 KB
                    else if (isVideo) maxSizeBytes = 10 * 1024 * 1024; // 10 MB
                    else {
                      setErrorMessage("Only images or MP4 videos are allowed.");
                      e.target.value = "";
                      return;
                    }

                    if (file.size > maxSizeBytes) {
                      setErrorMessage(
                        isImage
                          ? "Image size must be under 500 KB."
                          : "Video size must be under 10 MB."
                      );
                      e.target.value = "";
                      return;
                    }

                    // Clear any previous error
                    setErrorMessage("");

                    setFormData((prev) => ({
                      ...prev,
                      type: isImage ? "image" : "video",
                      media: {
                        file,
                        filepath: URL.createObjectURL(file),
                      },
                    }));
                  }}
               />
              </div>
              
            {formData.type === "image" && formData.media.filepath && (
                  <img
                    className="form-profile"
                    src={`${formData?.media.filepath}`}
                    alt={`${formData.alt}`}
                    loading="lazy"
                  />
            )}

            {formData.type === "video" && formData.media.filepath && (
                  <video
                    className="form-profile"
                    src={`${formData?.media.filepath}`}
                    style={{ width: "100px", height: "100px" }}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}
            </div>


            {(formData.type === "image") && (
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="theme-form">
                  <label>Alt</label>
                  <input
                    type="text"
                    name="alt"
                    required
                    value={formData.alt}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

           <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                         <div className="theme-form">
                           <label>Content</label>
                           <CKEditor
                   editor={ClassicEditor}
                   data={formData.content}
                   required
                   onChange={(event, editor) => {
                                                                                                                                          const data = editor.getData();
                                                                                                                                           setFormData((prev) => ({ ...prev, content: data }));
                                                                                                                       }}
                   config={{
                                                                                                                                          toolbar: [
                                                                                                                                            "heading", "|",
                                                                                                                                            "bold", "italic", "underline", "link", "|",
                                                                                                                                            "bulletedList", "numberedList", "|",
                                                                                                                                            "undo", "redo", "codeBlock"
                                                                                                                                          ],
                                                                                                                                          height: 200,
                                                                                                                                        }}
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
              <div className="error-message text-danger mt-2">
                {errorMessage}
              </div>
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

export default EditTestimonial;
