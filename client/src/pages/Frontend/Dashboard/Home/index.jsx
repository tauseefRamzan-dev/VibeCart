import { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Typography, Spin,Flex } from 'antd';
import {
  UserOutlined,
  UsergroupAddOutlined,
  SafetyCertificateOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const DashboardHome = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCustomers: 0,
    totalAdmins: 0,
    totalProducts: 0,
    totalOrders: 0,
  });

 
  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        `${import.meta.env.VITE_apiURL}/stats`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (data) {
        setStats({
          totalUsers: data.totalUsers || 0,
          totalCustomers: data.totalCustomers || 0,
          totalAdmins: data.totalAdmins || 0,
          totalProducts: data.totalProducts || 0,
          totalOrders: data.totalOrders || 0,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const cardData = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <UserOutlined style={{ fontSize: 24, color: '#1677ff' }} />,
      bgColor: '#e6f4ff',
      borderColor: '#91caef',
      subText: 'All registered accounts',
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: <UsergroupAddOutlined style={{ fontSize: 24, color: '#52c41a' }} />,
      bgColor: '#f6ffed',
      borderColor: '#b7eb8f',
      subText: 'Active buyers',
    },
    {
      title: 'Total Admins',
      value: stats.totalAdmins,
      icon: <SafetyCertificateOutlined style={{ fontSize: 24, color: '#722ed1' }} />,
      bgColor: '#f9f0ff',
      borderColor: '#d3adf7',
      subText: 'Store management',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: <ShoppingOutlined style={{ fontSize: 24, color: '#fa8c16' }} />,
      bgColor: '#fff7e6',
      borderColor: '#ffd591',
      subText: 'Items in inventory',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: <ShoppingCartOutlined style={{ fontSize: 24, color: '#eb2f96' }} />,
      bgColor: '#fff0f6',
      borderColor: '#ffadd2',
      subText: 'Completed & pending orders',
    },
  ];

  return (
    <div style={{ padding: '8px 4px' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0, fontWeight: 600 }}>
          Dashboard Overview
        </Title>
        <Text type="secondary">Welcome back to VibeCart Admin Portal!</Text>
      </div>

      <Spin spinning={loading}>
        <Row gutter={[20, 20]}>
          {cardData.map((card, index) => (
            <Col xs={24} sm={12} md={8} lg={4.8} key={index} style={{ minWidth: 220, flex: 1 }}>
              <Card
                bordered={false}
                hoverable
                style={{
                  borderRadius: 12,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease',
                  border: `1px solid ${card.borderColor}`,
                }}
                bodyStyle={{ padding: '20px' }}
              >
                <Flex justify="space-between" align="start">
                  <div>
                    <Text type="secondary" style={{ fontSize: 13, fontWeight: 500 }}>
                      {card.title}
                    </Text>
                    <Statistic
                      value={card.value}
                      valueStyle={{
                        fontSize: 26,
                        fontWeight: 700,
                        marginTop: 4,
                        marginBottom: 4,
                        color: '#1f1f1f',
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
            </Col>
          ))}
        </Row>
      </Spin>
    </div>
  );
};

export default DashboardHome;