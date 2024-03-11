import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/header/Header";
import Navbar from "@/components/header/Navbar";

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
