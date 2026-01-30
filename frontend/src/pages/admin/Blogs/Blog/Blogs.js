import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../../components/atoms/AdminLayout"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminBlogs = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [Blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/blog`);
        const BlogsData = response.data.Blogs;

        setBlogs(BlogsData);
        
      } catch (error) {
        console.error("Error fetching Blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDeleteBlogs = async (id) => {
    const confirmDelete = window.confirm(
      "  Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      setTimeout(() => {
        navigate("/admin/Blogs-recognition");
      }, 3000);
      toast.success("Blog deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting blog:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete blog"
      );
      toast.error("Failed to delete blog");
      
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Blogs
          <NavLink to="/admin/add/blogs" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Blog
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
                    <th>Title</th>
                    <th className="text-center">Image</th>
                    <th className="text-center">Alt</th>

                    <th className="text-center">Sequence</th>

                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {Blogs &&
                    Blogs.map((blog) => (
                      <tr key={blog._id}>
                        <td>{blog.title}</td>

                        <td className="text-center">
                          {blog.image[0]?.filepath && (
                            <img
                              src={blog.image[0]?.filepath}
                              alt={blog.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center">{blog.alt}</td>
                        <td className="text-center">{blog.sequence}</td>


                        <td className="text-center">
                          <Link
                            to={`/admin/edit/blogs/${blog._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteBlogs(blog._id)
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

export default AdminBlogs;
