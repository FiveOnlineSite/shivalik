import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "../../components/atoms/AdminLayout";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { toast } from "react-toastify";

const EditCSR = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [healthCampDescription, setHealthCampDescription] = useState("");
  const [womenEmpowermentDescription, setWomenEmpowermentDescription] = useState("");
  const [educationalDescription, setEducationalDescription] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCSR = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/csr`);
        const CSRData = response.data.csr;

        setHealthCampDescription(CSRData.health_camp_description || "");
        setWomenEmpowermentDescription(CSRData.women_empowerment_description || "");
        setEducationalDescription(CSRData.educational_description || "");
      } catch (error) {
        console.error("Error fetching csr data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCSR();
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
        `${apiUrl}/api/csr`,
        {
          health_camp_description: healthCampDescription,
          women_empowerment_description: womenEmpowermentDescription,
          educational_description: educationalDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("CSR content updated successfully!");
      setTimeout(() => {
        navigate("/admin/edit/csr");
      }, 1000);
    } catch (error) {
      console.error("Error updating CSR data:", error);
             toast.error(error.response?.data?.message || "Failed to update knit about content");
      
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="theme-form-header">
        <h2>Edit CSR</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-12 col-12">
              <div className="theme-form">
                <label>Health Camp</label>
              <CKEditor
                editor={ClassicEditor}
                              data={healthCampDescription}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                setHealthCampDescription(data);
                              }}
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "|",
                    "insertTable",
                    "undo",
                    "redo"
                  ],
                  table: {
                    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
                  },
                }}
              />

              </div>
            </div>

            <div className="col-lg-12 col-12">
              <div className="theme-form">
                <label>Women Empowerment</label>
                <CKEditor
                editor={ClassicEditor}
                              data={womenEmpowermentDescription}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                setWomenEmpowermentDescription(data);
                              }}
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "|",
                    "insertTable",
                    "undo",
                    "redo"
                  ],
                  table: {
                    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
                  },
                }}
              />
              </div>
            </div>

            <div className="col-lg-12 col-12">
              <div className="theme-form">
                <label>Educational</label>
                <CKEditor
                  editor={ClassicEditor}
                                data={educationalDescription}
                                onChange={(event, editor) => {
                                  const data = editor.getData();
                                  setEducationalDescription(data);
                                }}
                  config={{
                    toolbar: [
                      "heading",
                      "|",
                      "bold",
                      "italic",
                      "link",
                      "bulletedList",
                      "numberedList",
                      "|",
                      "insertTable",
                      "undo",
                      "redo"
                    ],
                    table: {
                      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
                    },
                  }}
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

export default EditCSR;
