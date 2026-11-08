 function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
 export const sidebarItems=[
  getItem('Dashboard', '1', <PieChartOutlined />),
  getItem('Products', '2', <DesktopOutlined />),
  getItem('Orders', 'sub1', <UserOutlined />, ),
  getItem('Users', 'sub1', <UserOutlined />, ),
];