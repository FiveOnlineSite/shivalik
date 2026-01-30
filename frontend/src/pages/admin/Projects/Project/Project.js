import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../components/atoms/AdminLayout";
import { toast } from "react-toastify";

const Project = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [Project, setProject] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/project`);
        const ProjectData = response.data.Projects;
        setProject(ProjectData);
        console.log("Fetched name:", ProjectData.title);
     } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, []);

 const handleDeleteProject = async (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this "${title}" project?`
    );
    if (!confirmDelete) return;

    try {
      const access_token = localStorage.getItem("access_token");
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.delete(`${apiUrl}/api/project/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      setProject(null);
      console.log(response.data);
      setProject(
        Project.filter((Project) => Project._id !== id)
      );
      setTimeout(() => {
        navigate("/admin/projects");
      }, 3000);

      toast.success("Project deleted successfully!");

    } catch (error) {
      console.error("Error deleting project:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete project"
      );
      toast.error("Failed to delete project");

    }
  };

  return (
    <AdminLayout>
      <div className="pages-headers ">
        <h2>
         Projects 
          <NavLink to="/admin/add/projects" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Project
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
                    <th>Project Category</th>
                    <th className="text-center">Title</th>
                     <th className="text-center">Image</th>
                     <th className="text-center">Alt</th>
                    <th className="text-center">Completion Date</th>
                    <th className="text-center">Location</th>
                     <th className="text-center">Banner</th>
                     <th className="text-center">Mobile Banner</th>
                     <th className="text-center">Sequence</th>

                    <th className="text-center">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {Project &&
                    Project.map((Project) => (
                      <tr key={Project._id}>
                        <td>{Project.project_category}</td>

                        <td className="text-center">{Project.title}</td>
                         <td className="text-center">
                          {Project.image?.[0]?.filepath && (
                            <img
                              src={Project.image?.[0]?.filepath}
                              alt={Project.alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center"> {Project.alt}</td>
                        <td className="text-center">
                            {Project.completion_date}
                          </td>
                        <td className="text-center"> {Project.location}</td>
                        
                        <td className="text-center">
                          {Project.banner?.[0]?.filepath && (
                            <img
                              src={Project.banner?.[0]?.filepath}
                              alt={Project.banner_alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                        <td className="text-center">
                          {Project.mobile_banner?.[0]?.filepath && (
                            <img
                              src={Project.mobile_banner?.[0]?.filepath}
                              alt={Project.mobile_banner_alt}
                              style={{
                                width: "100px",
                                height: "100px",
                              }}
                              loading="lazy"
                            />
                          )}
                        </td>
                         <td className="text-center"> {Project.sequence}</td>
                         <td className="text-center">
                          <Link
                            to={`/admin/edit/projects/${Project._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                       <td className="text-center">
  <button
    className="delete-btn"
    onClick={() => {
      // disable delete if project has banner or mobile banner
      if (
        (Project.banner?.length && Project.banner[0]?.filepath) ||
        (Project.mobile_banner?.length && Project.mobile_banner[0]?.filepath)
      ) {
        toast.warn("You cannot delete this project because it has a banner or mobile banner.");
        return;
      }
      handleDeleteProject(Project._id, Project.title);
    }}
    style={{
      cursor:
        (Project.banner?.length && Project.banner[0]?.filepath) ||
        (Project.mobile_banner?.length && Project.mobile_banner[0]?.filepath)
          ? "not-allowed"
          : "pointer",
      opacity:
        (Project.banner?.length && Project.banner[0]?.filepath) ||
        (Project.mobile_banner?.length && Project.mobile_banner[0]?.filepath)
          ? 0.9
          : 1,
    }}
    disabled={
      (Project.banner?.length && Project.banner[0]?.filepath) ||
      (Project.mobile_banner?.length && Project.mobile_banner[0]?.filepath)
    }
    title={
      (Project.banner?.length && Project.banner[0]?.filepath) ||
      (Project.mobile_banner?.length && Project.mobile_banner[0]?.filepath) ?
      "Inner page exist so cannot delete": ""}
  >
    <i className="las la-trash"></i>
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

export default Project;

