import { useEffect, useRef, useState } from 'react';
import { Space, Table, Tag,message,Dropdown, Button,Popconfirm, Typography,Modal,Select,Input } from 'antd';
import { DownOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { getSocket } from '../../../../socket';
import Highlighter from 'react-highlight-words';
import { Helmet } from 'react-helmet-async';

const Index=() =>{

    const [orders,setOrders]=useState([])
     const [statusToUpdate,setStatusToUpdate]=useState(null)
        const [selectedStatus, setSelectedStatus] = useState(null);
            const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading,setIsLoading]=useState(false);
const Navigate=useNavigate()
const {Title}=Typography
const token=localStorage.getItem("token")
const handleChange = value => {
  setStatusToUpdate(value);
};
 const getOrders=async()=>{
setIsLoading(true)
      await axios.get(`${import.meta.env.VITE_apiURL}/orders/all`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
            .then(({status,data})=>{
              if(status===200)
              {
                const {message: resMessage,orders}=data;
                setOrders(orders || [])
                // console.log(orders)
                // message.success(resMessage);
              }
            }).catch((error)=>{
              console.error(error)
              message.error(error.response?.data?.message);
            }).finally(()=>{
              setIsLoading(false);
            })
        }

const deleteOrder=async(id)=>{
    
     await axios.delete(`${import.meta.env.VITE_apiURL}/orders/delete?id=${id}`, { headers: { Authorization: `Bearer ${token}` } })
       .then(({status,data})=>{
        if(status===200)
        {
            const {message: resMessage,product}=data;
            message.success(resMessage);
            setOrders((prevOrders) => 
        prevOrders.filter((Order) => (Order.orderID) !== id)
      );
        }
       }).catch((error)=>{
        console.error(error)
        message.error(error.response?.data?.message)
       })
       
}

const updateOrderStatus=async()=>{
  const id=selectedStatus.orderID;
  
     await axios.patch(`${import.meta.env.VITE_apiURL}/orders/order/${id}/status-update`, {status: statusToUpdate},{ headers: { Authorization: `Bearer ${token}` } })
       .then(({status,data})=>{
        if(status===200)
        {
            const {message: resMessage,order}=data;
            // message.success(resMessage);
             getOrders()
        }
       }).catch((error)=>{
        console.error(error)
        message.error(error.response?.data?.message)
       })
}

const updatePaymentStatus =async(orderID, currentIsPaid) => {
  try {
    const newPaymentStatus=!currentIsPaid;
    const response=await axios.patch(
      `${import.meta.env.VITE_apiURL}/orders/order/${orderID}/payment-update`,
      { isPaid: newPaymentStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    if (response.status===200)
       {
      message.success(response.data.message);
      getOrders();
    }
  } catch(error) {
    console.error(error);
    message.error(error.response?.data?.message || "Failed to update payment status");
  }
};


useEffect(() => {
    getOrders();

    const socket = getSocket();
    if (!socket) return;

    const onCreated = (order) => {
      setOrders((prev) => [order, ...prev.filter((item) => item.orderID !== order.orderID)]);
      message.info(`New order received: ${order.orderID}`);
    };
    const onStatusUpdated = (order) => {
      setOrders((prev) => prev.map((item) => (item.orderID === order.orderID ? order : item)));
    };
    const onPaymentUpdated = (order) => {
      setOrders((prev) => prev.map((item) => (item.orderID === order.orderID ? order : item)));
    };
    const onDeleted = ({ orderID }) => {
      setOrders((prev) => prev.filter((item) => item.orderID !== orderID));
    };

    socket.on("order:created", onCreated);
    socket.on("order:status-updated", onStatusUpdated);
    socket.on("order:payment-updated", onPaymentUpdated);
    socket.on("order:deleted", onDeleted);

    return () => {
      socket.off("order:created", onCreated);
      socket.off("order:status-updated", onStatusUpdated);
      socket.off("order:payment-updated", onPaymentUpdated);
      socket.off("order:deleted", onDeleted);
    };
  }, []);




const getItems = (record) => [
    {
      key: 'Status-Marking',
      label: (
        <Button
         
          dark
          block
          onClick={() => {
            showModal(record)
          }}
        >
          Status Marking
        </Button>
      ),
    },
    {
    key: 'payment-toggle',
    label: (
      <Popconfirm
        title="Update Payment"
        description={`Mark this order as ${record.isPaid ? 'Not Paid' : 'Paid'}?`}
        onConfirm={() => updatePaymentStatus(record.orderID, record.isPaid)}
        okText="Yes"
        cancelText="Cancel"
      >
        <Button type="default" block>
          Mark as {record.isPaid ? 'Not Paid' : 'Paid'}
        </Button>
      </Popconfirm>
    ),
  },
    {
      type: 'divider',
    },
    {
      key: 'delete',
      label: (
        <Popconfirm
          title="Delete Order"
          description="Are you really want to delete this order?"
          onConfirm={() => {
            deleteOrder(record.orderID)
            
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

//Antd Table Filter 
const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });





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
    ...getColumnSearchProps('orderID'),
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
},
  {
    title: 'Total',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    render:(totalAmount)=>{
      return `$${totalAmount}`
    },
    sorter: (a, b) => (Number(a.totalAmount) || 0) - (Number(b.totalAmount) || 0),
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
    sorter: (a, b) => {
            const statusOrder = { 
                'PENDING': 1, 
                'PROCESSING': 2, 
                'SHIPPED': 3, 
                'DELIVERED': 4, 
                'CANCELLED': 5 
            };
            const statusA = (a.status || '').toUpperCase();
            const statusB = (b.status || '').toUpperCase();
            
            const rankA = statusOrder[statusA] || 99;
            const rankB = statusOrder[statusB] || 99;
            
            if (rankA !== rankB) {
                return rankA - rankB;
            }
            return statusA.localeCompare(statusB);
        },
        sortDirections: ['descend', 'ascend'],
        filters: [
      { text: 'Pending', value: 'pending' },
      { text: 'Processing', value: 'processing' },
      { text: 'Shipped', value: 'shipped' },
      { text: 'Delivered', value: 'delivered' },
      { text: 'Cancelled', value: 'cancelled' },
    ],
    onFilter: (value, record) => record.status?.toLowerCase() === value.toLowerCase(),
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
    sorter: (a, b) => {
            const valA = a.isPaid ? 1 : 0;
            const valB = b.isPaid ? 1 : 0;
            return valA - valB;
        },
        sortDirections: ['descend', 'ascend'],
  },  
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    render: (_,product) => (
<Dropdown menu={ {items: getItems(product)} } trigger={['click']}>
   <Button type="link" style={{ padding: 0 }}>
    <Space>
    Action
    <DownOutlined />
    </Space>
  </Button>
  </Dropdown>
    )
}
];
const data=orders;

const showModal = (record) => {
  setSelectedStatus(record);
  setStatusToUpdate(record.status || "pending"); 
  setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    updateOrderStatus();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };



    return (
      <>
<Helmet>
  <title>Manage Orders | VibeCart Admin</title>
  <meta name="robots" content="noindex, nofollow" />
</Helmet>
      

<Title level={2} className='text-center my-2'><ShoppingCartOutlined /> Orders</Title>

{/* 

        <Table  expandable={{
      expandedRowRender: record => (
        <table class="table table-hover table-striped">
  <thead>
    <tr>
      <th scope="col">Product Image</th>
      <th scope="col">Product Name</th>
      <th scope="col">Quantity</th>
    </tr>
  </thead>
  <tbody>
    
    {
      record.orderItems?.map((item)=>{
        return(
          
          <tr>
      <td><img src={item.image?.url} alt="" /></td>
      <td>{item.title}</td>
      <td>{item.quantity}</td>
    </tr>
        )
      })
    }
    
  </tbody>
</table>
      ),
      rowExpandable: record => record.name !== 'Not Expandable',
    }}  rowKey={(record) => record.orderID}   scroll={{ x: 800 }}  loading={isLoading} columns={columns} dataSource={data} /> */}
     
     <Table
  expandable={{
    expandedRowRender: (record) => (
      <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
        
        
        <div style={{ marginBottom: '16px', padding: '16px', background: '#fff', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
          <h5 style={{ margin: '0 0 12px 0', color: '#1677ff', fontSize: '15px' }}>👤 Buyer Details</h5>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', fontSize: '13px' }}>
            
            <div>
              <strong style={{ color: '#4b5563' }}>Account User:</strong> 
              <div>
                <Space size={"small"}>
                {record.user?.fullName}
                {console.log(record)}
                {record.user?.email}
                </Space>
              </div>
            </div>

            
            <div>
              <strong style={{ color: '#4b5563' }}>Recipient Name:</strong> 
              <div>{record.shippingAddress?.fullName || 'N/A'}</div>
            </div>

            <div>
              <strong style={{ color: '#4b5563' }}>Contact Phone:</strong> 
              <div>{record.shippingAddress?.phoneNumber || 'N/A'}</div>
            </div>

            <div>
              <strong style={{ color: '#4b5563' }}>Contact Email:</strong> 
              <div>{record.shippingAddress?.email || 'N/A'}</div>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <strong style={{ color: '#4b5563' }}>Shipping Address:</strong> 
              <div>
                {record.shippingAddress 
                  ? `${record.shippingAddress.state || ''}, ${record.shippingAddress.country || ''} - ${record.shippingAddress.zipCode || ''}` 
                  : 'N/A'}
              </div>
            </div>
          </div>
        </div>

        <h5 style={{ margin: '0 0 8px 0', color: '#1677ff', fontSize: '15px' }}>📦 Order Items</h5>
        <table className="table table-hover table-bordered align-middle bg-white mb-3">
          <thead className="table-light">
            <tr>
              <th scope="col">Product ID</th>
              <th scope="col">Product Name</th>
              <th scope="col" className="text-center">Quantity</th>
              <th scope="col" className="text-end">Price</th>
            </tr>
          </thead>
          <tbody>
            {record.orderItems?.map((item, index) => (
              <tr key={item.id || index}>
                <td>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>{item.id || 'N/A'}</span>
                </td>
                <td>
                  <strong>{item.title || 'Product Item'}</strong>
                </td>
                <td className="text-center">
                  <Tag color="blue">{item.quantity || 1}</Tag>
                </td>
                <td className="text-end">${item.price || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '260px', background: '#fff', padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span>Subtotal:</span>
              <strong>${record.subtotal || 0}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span>Shipping Fee:</span>
              <strong>${record.shippingFee || 30}</strong>
            </div>
            <hr style={{ margin: '6px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#1677ff' }}>
              <strong>Total Amount:</strong>
              <strong>${record.totalAmount || 0}</strong>
            </div>
          </div>
        </div>

      </div>
    ),
    rowExpandable: (record) => record.orderItems && record.orderItems.length > 0,
  }}
  rowKey={(record) => record.orderID || record.id}
  scroll={{ x: 800 }}
  loading={isLoading}
  columns={columns}
  dataSource={data}
/>
      <Modal
        title="Change Order Status"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        >
           <Select
      value={statusToUpdate}
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' },
      ]}
    />
      </Modal>
      </>
    )



} 

export default Index;