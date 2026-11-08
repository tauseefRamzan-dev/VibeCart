import { useEffect, useRef, useState } from 'react';
import { Table, Tag,message,Dropdown, Button,Popconfirm,Modal, Select,Typography,Space, Input } from 'antd';
import { DownOutlined, SearchOutlined, TeamOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { Helmet } from 'react-helmet-async';
useNavigate
const All=() =>{

    const [users,setUsers]=useState([])
    const [roleToUpdate,setRoleToUpdate]=useState(null)
    const [selectedUser, setSelectedUser] = useState(null);
    const [isLoading,setIsLoading]=useState(false);
      const [isModalOpen, setIsModalOpen] = useState(false);

const Navigate=useNavigate()
const {Title}=Typography
const handleChange = value => {
  setRoleToUpdate(value);
};



 const getUsers=async()=>{
setIsLoading(true)
const token=localStorage.getItem("token")
      await axios.get(`${import.meta.env.VITE_apiURL}/users/all`, { headers: { Authorization: `Bearer ${token}` } })
            .then(({status,data})=>{
              if(status===200)
              {
                const {message: resMessage,users}=data;
                setUsers(users)
                // console.log(users)
                // console.log(resMessage)
                // message.success(resMessage);
              }
            }).catch((error)=>{
              console.error(error)
              message.error(error.response?.data?.message);
            }).finally(()=>{
              setIsLoading(false);
            })
        }

const deleteUser=async(userID)=>{
    const token=localStorage.getItem("token")
     await axios.delete(`${import.meta.env.VITE_apiURL}/users/user/delete?id=${userID}`, { headers: { Authorization: `Bearer ${token}` } })
       .then(({status,data})=>{
        if(status===200)
        {
            const {message: resMessage,product}=data;
            message.success(resMessage);
             getUsers();
        }
       }).catch((error)=>{
        console.error(error)
        message.error(error.response?.data?.message)
       })
       
}

const updateUserRole=async()=>{
  const uid=selectedUser.uid;
   const token=localStorage.getItem("token")
  
     await axios.patch(`${import.meta.env.VITE_apiURL}/users/user/role?id=${uid}`, {role: roleToUpdate},{ headers: { Authorization: `Bearer ${token}` } })
       .then(({status,data})=>{
        if(status===200)
        {
            const {message: resMessage,product}=data;
            message.success(resMessage);
             getUsers();
        }
       }).catch((error)=>{
        console.error(error)
        message.error(error.response?.data?.message)
       })
}

useEffect(()=>{
getUsers();
},[])


const getItems = (record) => [
    {
      key: 'Change Role',
      label: (
        <Button
          type="primary"
          dark
          block
          onClick={() => {
            showModal(record)
          }}
        >
          Change Role
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
          title="Delete User"
          description={`Are you really want to delete this user (${record.email}) ?`}
          onConfirm={() => {
            deleteUser(record.uid)
          
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
  // {
  //   title: 'Image',
  //   dataIndex: 'image',
  //   key: 'image',
  //   render: item => <Image
  //     alt="webp image"
  //     width={80}
  //     style={{ borderRadius: '50%', objectFit: 'cover' }}
  //     src={`${item.url}`}
  //   />,
  // },
  {
    title: 'Name',
    dataIndex: 'fullName',
    key: 'name',
    sorter: (a, b) => (a.fullName || '').localeCompare(b.fullName || ''),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
        ...getColumnSearchProps('email'),

  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (role)=>{
    const formattedRole = role.toUpperCase();

      const upperRole = role.toUpperCase();

    // Color logic condition
    let tagColor = 'default';
    let displayRole = upperRole;

    if (upperRole === 'SUPERADMIN' || upperRole === 'SUPER ADMIN') {
      tagColor = 'green';          
      displayRole = 'SUPER ADMIN';
    } else if (upperRole === 'CUSTOMER') {
      tagColor = 'blue';             
      displayRole = 'CUSTOMER';
    } else if (upperRole === 'ADMIN') {
      tagColor = 'volcano';          
      displayRole = 'ADMIN';
    }

    return <Tag color={tagColor}>{displayRole}</Tag>;


  },
  filters: [
      { text: 'Super Admin', value: 'superAdmin' },
      { text: 'Admin', value: 'admin' },
      { text: 'Customer', value: 'customer' },
    ],
    onFilter: (value, record) => record.role?.toLowerCase() === value.toLowerCase(),
sorter: (a, b) => {
    const roleOrder = { 'SUPERADMIN': 1, 'SUPER ADMIN': 1, 'ADMIN': 2, 'CUSTOMER': 3 };
    const roleA = (a.role || '').toUpperCase();
    const roleB = (b.role || '').toUpperCase();
    
    const rankA = roleOrder[roleA] || 99;
    const rankB = roleOrder[roleB] || 99;
    
    if (rankA !== rankB) {
        return rankA - rankB;
    }
    return roleA.localeCompare(roleB);
},
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status)=>{
      let displayStatus=status?.toUpperCase();
      let tagColor="default"

      if(displayStatus==="ACTIVE")
      {
        tagColor="green"
      }
      if(displayStatus==="INACTIVE")
      {
        tagColor="red"
      }
      return <Tag color={tagColor} >{displayStatus}</Tag>
    },
    filters: [
      { text: 'Active', value: 'active' },
      { text: 'Inactive', value: 'inactive' },
    ],
    onFilter: (value, record) => record.status?.toLowerCase() === value.toLowerCase(),
   sorter: (a, b) => {
    const statusOrder = { 'ACTIVE': 1, 'INACTIVE': 2 };
    const statusA = (a.status || '').toUpperCase();
    const statusB = (b.status || '').toUpperCase();
    
    const rankA = statusOrder[statusA] || 99;
    const rankB = statusOrder[statusB] || 99;
    
    if (rankA !== rankB) {
        return rankA - rankB;
    }
    return statusA.localeCompare(statusB);
},
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    render: (_,user) => (
<Dropdown menu={ {items: getItems(user)} } trigger={['click']}>
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
const data=users;


 const showModal = (record) => {
  setSelectedUser(record);
  setRoleToUpdate(record.role || "customer"); 
  setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    updateUserRole();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

    return (
<>
<Helmet>
  <title>Manage Users | VibeCart Admin</title>
  <meta name="robots" content="noindex, nofollow" />
</Helmet>


<div>

<Title level={2} className='text-center my-2'><TeamOutlined/> Users</Title>
</div>
        <Table rowKey={(record)=> record.uid} scroll={{ x: 800 }}  loading={isLoading} columns={columns} dataSource={data} />

         <Modal
        title="Change Role"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        >
           <Select
      defaultValue={roleToUpdate}
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        { value: 'admin', label: 'Admin' },
        { value: 'customer', label: 'Customer' },
      ]}
    />
      </Modal>
        </>
    )


  }


export default All;