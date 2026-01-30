import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../components/atoms/AdminLayout";

import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const FAQCategory = () => {
  const [FAQCategory, setFAQCategory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFAQCategory = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;

        // const response = await axios.get("/api/user/allUsers");
        const response = await axios({
          method: "GET",
          baseURL: `${apiUrl}/api/`,
          url: "faq-category",
        });

        setFAQCategory(response.data.categories);
        console.log("category", response.data.categories);
      } catch (error) {
        console.error("Error fetching faq category:", error);
      }
    };

    fetchFAQCategory();
  }, []);

  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${title}" faq category ?`
    );
    if (!confirmDelete) return; // Exit if user cancels
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios({
        method: "DELETE",
        baseURL: `${apiUrl}/api/`,
        url: `faq-category/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setFAQCategory(null);
      console.log(response.data);
      setFAQCategory(
        FAQCategory.filter((FAQCategory) => FAQCategory._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/faq-categories");
      }, 3000);
      toast.success("FAQ category deleted successfully!");

    } catch (error) {
      console.error("Error deleting faq category:", error);
      toast.error("Failed to delete faq category");
      
    }
  };
  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          FAQ Category
          <NavLink to="/admin/add/faq-categories" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add FAQ Category
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
                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {FAQCategory &&
                    FAQCategory.map((category) => (
                      <tr key={category._id}>
                        <td>{category.title}</td>

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/faq-categories/${category._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(category._id, category.title)
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

export default FAQCategory;
