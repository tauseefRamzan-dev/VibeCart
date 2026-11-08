// // import { useEffect, useState } from 'react'
// // import { Typography, Space, Row, Col,message,Input } from 'antd'
// // import { Link } from 'react-router-dom'
// // import Loader from './Loader'
// // import axios from 'axios';
// // import { useCart } from '../context/CartContext';
// // const { Search } = Input;
// // const Products = () => {
// //   const {Title,Paragraph}=Typography;
// //   const [products,setProducts]=useState([]);
// //   const [category,setCategory]=useState("");
// //   const [isLoading,setIsLoading]=useState(true);
// //   const [searchQuery,setSearchQuery]=useState("")
// //   const {addToCart}=useCart();
// //   const getProducts=async()=>{
   

// //       await axios.get(`${import.meta.env.VITE_apiURL}/products/all`)
// //             .then(({status,data})=>{
// //               if(status===200)
// //               {
// //                 const {message: resMessage,products}=data;
// //                 setProducts(products)
// //                 // message.success(resMessage);
// //               }
// //             }).catch((error)=>{
// //               console.error(error)
// //               message.error(error.response?.data?.message);
// //             }).finally(()=>{
// //               setIsLoading(false);
// //             })
            
// //   }
// //   useEffect(()=>{
// // getProducts();
// //   },[])

// // const displayProducts = products.filter((item) => {
// //     const matchesCategory = category === "" || item.category === category
// //     const matchesSearch =
// //       item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       item.description?.toLowerCase().includes(searchQuery.toLowerCase())

// //     return matchesCategory && matchesSearch
// //   })
// //   return (
// //     <>
// //     <div className="container">
// //     <Title level={1} className='fw-lighter text-center mt-4 '>Latest Products</Title>
// //      < hr/>
// //     <Row className='d-flex justify-content-center gap-3'>

      
// //       <button onClick={()=>{
// //         setCategory("");
// //       }} className={`btn ${category === "" ? "btn-dark" : "btn-outline-dark"}`}>All</button>
// //       <button onClick={()=>{ setCategory("men's-clothing")}} className='btn btn-outline-dark'>Men's Clothing</button>
// //       <button onClick={()=>{
// //         setCategory("women's-clothing");
// //       }} className={`btn ${category === "women's-clothing" ? "btn-dark" : "btn-outline-dark"}`}>Women's Clothing</button>
// //       <button onClick={()=>{
// //         setCategory("jewelery")
// //       }} className={`btn ${category === "jewelery" ? "btn-dark" : "btn-outline-dark"}`}>Jewelery</button>
// //       <button onClick={()=>{
// //         setCategory("electronics")
// //       }} className={`btn ${category === "electronics" ? "btn-dark" : "btn-outline-dark"}`}>Electronics</button>
// //     </Row> 
// //     <Row className="d-flex justify-content-center mb-4 mt-2">
// //         <Search
// //   style={{ maxWidth: 400, width: '100%' }}
// //   size="large"
// //   placeholder="Search products..."
// //   allowClear
// //   onChange={(e) => setSearchQuery(e.target.value)}
// //   onSearch={(value) => setSearchQuery(value)}
// // />
// //       </Row>
// //     <Row gutter={[16,16]} className='mt-4'>
// //   { 
// //      (isLoading)?
// //         <Loader/>
// //      :

// //      (displayProducts.length===0)?
// //           <Col span={24} className="text-center my-5 py-4">
// //     <Title level={3} type="secondary" className="fw-light mb-2">
// //       No Products Found
// //     </Title>
// //     <Typography.Text type="secondary" className="d-block mb-3">
// //       We couldn't find any items matching "{searchQuery}"
// //     </Typography.Text>
// //     <button 
// //       className="btn btn-outline-dark btn-sm"
// //       onClick={() => { setSearchQuery(""); setCategory(""); }}
// //     >
// //       Clear Search & Filters
// //     </button>
// //   </Col>
// //      :
// //     displayProducts.map((item)=>{
// //       return(

// //         <Col xs={24} sm={12} md={8} lg={8} key={item.id} className="d-flex justify-content-center">
// //       <div  className="card h-100 d-flex flex-column justify-content-between w-100 hover-zoom shadow-sm"
// //     style={{ 
// //     maxWidth: "320px", 
// //     transition: "all 0.3s ease-in-out" 
// //   }}
// //   onMouseEnter={(e) => {
// //     e.currentTarget.style.transform = "translateY(-5px)";
// //     e.currentTarget.classList.replace("shadow-sm", "shadow-lg");
// //   }}
// //   onMouseLeave={(e) => {
// //     e.currentTarget.style.transform = "translateY(0)";
// //     e.currentTarget.classList.replace("shadow-lg", "shadow-sm");
// //   }}
// //     >
// // <div 
// //   style={{ 
// //     height: '300px', 
// //     width: '100%', 
// //     display: 'flex', 
// //     alignItems: 'center', 
// //     justifyContent: 'center', 
// //     padding: '10px',
// //     overflow: 'hidden'
// //   }}
// // >
// //   <img 
// //     src={item.image.url} 
// //     alt={item.title} 
// //     style={{ 
// //       maxHeight: '100%', 
// //       maxWidth: '100%', 
// //       objectFit: 'contain' 
// //     }} 
// //   />
// // </div>
// //   <div className="card-body text-center">

