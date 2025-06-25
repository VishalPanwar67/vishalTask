import React, { useState } from "react";
import {
  TeamOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ContactsOutlined,
  MailOutlined,
  ProjectOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Contacts", "/", <ContactsOutlined style={{ fontSize: "22px" }}  />),
  getItem("Subscribed", "/subscribe", <MailOutlined style={{ fontSize: "22px" }} />),
  getItem("Clients", "sub2", <TeamOutlined style={{ fontSize: "22px" }} />, [
    getItem("Add Client", "/clients/add"),
    getItem("View Client", "/clients/view"),
  ]),
  getItem("Project", "sub3", <ProjectOutlined style={{ fontSize: "22px" }} />, [
    getItem("Add Project", "/projects/add"),
    getItem("View Project", "/projects/view"),
  ]),
];

const LayoutD = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  // Handle menu item click
  const onMenuClick = (e) => {
    navigate(e.key); // Navigate to the selected path
  };

  return (
    <Layout
    >
      <Sider
          trigger={null} collapsible collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["/"]}
          mode="inline"
          items={items}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout>
        <Header
            className="d-flex justify-content-between ps-1 pe-5"
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
        >
          <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
          />
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutD;
