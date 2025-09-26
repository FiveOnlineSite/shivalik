import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../../components/atoms/AdminLayout";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const NewsWorthy = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [NewsWorthy, setNewsWorthy] = useState([]);
 
  useEffect(() => {
    const fetchNewsWorthy = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/news-worthy-mention`);
        const NewsWorthyData = response.data.NewsWorthyMentions;

        setNewsWorthy(NewsWorthyData);
     } catch (error) {
        console.error("Error fetching news and worthy mention:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsWorthy();
  }, []);


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this news?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(`${apiUrl}/api/news-worthy-mention/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setNewsWorthy(null)
console.log(response.data);
       setNewsWorthy(
        NewsWorthy.filter((NewsWorthy) => NewsWorthy._id !== id)
      );
       setTimeout(() => {
        navigate("/admin/news-worthy-mentions");
      }, 3000);

              toast.success("News and worthy mentions deleted successfully!");

    } catch (error) {
      console.error("Error deleting news and worthy mentions:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete news and worthy mentions"
      );
              toast.error("Failed to delete news and worthy mentions");

    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
         News and Worthy Mentions
          <NavLink to="/admin/add/news-worthy-mentions" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add News and Worthy Mentions
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
                     <th>News Category</th>
                    <th className="text-center">Title</th>
                    <th className="text-center">Publisher Name</th>
                    <th className="text-center">Image</th>
                    <th className="text-center">Alt</th>
                    <th className="text-center">Date</th>
                    <th className="text-center">Link</th>

                    <th className="text-center">Sequence</th>

                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {NewsWorthy &&
                    NewsWorthy.map((news) => (
                      <tr key={news._id}>
                          <td> {news.news_category}</td>
                        <td className="text-center">{news.title}</td>
                        <td className="text-center">{news.publisher_name}</td>

                        <td className="text-center">
                          {news.image[0]?.filepath && (
                            <img
                              src={news.image[0]?.filepath}
                              alt={news.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center">{news.alt}</td>
                        
                        <td className="text-center">
                          {" "}
                          {new Date(
                            news.date
                          ).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </td>
                        <td className="text-center">{news.link}</td>

                        <td className="text-center">{news.sequence}</td>
                         <td className="text-center">
                          <Link
                            to={`/admin/edit/news-worthy-mentions/${news._id}`}
                            title="Edit"
                          >
                            
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(news._id)
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

export default NewsWorthy;