// //     <Title ellipsis={{ rows: 2 }} level={5} className="card-title text-center mb-2" style={{ minHeight: '48px' }}>
// //   {item.title}
// // </Title>

// // <Paragraph ellipsis={{ rows: 2 }} className="card-text text-muted text-center" style={{ minHeight: '60px' }}>
// //   {item.description}
// // </Paragraph>
// //     <hr />
// //     <Title >${item.price}</Title>
// //     <hr />
// //     <Space>
// //     <Link to={`/product/${item.id}`} className="btn btn-dark">Buy Now</Link>
// //     <button onClick={()=>{
// //       addToCart(item)
// //     }} className='btn btn-dark'>Add to Cart</button>
// //     </Space>
// //   </div>
// // </div>
// //       </Col>
// //       )
// //     })
// //   }
// //   </Row>
// //     </div>
// //     </>
     
// //   )
// // }

// // export default Products





import { useEffect, useState, useMemo } from 'react';
import { Typography, Row, Col, message, Input, Button, Skeleton, Select } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined, ShoppingCartOutlined, EyeOutlined, FilterOutlined, CheckOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [addedStatus, setAddedStatus] = useState({});
  
  // Initialize wishlist from localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('user_wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : {};
    } catch (error) {
      console.error("Failed to load wishlist from storage", error);
      return {};
    }
  });

  const { addToCart } = useCart();

  const getProducts = async () => {
    try {
      const { status, data } = await axios.get(`${import.meta.env.VITE_apiURL}/products/all`);
      if (status === 200) {
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || "Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleAddToCart = (item) => {
    if (item.stockQuantity <= 0) return;
    addToCart(item);
    setAddedStatus((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedStatus((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const newStatus = !prev[id];
      const updatedWishlist = { ...prev, [id]: newStatus };
      try {
        localStorage.setItem('user_wishlist', JSON.stringify(updatedWishlist));
      } catch (error) {
        console.error("Failed to save wishlist to storage", error);
      }
      return updatedWishlist;
    });
  };

  // Memoized Filtering & Sorting Logic
  const displayProducts = useMemo(() => {
    let result = products.filter((item) => {
      const matchesCategory = category === "" || item.category === category;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, category, searchQuery, sortBy]);

  const categories = [
    { label: "All Products", value: "" },
    { label: "Men's Clothing", value: "men's-clothing" },
    { label: "Women's Clothing", value: "women's-clothing" },
    { label: "Jewelery", value: "jewelery" },
    { label: "Electronics", value: "electronics" },
  ];

  return (
    <div className="container-fluid px-md-5 py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <Title level={1} className="fw-bold mb-2 tracking-tight" style={{ color: '#1f2937' }}>
          Discover Our Collection
        </Title>
        <Text type="secondary" className="fs-6">
          Explore the latest trends, electronics, and exclusive accessories crafted for you.
        </Text>
      </div>

      {/* Category Filter Pills */}
      <Row className="d-flex justify-content-center gap-2 mb-4">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            shape="round"
            size="large"
            className="px-4 fw-medium border-0 shadow-sm transition-all"
            style={{
              backgroundColor: category === cat.value ? '#111827' : '#f3f4f6',
              color: category === cat.value ? '#ffffff' : '#4b5563',
            }}
            onClick={() => setCategory(cat.value)}
          >
            {cat.label}
          </Button>
        ))}
      </Row>

      {/* Search Bar & Sorting Controls Section */}
      <Row className="d-flex justify-content-center align-items-center gap-3 mb-5">
        <Input
          prefix={<SearchOutlined className="text-muted me-2" />}
          placeholder="Search products by title or description..."
          allowClear
          size="large"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: 420, borderRadius: '50px', paddingLeft: '20px' }}
          className="shadow-sm border-light"
        />
        <Select
          defaultValue="default"
          size="large"
          style={{ width: 180, borderRadius: '50px' }}
          onChange={(value) => setSortBy(value)}
          className="shadow-sm"
        >
          <Option value="default">Sort By: Default</Option>
          <Option value="price-low">Price: Low to High</Option>
          <Option value="price-high">Price: High to Low</Option>
          <Option value="title">Name: A to Z</Option>
        </Select>
      </Row>

      {/* Products Grid */}
      <Row gutter={[24, 24]}>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Col xs={24} sm={12} md={8} lg={8} key={index} className="d-flex justify-content-center mb-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-3 w-100 bg-white" style={{ maxWidth: "340px" }}>
                <Skeleton.Image active style={{ width: '100%', height: '220px', borderRadius: '12px' }} />
                <Skeleton active paragraph={{ rows: 2 }} className="mt-3" />
              </div>
            </Col>
          ))
        ) : displayProducts.length === 0 ? (
          <Col span={24} className="text-center my-5 py-5">
            <div className="p-5 bg-light rounded-4 shadow-sm d-inline-block w-100" style={{ maxWidth: 500 }}>
              <FilterOutlined style={{ fontSize: '48px', color: '#9ca3af' }} className="mb-3" />
              <Title level={3} className="fw-light mb-2 text-dark">
                No Products Found
              </Title>
              <Text type="secondary" className="d-block mb-4">
                We couldn&apos;t find any items matching your criteria.
              </Text>
              <Button
                type="primary"
                className="bg-dark text-white rounded-pill px-4 border-0"
                onClick={() => { setSearchQuery(""); setCategory(""); setSortBy("default"); }}
              >
                Clear Search & Filters
              </Button>
            </div>
          </Col>
        ) : (
          displayProducts.map((item) => {
            const isOutOfStock = (item.stockQuantity ?? 0) <= 0;

            return (
              <Col xs={24} sm={12} md={8} lg={8} key={item.id} className="d-flex justify-content-center mb-4">
                <div
                  className="card h-100 d-flex flex-column justify-content-between border-0 shadow-sm rounded-4 overflow-hidden w-100 bg-white position-relative"
                  style={{
                    maxWidth: "340px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 12px 24px -10px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1)";
                  }}
                >
                  {/* Wishlist Button Overlay */}
                  <button 
                    onClick={() => toggleWishlist(item.id)}
                    className="position-absolute top-0 end-0 m-3 btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                    style={{ width: '38px', height: '38px', zIndex: 2 }}
                  >
                    {wishlist[item.id] ? (
                      <HeartFilled style={{ color: '#ef4444', fontSize: '18px' }} />
                    ) : (
                      <HeartOutlined style={{ color: '#6b7280', fontSize: '18px' }} />
                    )}
                  </button>

                  {/* Product Image Box */}
                  <div
                    className="position-relative bg-light"
                    style={{
                      height: '260px',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '20px',
                    }}
                  >
                    <img
                      src={item.image?.url}
                      alt={item.title}
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        mixBlendMode: 'multiply'
                      }}
                    />
                    <span 
                      className="position-absolute top-0 start-0 m-3 badge bg-white text-dark shadow-sm px-3 py-2 rounded-pill text-uppercase fw-semibold" 
                      style={{ fontSize: '10px', letterSpacing: '0.5px' }}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Card Details */}
                  <div className="card-body d-flex flex-column justify-content-between p-4 text-left">
                    <div>
                      <Title 
                        ellipsis={{ rows: 2 }} 
                        level={5} 
                        className="fw-bold mb-2 text-dark" 
                        style={{ minHeight: '44px', fontSize: '15px', lineHeight: '1.4' }}
                      >
                        {item.title}
                      </Title>

                      <Paragraph 
                        ellipsis={{ rows: 2 }} 
                        className="text-muted small mb-3" 
                        style={{ minHeight: '40px' }}
                      >
                        {item.description}
                      </Paragraph>
                    </div>

                    <div>
                      {/* Stock Status & Price Info */}
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className={`badge ${isOutOfStock ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'} px-2 py-1 rounded-pill small fw-semibold`}>
                          {isOutOfStock ? "Out of Stock" : `In Stock (${item.stockQuantity})`}
                        </span>
                        <Title level={4} className="m-0 text-success fw-bold">
                          ${item.price}
                        </Title>
                      </div>

                      <hr className="my-2 text-muted opacity-25" />

                      {/* Action Buttons */}
                      <div className="d-flex gap-2 mt-3">
                        <Link 
                          to={`/product/${item.id}`} 
                          className="btn btn-outline-dark rounded-pill py-2 d-flex align-items-center justify-content-center gap-1 small fw-medium"
                          style={{ flex: '1 1 50%', whiteSpace: 'nowrap' }}
                        >
                          <EyeOutlined /> View
                        </Link>
                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={isOutOfStock}
                          className={`btn ${isOutOfStock ? 'btn-secondary opacity-50' : addedStatus[item.id] ? 'btn-success' : 'btn-dark'} rounded-pill py-2 d-flex align-items-center justify-content-center gap-1 small fw-medium shadow-sm`}
                          style={{ flex: '1 1 50%', whiteSpace: 'nowrap', transition: 'background-color 0.2s ease' }}
                        >
                          {addedStatus[item.id] ? <CheckOutlined /> : <ShoppingCartOutlined />}
                          {isOutOfStock ? "Sold Out" : addedStatus[item.id] ? "Added" : "Add"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })
        )}
      </Row>
    </div>
  );
};

export default Products;