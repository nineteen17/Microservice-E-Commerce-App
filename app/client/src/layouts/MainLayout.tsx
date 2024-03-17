import React from "react";
import { Outlet } from "react-router-dom";

import HeaderNav from "@/components/header/HeaderNav";
import { Toaster } from "@/components/ui/toaster";

const MainLayout: React.FC = () => {
  return (
    <>
      <HeaderNav />
      <Outlet />
      <Toaster />
    </>
  );
};

export default MainLayout;
