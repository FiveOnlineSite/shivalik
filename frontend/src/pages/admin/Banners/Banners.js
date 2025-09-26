import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/atoms/AdminLayout";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Banners = () => {
  const [banners, setBanners] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;

        const response = await axios({
          method: "GET",
          baseURL: `${apiUrl}/api/`,
          url: "banner",
        });

        setBanners(response.data.banners);
        console.log("Title", response.data.banners.page)
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${title} banner ?`
    );
    if (!confirmDelete) return; // Exit if user cancels
    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios({
        method: "DELETE",
        baseURL: `${apiUrl}/api/`,
        url: `banner/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setBanners(null); 
      console.log(response.data);
      setBanners(banners.filter((banners) => banners._id !== id));
      toast.success("Banner deleted successfully!");
      
      setTimeout(() => {
        navigate("/admin/banners");
      }, 3000);
    } catch (error) {
                  toast.error("Failed to delete banner");
      console.error("Error deleting banner:", error);
    }
  };
  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Banners
          <NavLink to="/admin/add/banners" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Banner
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
                    <th>Desktop Banner</th>
                    <th className="text-center">Alt</th>
                    <th className="text-center">Mobile Banner</th>
                    <th className="text-center">Mobile Alt</th>
                    <th className="text-center">Title</th>
                    <th className="text-center">Page</th>
                    <th className="text-center">Edit</th>
                    {/* <th className="text-center">Delete</th> */}
                  </tr>
                </thead>
                <tbody>
                  {banners &&
                    banners.map((banner) => (
                      <tr key={banner._id}>
                        <td>
                            <img
                              src={banner.image?.[0]?.filepath}
                              alt={banner.alt}
                              style={{ width: "100px", height: "100px" }}
                              loading="lazy"
                            />
                        </td>
                        <td className="text-center">{banner.alt}</td>
                         <td>
                            <img
                              src={banner.mobile_image?.[0]?.filepath}
                              alt={banner.mobile_alt}
                              style={{ width: "100px", height: "100px" }}
                              loading="lazy"
                            />
                        </td>
                        <td className="text-center">{banner.mobile_alt}</td>

                        <td className="text-center">{banner.title}</td>
                        <td className="text-center">{banner.page}</td>

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/banners/${banner._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(banner._id, banner.title)
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

export default Banners;
