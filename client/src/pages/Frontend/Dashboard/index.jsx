import { useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import {
  Typography,
  ConfigProvider,
  Layout,
  Menu,
  Button,
  Space,
  Grid,
  Drawer,
} from 'antd';
import {
  PieChartOutlined,
  ProductOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  GlobalOutlined,
  MenuOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import Routes from '../Dashboard/Routes';
import { useAuth } from '../../../context/Auth';
const { Header, Content, Footer, Sider } = Layout;
const { useBreakpoint } = Grid;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const filterItems=(user)=>{
   let isAdminORsuperAdmin= user.role==="admin"||user.role==="superAdmin";
   const isCustomer=user.role==="customer"
   const menuItems = [
    isCustomer && getItem(<Link to="/dashboard/my-orders" className="text-decoration-none">My Orders</Link>, 'my-orders', <ShoppingOutlined/>),

    isAdminORsuperAdmin && getItem(<Link to="/dashboard" className="text-decoration-none">Dashboard</Link>, 'dashboard', <PieChartOutlined />),
    isAdminORsuperAdmin && getItem(<Link to="/dashboard/products" className="text-decoration-none">Products</Link>, 'products', <ProductOutlined />),
    isAdminORsuperAdmin && getItem(<Link to="/dashboard/orders" className="text-decoration-none">Orders</Link>, 'orders', <UnorderedListOutlined />),
    isAdminORsuperAdmin && getItem(<Link to="/dashboard/users" className="text-decoration-none">Users</Link>, 'users', <TeamOutlined />),
  ];
  return menuItems;
}



const profileMenuItems = [
  {
    key: '1',
    label: <Link to="/dashboard/profile">My Profile</Link>,
    icon: <UserOutlined />,
  },
  {
    key: '2',
    label: <Link to="/dashboard/settings">Settings</Link>,
    icon: <SettingOutlined />,
  },
  {
    type: 'divider',
  },
  {
    key: '3',
    danger: true,
    label: 'Logout',
    icon: <LogoutOutlined />,
  },
];

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  
  const screens = useBreakpoint();
  const isMobile = !screens.md; 
  
  const { Title } = Typography;
  const currentYear = new Date().getFullYear();
  const {user}=useAuth();
const location = useLocation();
const items = filterItems(user);

const now=new Date();


const getSelectedKey = () => {
    const path = location.pathname;
    if (path.includes('/dashboard/my-orders')) return 'my-orders';
    if (path.includes('/dashboard/products')) return 'products';
    if (path.includes('/dashboard/orders')) return 'orders';
    if (path.includes('/dashboard/users')) return 'users';
    if (path === '/dashboard' || path === '/dashboard/') return 'dashboard';
    return 'dashboard';
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1E3A2B',
          colorBgLayout: '#F9FAFB',
        },
        components: {
          Layout: {
            siderBg: '#FFFFFF',
            headerBg: '#FFFFFF',
          },
          Menu: {
            itemBg: '#FFFFFF',
            itemColor: '#4B5563',
            itemHoverBg: '#F3F4F6',
            itemHoverColor: '#1E3A2B',
            itemSelectedBg: '#E6ECE9',
            itemSelectedColor: '#1E3A2B',
          },
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        {!isMobile && (
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ borderRight: '1px solid #E5E7EB' }}
          >
            {!collapsed && 
(

  <Link 
  to={"/"} 
              className="navbar-brand d-flex align-items-center"
              style={{ 
                height: '40px',          
                width: '160px',         
                overflow: 'hidden',      
                position: 'relative',
                paddingBottom: "80px"
              }}
>
  <img 
    src="/logo.png" 
    alt="VibeCart Logo" 
    style={{ 
      height: '140px',       
      width: 'auto',
      maxWidth: 'none',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)', 
      objectFit: 'contain'
    }} 
    />
</Link>
  )
  }
            {collapsed && (
              <Title level={4} className="text-center p-3" style={{ margin: 0 }}>
                VC
              </Title>
            )}
            <Menu selectedKeys={getSelectedKey()} mode="inline" items={items} />
          </Sider>
        )}

        {isMobile && (
          <Drawer
            title="VibeCart"
            placement="left"
            onClose={() => setMobileDrawerOpen(false)}
            open={mobileDrawerOpen}
            bodyStyle={{ padding: 0 }}
            width={240}
          >
            <Menu
              // defaultSelectedKeys={['1']}
              selectedKeys={[getSelectedKey()]}
              mode="inline"
              items={items}
              onClick={() => setMobileDrawerOpen(false)} 
            />
          </Drawer>
        )}

        <Layout>
          <Header
            style={{
              padding: isMobile ? '0 16px' : '0 24px',
              borderBottom: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Space size={isMobile ? 'small' : 'large'}>
              {isMobile ? (
                <Button
                  type="text"
                  icon={<MenuOutlined style={{ fontSize: '18px' }} />}
                  onClick={() => setMobileDrawerOpen(true)}
                />
              ) : (
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{ fontSize: '16px' }}
                />
              )}
            </Space>

           
            
               <Button
              type="link"
              icon={<GlobalOutlined />}
              href="/"
              style={{ color: '#4B5563' }}
            >
              {!isMobile ? 'View Store' : 'Store'}
            </Button>

              {
                /*
              <Dropdown menu={{ items: profileMenuItems }} placement="bottomRight">
                <Space style={{ cursor: 'pointer' }}>
                  <Avatar style={{ backgroundColor: '#1E3A2B' }}>A</Avatar>
                  {!isMobile && (
                    <span style={{ fontWeight: 500, color: '#374151' }}>Admin</span>
                  )}
                </Space>
              </Dropdown>
            </Space> */}
          </Header>

          <Content
            style={{
              margin: isMobile ? '12px 8px' : '24px 16px',
              minHeight: 280,
            }}
          >
            <Routes />
          </Content>

          <Footer >
           
          <div className='text-center'>VibeCart &copy; {now.getFullYear()}.  All Right Reserved. Developed By Mirza Tauseef Ramzan</div>
           
          </Footer>

        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Index;