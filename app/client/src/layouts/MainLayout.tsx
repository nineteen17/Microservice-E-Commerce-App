import React from "react";
import { Outlet } from "react-router-dom";

import HeaderNav from "@/components/header/HeaderNav";

const MainLayout: React.FC = () => {
  return (
    <>
      <HeaderNav />
      <Outlet />
    </>
  );
};

export default MainLayout;
