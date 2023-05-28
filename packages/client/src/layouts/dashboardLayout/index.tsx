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
import DateInfo from './components/DateInfo';
import { useFetchHistory } from './hooks/useFetchHistory';
import Notification from './components/Notification';
import { useFetchUnread } from './hooks/useFetchUnread';

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  const { history, isLoadingHistory } = useFetchHistory();
  const { notifications, unreadCount } = useFetchUnread();
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
      queryClient.invalidateQueries({ queryKey: ['coins'] })
      queryClient.invalidateQueries({ queryKey: ['history'] })
    }

    function notificationEvent() {
      queryClient.invalidateQueries({ queryKey: ['notification'] })
    }

    socket?.on('scraping-started', startScrapingEvent);
    socket?.on('scraping-ended', endScrapingEvent);
    socket?.on('price-notification', notificationEvent);

    return () => {
      socket?.off('scraping-started', startScrapingEvent);
      socket?.off('scraping-ended', endScrapingEvent);
      socket?.off('price-notification', notificationEvent)
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
                isScraping && <ScrapingStatus sx={{ marginRight: '2rem' }} />
              }
              {
                !isScraping && !isLoadingHistory && <DateInfo
                  sx={{ marginRight: '2rem', display: 'flex', flexDirection: 'column' }}
                  date={history?.scrapeDate}
                  totalDocs={history?.totalRecords}
                />
              }
              <Notification 
                notifications={notifications}
                unreadCount={unreadCount}
              />
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
