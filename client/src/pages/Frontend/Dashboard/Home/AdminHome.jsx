import { useEffect, useState } from 'react';
import { Card, Statistic, Typography, Spin, message, Flex } from 'antd';
import {
  UserOutlined,
  UsergroupAddOutlined,
  SafetyCertificateOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const { Title, Text } = Typography;

const AdminHome = () => {
  const [isLoading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCustomers: 0,
    totalAdmins: 0,
    totalProducts: 0,
    totalOrders: 0,
  });
  
  const getDashboardStats = async () => {
    const token = localStorage.getItem("token");
    setLoading(true)
    await axios.get(`${import.meta.env.VITE_apiURL}/stats/dashboard-stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ status, data }) => {
      if (status === 200) {
        const { message: resMessage, stats } = data;
        // message.success(resMessage);
        setStats(stats);
      }
    }).catch((error) => {
      console.error(error);
      message.error(error.response?.data?.message);
    }).finally(()=>{
      setLoading(false)
    });
  };

  useEffect(() => {
    getDashboardStats();
  }, []);

  const cardData = [
    {
      title: 'Total Users',
      value: stats?.totalUsers,
      icon: <UserOutlined style={{ fontSize: 24, color: '#1677ff' }} />,
      bgColor: '#e6f4ff',
      borderColor: '#91caef',
      subText: 'All registered accounts',
    },
    {
      title: 'Total Customers',
      value: stats?.totalCustomers,
      icon: <UsergroupAddOutlined style={{ fontSize: 24, color: '#52c41a' }} />,
      bgColor: '#f6ffed',
      borderColor: '#b7eb8f',
      subText: 'Active buyers',
    },
    {
      title: 'Total Admins',
      value: stats?.totalAdmins,
      icon: <SafetyCertificateOutlined style={{ fontSize: 24, color: '#722ed1' }} />,
      bgColor: '#f9f0ff',
      borderColor: '#d3adf7',
      subText: 'Store management',
    },
    {
      title: 'Total Products',
      value: stats?.totalProducts,
      icon: <ShoppingOutlined style={{ fontSize: 24, color: '#fa8c16' }} />,
      bgColor: '#fff7e6',
      borderColor: '#ffd591',
      subText: 'Items in inventory',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders,
      icon: <ShoppingCartOutlined style={{ fontSize: 24, color: '#eb2f96' }} />,
      bgColor: '#fff0f6',
      borderColor: '#ffadd2',
      subText: 'Completed & pending orders',
    },
  ];

  return (
    <>
<Helmet>
  <title>Admin Dashboard | VibeCart</title>
  <meta name="robots" content="noindex, nofollow" />
</Helmet>


    <div className="container-fluid p-2">
      <div className="mb-4">
        <Title level={3} style={{ margin: 0, fontWeight: 600 }}>
          Dashboard Overview
        </Title>
        <Text type="secondary">Welcome back to VibeCart Admin Portal!</Text>
      </div>

      <Spin spinning={isLoading}>
        <div className="row g-3">
          {cardData.map((card, index) => (
            <div className="col-12 col-md-6 col-lg-6" key={index}>
              <Card
              loading={isLoading}
                variant="borderless"
                hoverable
                style={{
                  borderRadius: 12,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease',
                  border: `1px solid ${card.borderColor}`,
                }}
                styles={{ body: { padding: '20px' } }}
              >
                <Flex justify="space-between" align="start">
                  <div>
                    <Text type="secondary" style={{ fontSize: 13, fontWeight: 500 }}>
                      {card.title}
                    </Text>
                    <Statistic
                      value={card.value}
                      styles={{
                        content: {
                          fontSize: 26,
                          fontWeight: 700,
                          marginTop: 4,
                          marginBottom: 4,
                          color: '#1f1f1f',
                        },
                      }}
                    />
                  </div>
                  <div
                    style={{
                      backgroundColor: card.bgColor,
                      padding: 12,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {card.icon}
                  </div>
                </Flex>
                <div style={{ marginTop: 8 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {card.subText}
                  </Text>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Spin>
    </div>
    </>
  );
};

export default AdminHome;