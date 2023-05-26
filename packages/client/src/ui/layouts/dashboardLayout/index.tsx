import { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row } from 'antd';
import { Link, NavLink, Outlet } from 'react-router-dom';
import SiderButton from '../../components/SiderButton';
import { HomeOutlined } from '@ant-design/icons';
import useStore from '../../../store';

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  const socket = useStore((state) => state.socket)
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logoutUser = () => {
    localStorage.removeItem('jwt_token');
  };



  useEffect(() => {
    const test = () => {
      console.log(socket)
      console.log("Scraping")
    }
    if (socket) {
      socket.on('scraping-started', test)
    }
  }, [])
  //cleanup
  useEffect(() => {
    return () => {
      socket?.disconnect();
    };
  }, [])
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
        <Menu theme="dark" mode="inline">
          <Menu.Item key={'1'} style={{ backgroundColor: 'transparent' }}>
            <NavLink to="/">
              {({ isActive, isPending }) => (
                <SiderButton
                  isActive={isActive}
                  isPending={isPending}
                  text="Dashboard"
                  icon={<HomeOutlined />}
                />
              )}
            </NavLink>
          </Menu.Item>
          <Menu.Item key={'2'} style={{ backgroundColor: 'transparent' }}>
            <NavLink to="/users">
              {({ isActive, isPending }) => (
                <SiderButton
                  isActive={isActive}
                  isPending={isPending}
                  text="Users"
                  icon={<UserOutlined />}
                />
              )}
            </NavLink>
          </Menu.Item>
        </Menu>
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
    </Layout>
  );
};

export { DashboardLayout };
