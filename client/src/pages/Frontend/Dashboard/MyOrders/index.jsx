import { useEffect, useState } from 'react';
import {  Table, Tag,message,Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { getSocket } from '../../../../socket';
import { Helmet } from 'react-helmet-async';
useNavigate
const Index=() =>{

    const [orders,setOrders]=useState([])
    const [isLoading,setIsLoading]=useState(false);
const Navigate=useNavigate()
const {Title}=Typography
 const getOrders=async()=>{
setIsLoading(true)
const token=localStorage.getItem("token")
      await axios.get(`${import.meta.env.VITE_apiURL}/orders/my-orders`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
            .then(({status,data})=>{
              if(status===200)
              {
                const {message: resMessage,orders}=data;
                setOrders(orders || [])
              
                // message.success(resMessage);
              }
            }).catch((error)=>{
              console.error(error)
              setOrders([]);
            }).finally(()=>{
              setIsLoading(false);
            })
        }


useEffect(()=>{
  getOrders();

  const socket = getSocket();
  if (!socket) return;

  const onStatusUpdated = (order) => {
    setOrders((prev) => prev.map((item) => item.orderID === order.orderID ? order : item));
    message.info(`Order ${order.orderID} is now ${order.status}`);
  };
  const onPaymentUpdated = (order) => {
    setOrders((prev) => prev.map((item) => item.orderID === order.orderID ? order : item));
  };
  const onDeleted = ({ orderID }) => {
    setOrders((prev) => prev.filter((item) => item.orderID !== orderID));
  };

  socket.on("order:status-updated", onStatusUpdated);
  socket.on("order:payment-updated", onPaymentUpdated);
  socket.on("order:deleted", onDeleted);

  return () => {
    socket.off("order:status-updated", onStatusUpdated);
    socket.off("order:payment-updated", onPaymentUpdated);
    socket.off("order:deleted", onDeleted);
  };
},[])


const columns = [

  {
    title: 'Order ID',
    dataIndex: 'orderID',
    key: 'orderID',
    render: (orderID) => (
      <Typography.Paragraph copyable={{ text: orderID }} style={{ margin: 0 }}>
        {orderID}
      </Typography.Paragraph>
    ),
  },
  {
  title: 'Date',
  dataIndex: 'createdAt',
  key: 'createdAt',
  render: (createdAt) => 
    createdAt 
      ? dayjs(createdAt).format('DD MMM YYYY, hh:mm A') 
      : '-',
      sorter: (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0),
            sortDirections: ['descend', 'ascend'],
},
  {
    title: 'Total',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    render:(totalAmount)=>{
      return `$${totalAmount}`
    }
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status)=>{
      let tagColor='default'
      if(status==="pending")
      {
        tagColor="warning";
      }
      if(status==="processing")
      {
        tagColor="processing"
      }
      if(status==="shipped")
      {
        tagColor="purple"
      }
      if(status==="delivered")
      {
        tagColor="success"
      }
      if(status==="cancelled")
      {
        tagColor="error"
      }
      return(
        <Tag color={tagColor}>{status.toUpperCase()}</Tag>

      )
    },
    filters: [
                { text: 'Pending', value: 'pending' },
                { text: 'Processing', value: 'processing' },
                { text: 'Shipped', value: 'shipped' },
                { text: 'Delivered', value: 'delivered' },
                { text: 'Cancelled', value: 'cancelled' },
            ],
            onFilter: (value, record) => record.status?.toLowerCase() === value.toLowerCase(),
            sorter: (a, b) => {
                const statusOrder = { 'PENDING': 1, 'PROCESSING': 2, 'SHIPPED': 3, 'DELIVERED': 4, 'CANCELLED': 5 };
                const rankA = statusOrder[(a.status || '').toUpperCase()] || 99;
                const rankB = statusOrder[(b.status || '').toUpperCase()] || 99;
                return rankA - rankB;
            },
            sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Payment',
    dataIndex: 'isPaid',
    key: 'isPaid',
    render: (isPaid)=>{
      let tagColor='default'
      let payment="";
      if(isPaid===true)
      {
        tagColor="green";
        payment="PAID"
      }
      else{
        tagColor="red"
        payment="NOT PAID"
      }
      return(
        <Tag color={tagColor}>{payment}</Tag>

      )
    },
    filters: [
                { text: 'Paid', value: true },
                { text: 'Not Paid', value: false },
            ],
            onFilter: (value, record) => record.isPaid === value,
            sorter: (a, b) => (a.isPaid ? 1 : 0) - (b.isPaid ? 1 : 0),
            sortDirections: ['descend', 'ascend'],
  },
  
];
const data=orders;

    return (
      <>
<Helmet>
  <title>My Orders | VibeCart</title>
  <meta name="robots" content="noindex, nofollow" />
</Helmet>
      

<Title level={2} className='text-center my-2'><ShoppingCartOutlined /> Orders</Title>



        <Table rowKey={(record) => record._id}   scroll={{ x: 800 }}  loading={isLoading} columns={columns} dataSource={data}
        locale={{
        emptyText: 'You have not placed any orders yet!'
    }}
        />
      </>
    )



} 

export default Index;