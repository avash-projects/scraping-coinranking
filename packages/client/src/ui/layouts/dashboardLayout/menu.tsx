import { EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const links = {
  home: (<NavLink to="/home">Home</NavLink>),
  watchlist: (<NavLink to="/watchlist">Watchlist</NavLink>)
}

const menuItems: MenuProps['items'] = [
  getItem(links.home, 'home', <HomeOutlined />),
  getItem(links.watchlist, 'watchlist', <EyeOutlined />),
]

export default menuItems;