import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/atoms/AdminLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ContactResponse = () => {
  const [ContactResponse, setContactResponse] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchContactResponse = async () => {
      try {
          const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

        const response = await axios({
          method: "GET",
          baseURL: `${apiUrl}/api/`,
          url: "contact-response",
          headers: {
          Authorization: `Bearer ${access_token}`,
        },
        });

        const ContactResponseData = response.data.contacts;

        const sortedContactResponse = [...ContactResponseData].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setContactResponse(sortedContactResponse);
      } catch (error) {
        console.error("Error fetching ContactResponse:", error);
      }
    };

    fetchContactResponse();
  }, []);

  const handleDelete = async (id) => {
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      await axios({
        method: "DELETE",
        baseURL: `${apiUrl}/api/`,
        url: `contact-response/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      setContactResponse((prev) => prev.filter((ContactResponse) => ContactResponse._id !== id));
              toast.success("ContactResponse deleted successfully!");

    } catch (error) {
      console.error("Error deleting ContactResponse:", error);
    }
  };

  const filteredContactResponses = ContactResponse.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="pages-headers">
        <div className="row align-items-center justify-content-center">
            <h2>Contact Us Responses</h2>
        </div>
      </div>

      <div className="row mobilerows">
        <div className="col-md-12">
          <div className="infos-table">
            <div className="table-responsive">
              <table className="table nowrap">
                <thead>
                  <tr>
                    <th>Page</th>

                    <th className="text-center">Name</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Phone</th>
                    <th className="text-center">Message</th>
                    <th className="text-center">Date & Time</th>

                    {/* <th className="text-center">Delete</th> */}
                  </tr>
                </thead>
                <tbody>
                  {filteredContactResponses.length > 0 ? (
                    filteredContactResponses.map((ContactResponse) => (
                      <tr key={ContactResponse._id}>
                        <td>{ContactResponse.page}</td>
                        <td className="text-center">{ContactResponse.name}</td>
                        <td className="text-center">{ContactResponse.email}</td>
                        <td className="text-center">{ContactResponse.phone}</td>
                        <td className="text-center">{ContactResponse.message}</td>
                        <td className="text-center">
                          {new Date(ContactResponse.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              timeZone: "Asia/Kolkata",
                            }
                          )}{" "}
                          at{" "}
                          {new Date(ContactResponse.createdAt).toLocaleTimeString(
                            "en-IN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              timeZone: "Asia/Kolkata",
                            }
                          )}
                        </td>
                        {/* <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(ContactResponse._id)}
                          >
                            <i className="las la-trash"></i>
                          </button>
                        </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Contact data found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContactResponse;
