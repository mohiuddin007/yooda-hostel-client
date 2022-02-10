import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from "react-pro-sidebar";
import { Link } from 'react-router-dom';
import './Sidebar.scss';

export default function Sidebar() {
  // const logout = () => {
  //   sessionStorage.removeItem('loggedInUser');
  //   window.location.reload();
  // }
    return (
        <ProSidebar 
        // collapsed={true}
        style={{ minHeight: "100vh" }}
        >
          <SidebarHeader>
           <h5 className="text-center mt-4">Yooda Hostel Dashboard</h5> 
          </SidebarHeader>
            <Menu 
            iconShape="square"
            subMenuBullets={true}>
              <SubMenu title="Food" defaultOpen={true}>
                <MenuItem>
                  <Link to="/"> Add Food</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/allFood"> All Food</Link>
                </MenuItem>
              </SubMenu>
              <SubMenu title="Student" defaultOpen={true}>
                <MenuItem>
                  <Link to="/addStudent"> Add Student</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/allStudent"> All Student</Link>
                </MenuItem>
              </SubMenu>
              <SubMenu title="Distribution" defaultOpen={true}>
                <MenuItem>
                  <Link to="/distribution"> Food Distribution</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/allDistributedList"> All Distributed List</Link>
                </MenuItem>
              </SubMenu>
            </Menu>
          </ProSidebar>
    )
}
