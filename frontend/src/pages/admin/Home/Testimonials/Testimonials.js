import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Testimonials = () => {
  const [Testimonials, setTestimonials] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;

        // const response = await axios.get("/api/user/allUsers");
        const response = await axios({
          method: "GET",
          baseURL: `${apiUrl}/api/`,
          url: "testimonial",
        });

        setTestimonials(response.data.testimonials);
       // setTestimonials(response.data.Testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this testimonial by ${name}  ?`
    );
    if (!confirmDelete) return; // Exit if user cancels
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios({
        method: "DELETE",
        baseURL: `${apiUrl}/api/`,
        url: `testimonial/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setTestimonials(null); // Update user state to null after deletion
      // setTimeout(() => {
      //   navigate("/admin/FactsheetPresentation");
      // }, 2000);
      console.log(response.data);
      setTestimonials(Testimonials.filter((testimonial) => testimonial._id !== id));
        toast.success("Testimonials deleted successfully!");
      
      setTimeout(() => {
        navigate("/admin/testimonials");
      }, 3000);
    } catch (error) {
        toast.error("Failed to delete testimonial");
      
      console.error("Error deleting testimonial:", error);
    }
  };
  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Testimonials
          <NavLink to="/admin/add/testimonials" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Testimonial
          </NavLink>
        </h2>
      </div>
      <div className="row mobilerows">
        <div className="col-md-12">
          <div className="infos-table">
            <div className="table-responsive">
              <table id="example" className="table nowrap">
                <thead>
                  <tr>
                    <th>Media</th>
                    <th className="text-center">Alt</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Content</th>
                    <th className="text-center">Sequence</th>

                    <th className="text-center">Edit</th>
                    {/* <th className="text-center">Delete</th> */}
                  </tr>
                </thead>
                <tbody>
                  {Testimonials &&
                    Testimonials.map((testimonial) => (
                      <tr key={testimonial._id}>
                        <td>
                          {testimonial.type === "image" ? (
                            <img
                              src={testimonial.media.filepath}
                              alt={testimonial.alt || "testimonial-image"}
                              style={{ width: "100px", height: "100px" }}
                              loading="lazy"
                            />
                          ) : testimonial.type === "video" ? (
                            <video
                              src={testimonial.media.filepath}
                              style={{ width: "100px", height: "100px" }}
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          ) : (
                            <p>No media available</p>
                          )}
                        </td>
                        <td className="text-center">{testimonial.alt}</td>
                        <td className="text-center">{testimonial.name}</td>
                        
                        <td className="text-center">{testimonial.content}</td>
                        <td className="text-center">{testimonial.sequence}</td>

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/testimonials/${testimonial._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(testimonial._id, testimonial.name)
                            }
                          >
                            <i className="las la-trash"></i>{" "}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Testimonials;
