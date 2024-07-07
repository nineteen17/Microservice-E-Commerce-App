import React from "react";
import { Outlet } from "react-router-dom";

const FullLayout: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default FullLayout;
