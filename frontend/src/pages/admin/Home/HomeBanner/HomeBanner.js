import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { toast } from "react-toastify";

const HomeBanner = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [banners, setBanners] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/home-banner`);
        const bannerData = response.data.banners;

        setBanners(bannerData);
      } catch (error) {
        console.error("Error fetching home banners:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const handleDeleteBanner = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this banner?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(
        `${apiUrl}/api/home-banner/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data);
      setBanners((prev) => prev.filter((banner) => banner._id !== id));
      setTimeout(() => {
        navigate("/admin/home-banners");
      }, 3000);
      toast.success("Home banner deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting home banner:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete home banner"
      );
      toast.error("Failed to delete home banner");
    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
          Home Banners
          <NavLink to="/admin/add/home-banners" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add home banner
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
                    <th className="text-center">Description</th>
                    <th className="text-center">Link</th>

                    <th className="text-center">Sequence</th>

                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {banners &&
                    banners.map((banner) => (
                      <tr key={banner._id}>
                        <td>
                          {banner.image[0]?.filepath && (
                            <img
                              src={banner.image[0]?.filepath}
                              alt={banner.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {banner.alt}</td>
                          <td>
                          {banner.mobile_image[0]?.filepath && (
                            <img
                              src={banner.mobile_image[0]?.filepath}
                              alt={banner.mobile_alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {banner.mobile_alt}</td>

                        <td className="text-center">{banner.title}</td>
                        <td className="text-center">{banner.description}</td>
                        <td className="text-center">{banner.link}</td>
                        <td className="text-center">{banner.sequence}</td>

                        <td className="text-center">
                          <Link
                            to={`/admin/edit/home-banners/${banner._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteBanner(banner._id)
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

export default HomeBanner;
