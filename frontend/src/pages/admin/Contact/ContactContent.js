import React, { useState, useEffect} from "react";
import axios from "axios";
import AdminLayout from "../../../components/atoms/AdminLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ContactContent = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [emails, setEmails] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [mapLink, setMapLink] = useState("");

  const [ContactContent, setContactContent] = useState([
    { icon: null, alt: "", link: "" },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchContactContent = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/contact-content`);
        const ContactContentData = response.data.ContactContents[0];
        setPhoneNumber(ContactContentData.phone_number || "");
        setEmails(ContactContentData.emails || "");
        setOfficeAddress(ContactContentData.office_address || "");
        setMapLink(ContactContentData.map_link || "");

        setContactContent(ContactContentData.social_media || []);

        console.log("Fetched alt:", ContactContentData.social_media[0]?.alt);
        console.log("Fetched ContactContent:", ContactContentData.social_media);
      } catch (error) {
        console.error("Error fetching ContactContent:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactContent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (errorMessage) {
                                  toast.error(errorMessage);
                                  return;
                                }

    setIsSubmitting(true);
    setErrorMessage("");

    const hasThumbnailErrors = ContactContent.some((social_media) => {
      return !social_media._id && !(social_media.icon instanceof File);
    });

    if (hasThumbnailErrors) {
      setErrorMessage("Please upload icon for new social media.");
      setIsSubmitting(false);
      return;
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;
      const formData = new FormData();

      formData.append("phone_number", phoneNumber);
      formData.append("emails", emails);
      formData.append("office_address", officeAddress);
      formData.append("map_link", mapLink);


      const socialMediaArray = ContactContent.map((socialMedia, index) => {
        const iconKey = `icon_${index}`;

        // Only append if it's a new file (not already uploaded object)
        if (socialMedia.icon instanceof File) {
          formData.append(iconKey, socialMedia.icon);
        }

        return {
          link: socialMedia.link,
          alt: socialMedia.alt,
          _id: socialMedia._id,
          icon_key: iconKey,
        };
      });

      formData.append("social_media", JSON.stringify(socialMediaArray));

      await axios.patch(`${apiUrl}/api/contact-content`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        navigate("/admin/contact-contents");
      }, 1000);

      toast.success("Contact content updated successfully!");
      
    } catch (error) {
      console.error("Error updating contact content:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      toast.error("Failed to update contact content");
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSocialMedia = async (socialMediaId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this social media?"
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios.delete(`${apiUrl}/api/contact-content/${socialMediaId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // Remove from local state
      const updatedContactContent = ContactContent.filter((ev) => ev._id !== socialMediaId);
      setContactContent(updatedContactContent);
                                      toast.success("Social Media deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting social media:", error);
                                      toast.error("Failed to delete social media");
      
      setErrorMessage(
        error.response?.data?.message || "Failed to delete social media"
      );
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit Contact Content</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Phone Number</label>
                <CKEditor
                  editor={ClassicEditor}
                  required
                  data={phoneNumber}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                   setPhoneNumber(data);
                  }}
                  config={{
                    toolbar: [
                      "heading", "|",
                      "bold", "italic", "underline", "link", "|",
                      "bulletedList", "numberedList", "|",
                      "undo", "redo", "codeBlock"
                    ],
                  }}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Emails</label>
                <CKEditor
                  editor={ClassicEditor}
                  required
                  data={emails}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEmails(data);
                  }}
                  config={{
                    toolbar: [
                      "heading", "|",
                      "bold", "italic", "underline", "link", "|",
                      "bulletedList", "numberedList", "|",
                      "undo", "redo", "codeBlock"
                    ],
                  }}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Office Address</label>
                <CKEditor
                  editor={ClassicEditor}
                  required
                  data={officeAddress}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setOfficeAddress(data);
                  }}
                  config={{
                    toolbar: [
                      "heading", "|",
                      "bold", "italic", "underline", "link", "|",
                      "bulletedList", "numberedList", "|",
                      "undo", "redo", "codeBlock"
                    ],
                  }}
                />
              </div>
            </div>

               <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Map Link</label>
                 <input
                  type="text"
                  name="map_link"
                  required
                  value={mapLink}
                  onChange={(e) => setMapLink(e.target.value)}
                />
              </div>
            </div>

            {ContactContent.map((social, index) => (
              <div key={index} className="border p-3 mb-3 delete-button-div">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="theme-form">
                      <label>Link</label>
                      <input
                        type="text"
                        value={social.link}
                        required
                        onChange={(e) => {
                          const updated = [...ContactContent];
                          updated[index].link = e.target.value;
                          setContactContent(updated);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="theme-form">
                      <label>Alt</label>
                      <input
                        type="text"
                        value={social.alt}
                        required
                        onChange={(e) => {
                          const updated = [...ContactContent];
                          updated[index].alt = e.target.value;
                          setContactContent(updated);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="theme-form">
                      <label>Icon</label>

                      <input
                        type="file"
                        accept=".webp,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file && file.size > 500 * 1024) {
                            setErrorMessage(
                              "Icon too large. Max size is 500KB."
                            );
                            return;
                          }

                          const updated = [...ContactContent];
                          updated[index].icon = file;
                          setContactContent(updated);
                        }}
                      />

                      {/* Show preview if filepath exists */}

                      {Array.isArray(social.icon) &&
                        social.icon[0]?.filepath && (
                          <img
                            src={social.icon[0].filepath}
                            alt={social.alt || ""}
                            className="form-profile mt-2"
                          />
                        )}
                    </div>
                  </div>
                </div>

                {social._id ? (
                  <button
                    type="button"
                    className="btn m-2 delete-btn"
                    onClick={() => handleDeleteSocialMedia(social._id)}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn remove-btn m-2"
                    onClick={() => {
                      const updated = [...ContactContent];
                      updated.splice(index, 1);
                      setContactContent(updated);
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            {errorMessage && (
              <div className="text-danger col-12 mt-2">{errorMessage}</div>
            )}

            <div className="col-lg-6 col-12 d-flex align-items-center">
              <div className="theme-form">
                <button
                  type="button"
                  onClick={() =>
                    setContactContent([
                      ...ContactContent,
                      { youtube_url: "", youtube_thumbnail: null, alt: "" },
                    ])
                  }
                >
                  + Add New Social Media
                </button>
              </div>

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

export default ContactContent;
