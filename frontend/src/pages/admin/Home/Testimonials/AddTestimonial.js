import React, { useState, useEffect } from "react";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddTestimonial = () => {
  const [media, setMedia] = useState({ file: "" });
  const [alt, setAlt] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [validationError, setValidationError] = useState(""); // State for validation error message
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

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

     if (!media.file) {
  setValidationError("Please upload an image or a video.");
  setIsSubmitting(false);
  return;
}

const ext = media.file.name.split(".").pop().toLowerCase();
const isImage = ["webp", "jpg", "jpeg", "png"].includes(ext);
const isVideo = ["mp4"].includes(ext);

if (isImage && alt === "") {
  setValidationError("Alt text is required for images.");
  setIsSubmitting(false);
  return;
}

setValidationError("")

    try {
      const formData = new FormData();
      // if (isImage) {
      //   formData.append("alt", alt); // include alt
      // }

      formData.append("name", name || "");
      formData.append("alt", alt || "");
      formData.append("content", content || "");

      if (media.file) {
        formData.append("media", media.file);
      }

      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.post(`${apiUrl}/api/testimonial`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      });

      navigate("/admin/testimonials");
              toast.success("Testimonial created successfully!");

    } catch (error) {
      console.error("Error creating testimonial:", error);
              toast.error("Failed to create testimonial");

      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Add Testimonial</h2>
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
                   required
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

                      // Update media state
                      setMedia({
                        ...media,
                        file,
                        filepath: URL.createObjectURL(file),
                        type: isImage ? "image" : "video",
                      });
                    }}
                 />
              </div>
            </div>

            {media?.file && ["png", "webp", "jpg", "jpeg"].includes(
                media.file.name.split(".").pop().toLowerCase()
              ) && (
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="theme-form">
                  <label>Alt</label>
                  <input
                    type="text"
                    name="alt"
                    required
                    value={alt}
                    onChange={(e) => setAlt(e.target.value)}
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
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

           <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                         <div className="theme-form">
                           <label>Content</label>
                           <CKEditor
                             editor={ClassicEditor}
                             data={content}
                             required
                             onChange={(event, editor) => {
                                                                                                            const data = editor.getData();
                                                                                                            setContent(data);
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

export default AddTestimonial;
