import { useEffect, useState } from 'react';
import { Image, Space, Table,message,Dropdown, Button,Popconfirm, Typography } from 'antd';
import { DownOutlined, PlusOutlined, ProductOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';
useNavigate
const All=() =>{

    const [products,setProducts]=useState([])
    const [isLoading,setIsLoading]=useState(false);
const Navigate=useNavigate()
const {Title}=Typography
 const getProducts=async()=>{
     
setIsLoading(true)
      await axios.get(`${import.meta.env.VITE_apiURL}/products/all`)
            .then(({status,data})=>{
              if(status===200)
              {
                const {message: resMessage,products}=data;
                setProducts(products || [])
                // console.log(products)
                // message.success(resMessage);
              }
            }).catch((error)=>{
              console.error(error)
              message.error(error.response?.data?.message);
            }).finally(()=>{
              setIsLoading(false);
            })
        }

const deleteProduct=async(productID)=>{
    const token=localStorage.getItem("token")
     await axios.delete(`${import.meta.env.VITE_apiURL}/products/delete?id=${productID}`, { headers: { Authorization: `Bearer ${token}` } })
       .then(({status,data})=>{
        if(status===200)
        {
            const {message: resMessage,product}=data;
            message.success(resMessage);
            setProducts((prevProducts) => 
        prevProducts.filter((product) => (product.id) !== productID)
      );
        }
       }).catch((error)=>{
        console.error(error)
        message.error(error.response?.data?.message)
       })
       
}


useEffect(()=>{
getProducts();
},[])


const getItems = (record) => [
    {
      key: 'update',
      label: (
        <Button
          type="primary"
          dark
          block
          onClick={() => {
            Navigate(`edit-product/${record.id}`)
          }}
        >
          Update
        </Button>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'delete',
      label: (
        <Popconfirm
          title="Delete Product"
          description="Are you really want to delete this product?"
          onConfirm={() => {
            deleteProduct(record.id)
            
          }
            }
          okText="Yes"
          cancelText="Close"
        >
          <Button type="primary" danger block>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

const columns = [
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: item => (
      <Image
        alt="webp image"
        width={80}
        style={{ objectFit: 'cover' }}
        src={`${item.url}`}
      />
    ),
  },
  {
    title: 'Name',
    dataIndex: 'title',
    key: 'title',
    sorter: (a, b) => (a.title || '').localeCompare(b.title || ''),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter: (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Stock',
    dataIndex: 'stockQuantity',
    key: 'stock',

    sorter: (a, b) => (Number(a.stockQuantity) || 0) - (Number(b.stockQuantity) || 0),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    sorter: (a, b) => (a.category || '').localeCompare(b.category || ''),
    sortDirections: ['descend', 'ascend'],
    sorter: (a, b) => (a.category || '').localeCompare(b.category || ''),
    sortDirections: ['descend', 'ascend'],
    filters: [
      { text: 'Electronics', value: 'electronics' },
      { text: "Men's Clothing", value: "men's-clothing" },
      { text: "Women's Clothing", value: "women's-clothing" },
      { text: 'Jewelery', value: 'jewelery' },
    ],
    onFilter: (value, record) => record.category?.toLowerCase() === value.toLowerCase(),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Created Date',
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
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    render: (_, product) => (
      <Dropdown menu={{ items: getItems(product) }} trigger={['click']}>
        <Button type="link" style={{ padding: 0 }}>
          <Space>
            Action
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    ),
  },
];
const data=products;






    return (
      <>
      <Helmet>
  <title>Manage Products | VibeCart Admin</title>
  <meta name="robots" content="noindex, nofollow" />
</Helmet>

      <div className='d-flex flex-row justify-content-between'>

<Title level={2} className='text-center my-2'><ProductOutlined /> Products</Title>
<Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => Navigate('add-product')} >
          Add Product
        </Button>
      </div>


        <Table rowKey={(record) => record.id}   scroll={{ x: 800 }}  loading={isLoading} columns={columns} dataSource={data} />
      </>
    )



} 

export default All;