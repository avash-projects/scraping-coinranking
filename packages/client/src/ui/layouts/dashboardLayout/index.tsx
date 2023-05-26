import { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import useStore from '../../../store';
import menuItems from './menu';

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1] ? location.pathname.split('/')[1] : 'home';

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const socket = useStore((state) => state.socket);

  const logoutUser = () => {
    localStorage.removeItem('jwt_token');
  };

  // useEffect(() => {
  //   function startScrapingEvent() {
  //     console.log(socket)
  //     console.log("Scraping")
  //   }
  //   socket?.on('scraping-started', startScrapingEvent);

  //   return () => {
  //     socket?.off('scraping-started', startScrapingEvent);
  //   }
  // }, [socket])
  // //cleanup
  // useEffect(() => {
  //   socket?.connect();
  //   return () => {
  //     socket?.disconnect();
  //   };
  // }, [socket])

  return (
    <Layout hasSider={true}>
      <Sider
        trigger={null}
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        style={{ height: '100vh' }}
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
      >
        <div
          style={{
            padding: '1rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src="/haddi.jpg"
            width="50%"
            height="50%"
            alt="expertsLogo"
            style={{
              borderRadius: '50%',
            }}
          />
        </div>
        <Menu
          defaultSelectedKeys={[currentPath]}
          items={menuItems}
          theme="dark"
          mode="inline"
          style={{ backgroundColor: 'transparent' }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Row justify="space-between">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Link to="/login">
              <Button
                onClick={logoutUser}
                type="primary"
                style={{ marginRight: '1rem' }}
              >
                Logout
              </Button>
            </Link>
          </Row>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout >
  );
};

export { DashboardLayout };
