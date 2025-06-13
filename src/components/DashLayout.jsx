import React from "react";
import { Outlet } from "react-router-dom";

import MiniDrawer from "./Drawer";

const DashLayout = () => {
  return (
    <MiniDrawer>
      <Outlet />
    </MiniDrawer>
  )
};

export default DashLayout;
