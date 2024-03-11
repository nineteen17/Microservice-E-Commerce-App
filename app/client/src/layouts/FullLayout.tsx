import React from 'react';
import { Outlet } from 'react-router-dom';

const FullLayout: React.FC = () => {
  return (
    <>
      <div className="container mx-auto px-4">
        <Outlet />
      </div>
    </>
  );
};

export default FullLayout;
