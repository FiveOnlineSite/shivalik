import React from "react";
import AdminHeader from "../molecules/AdminHeader";
import AdminSidebar from "../molecules/AdminSidebar";
import { AuthProvider } from "../../context/AuthContext";

const AdminLayout = ({ children }) => {
  return (
    <AuthProvider>
      <div>
        <input type="checkbox" id="nav-toggle" name="" />
        <div className="sidebar">
          <AdminSidebar />
        </div>

        <div className="main-content">
          <AdminHeader />
          <main>
            <div className="container">{children}</div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default AdminLayout;
