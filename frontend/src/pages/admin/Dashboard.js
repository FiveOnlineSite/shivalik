import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../components/atoms/AdminLayout";

const DashBoard = () => {

  return (
    <AdminLayout>
      <div className="container">
        <div className="row">

          <h2>Dashboard</h2>
          <h6>Welcome to Shivalik</h6>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashBoard;
