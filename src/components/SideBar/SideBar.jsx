import React from "react";

import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

function SideBar() {
  const { collapseSidebar } = useProSidebar();

  return (
    <div style={{ display: "flex", height: "" }}>
      <Sidebar>
        <Menu>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
        </Menu>
      </Sidebar>

      <main>
        <button onClick={() => collapseSidebar()}>Collapse</button>
      </main>
    </div>
  );
}

export default SideBar;
