import { useEffect, useState } from 'react';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import useStore from '../../store';
import menuItems from './menu';
import ScrapingStatus from './components/ScrapingStatus';
import { useQueryClient } from '@tanstack/react-query';

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1] ? location.pathname.split('/')[1] : 'home';

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const socket = useStore((state) => state.socket);
  const isScraping = useStore((state) => state.isScraping);
  const updateScrapingStatus = useStore((state) => state.updateScrapingStatus);

  const logoutUser = () => {
    localStorage.removeItem('jwt_token');
  };

  useEffect(() => {
    function startScrapingEvent() {
      updateScrapingStatus(true);
    }
    function endScrapingEvent() {
      updateScrapingStatus(false);
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }

    socket?.on('scraping-started', startScrapingEvent);
    socket?.on('scraping-ended', endScrapingEvent);

    return () => {
      socket?.off('scraping-started', startScrapingEvent);
      socket?.off('scraping-ended', endScrapingEvent);
    }
  }, [socket, updateScrapingStatus, queryClient]);
  //cleanup
  useEffect(() => {
    socket?.connect();
    return () => {
      socket?.disconnect();
    };
  }, [socket])

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
          <Row justify="space-between" align="middle">
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
            <Row align="middle">
              {
                isScraping && <ScrapingStatus sx={{ marginRight: '4rem' }} />
              }
              <Link to="/login">
                <LogoutOutlined
                  onClick={logoutUser}
                  style={{ marginRight: '2rem', fontSize: '20px' }}
                />
              </Link>
            </Row>
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
