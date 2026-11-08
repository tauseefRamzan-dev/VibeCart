// // import { useEffect, useState } from 'react'
// // import { useParams } from 'react-router-dom'
// // import Loader from '../../../components/Loader'
// // import  Header  from '../../../components/Header';
// // import { Col, Image,Row,Space,Typography,Card,message } from 'antd';
// // import { Link } from 'react-router-dom'
// // import Marquee from "react-fast-marquee";
// // import axios from 'axios'
// // import { useCart } from '../../../context/CartContext';
// // const SafeMarquee = Marquee?.default || Marquee;
// // const product = () => {
// //   const {Title,Paragraph}=Typography;
// //   const {id}=useParams();

// // const [product,setProduct]=useState({});
// // const [similarProducts,setSimilarProduct]=useState([])
// // const [isLoading,setIsLoading]=useState(false)
// // const {addToCart}=useCart();
// //   const getProduct=async(id)=>{
// //     setIsLoading(true)
// //    await axios.get(`${import.meta.env.VITE_apiURL}/products/single?id=${id}`)
// //             .then(({status,data})=>{
// //               if(status===200)
// //               {
// //                 const {message: resMessage,product}=data;
// //                 setProduct(product)
// //                 getSimiliarProduct(product)
// //                 // console.log(product)
// //                 // message.success(resMessage);
// //               }
// //             }).catch((error)=>{
// //               console.error(error)
// //               message.error(error.response?.data?.message);
// //             }).finally(()=>{
// //               setIsLoading(false);
// //             })
            



// //   }
// //   const getSimiliarProduct=async(data)=>{
    

// //       await axios.get(`${import.meta.env.VITE_apiURL}/products/category?category=${data.category}`)
// //      .then(({status,data})=>{
// //       if(status===200)
// //       {
// //         const {message: resMessage, products}=data;
// //         setSimilarProduct(products);
// //         // console.log(products)
// //         // message.success(resMessage)
// //       }
// //      }).catch((error)=>{
// //               console.error(error)
// //               message.error(error.response?.data?.message);
// //             })
 
// //   }

// // useEffect(()=>{
// //      getProduct(id);
// // },[id])

// //   return (
// //     <>
// //   {
// //     (isLoading)? 
// //     <Loader/>
// //     :
// //     <>
// //     <Header/>
// // <div className="container">

// // <Row>
// // <Col xs={24} md={12} className='text-center'>
// // <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto', padding: '10px' }}>
// //   <Image src={product.image?.url} className='img-fluid' style={{ 
// //         width: '100%', 
// //         height: 'auto', 
// //         maxHeight: '400px', 
// //         objectFit: 'contain' 
// //       }}></Image>
// // </div>
// // </Col>
// // <Col xs={24} md={12}>
// // <div className='detail'>
// //   <Title level={4} className='text-uppercase text-muted'>{product?.category?.toUpperCase()}</Title>
// //   <Title className='fw-lighter' level={1}>{product.title}</Title>
// //   <Paragraph className='lead'>{product?.rating?.rate} <i className="fa fa-star"></i> ({product?.rating?.count}+)</Paragraph>
// //    <Title  level={3}>${product?.price}</Title>
// //    <Paragraph className='lead' >{product?.description}</Paragraph>
// //    <div >
// //     <Space size={"medium"}>
// // <button onClick={()=>{
// //   addToCart(product);
// // }} className='btn btn-outline-dark'>Add to Cart</button>
// // <Link to={"/cart"} className='btn btn-dark' >Go to Cart</Link>
// //     </Space>
// //    </div>
// // </div>
// // </Col>
// // </Row>
// // <Row style={{marginTop: "60px"}}>
// // <Col span={24}>
// // <Title level={2}>You may also like</Title>
// //     <div className='similar-products mt-4'>
// //        <SafeMarquee
// //               pauseOnHover={true}
// //               pauseOnClick={true}
// //               speed={50}
// //             >
          
// //               {
// //                 similarProducts?.map((item)=>{
// //                   return(
                    
// //                     <Card
// //                     key={item.id}
// //                     hoverable
// //                     className='mx-3'
// //                     style={{ width: "300px", height: "300px" }}
// //                     cover={
// //                       <div style={{height: "200px", display: "flex", alignItems:"center", justifyContent: "center"}}>

// //                       <img
// //                       draggable={false}
// //                       alt={item.title}
// //                       src={item.image?.url}
// //                       style={{objectFit: "contain", maxWidth: "100%", maxHeight: "100%"}}
// //                       />
// //                       </div>
// //                     }
// //                     >
// //                         <div className='text-center'>
// //                       <Space size={"large"}>
// //                         <Link className='btn btn-dark' to={`/product/${item.id}`}>Buy Now</Link>
// //                         <button onClick={()=>{
// //                           addToCart(item);
// //                         }} className='btn btn-dark'>Add to Cart</button>
// //                       </Space>
// //                         </div>
// //   </Card>
// //  );
// // })}
// //             </SafeMarquee>



// //     </div>
// //     </Col>
// // </Row>
// // </div>





// //     </>
// //   } 
  
// //   </>
// // )
// // }

// // export default product


// import { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Col, Image, Row, Space, Typography, Card, message, Rate } from 'antd';
// import Marquee from "react-fast-marquee";
// import axios from 'axios';
// import Loader from '../../../components/Loader';
// import Header from '../../../components/Header';
// import { useCart } from '../../../context/CartContext';
// import { ShoppingCartOutlined, ArrowRightOutlined, StarFilled } from '@ant-design/icons';

// const SafeMarquee = Marquee?.default || Marquee;
// const { Title, Paragraph, Text } = Typography;

// const Product = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState({});
//   const [similarProducts, setSimilarProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const { addToCart } = useCart();

//   const getProduct = async (productId) => {
//     setIsLoading(true);
//     try {
//       const { status, data } = await axios.get(`${import.meta.env.VITE_apiURL}/products/single?id=${productId}`);
//       if (status === 200) {
//         const { product: fetchedProduct } = data;
//         setProduct(fetchedProduct);
//         getSimilarProducts(fetchedProduct);
//       }
//     } catch (error) {
//       console.error(error);
//       message.error(error.response?.data?.message || "Failed to load product details");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getSimilarProducts = async (data) => {
//     try {
//       const { status, data: resData } = await axios.get(`${import.meta.env.VITE_apiURL}/products/category?category=${data.category}`);
//       if (status === 200) {
//         // Filter out the current product from similar items list
//         const filtered = resData.products.filter(item => item.id !== data.id);
//         setSimilarProducts(filtered);
//       }
//     } catch (error) {
//       console.error(error);
//       message.error(error.response?.data?.message || "Failed to load similar products");
//     }
//   };

//   useEffect(() => {
//     getProduct(id);
//     window.scrollTo(0, 0);
//   }, [id]);

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>
//           <Header />
//           <div className="container py-5">
//             {/* Main Product Showcase Section */}
//             <Row gutter={[48, 48]} align="middle" className="bg-white p-4 p-md-5 rounded-4 shadow-sm border border-light">
//               <Col xs={24} md={12} className="text-center">
//                 <div 
//                   className="bg-light rounded-4 p-4 d-flex align-items-center justify-content-center shadow-sm"
//                   style={{ minHeight: '420px', width: '100%', overflow: 'hidden' }}
//                 >
//                   <Image 
//                     src={product.image?.url} 
//                     alt={product.title}
//                     className="img-fluid"
//                     style={{ 
//                       maxHeight: '380px', 
//                       maxWidth: '100%', 
//                       objectFit: 'contain',
//                       mixBlendMode: 'multiply'
//                     }}
//                   />
//                 </div>
//               </Col>

//               <Col xs={24} md={12}>
//                 <div className="detail-content ps-md-3">
//                   <Text type="secondary" className="text-uppercase fw-semibold tracking-wide small d-block mb-2">
//                     {product?.category}
//                   </Text>
                  
//                   <Title level={2} className="fw-bold mb-3 text-dark" style={{ lineHeight: '1.3' }}>
//                     {product.title}
//                   </Title>

//                   {/* Ratings */}
//                   <div className="d-flex align-items-center gap-2 mb-3">
//                     <Rate disabled allowHalf value={product?.rating?.rate || 0} style={{ fontSize: '14px', color: '#fadb14' }} />
//                     <Text type="secondary" className="small">
//                       ({product?.rating?.count || 0} reviews)
//                     </Text>
//                   </div>

//                   {/* Price */}
//                   <Title level={2} className="text-success fw-bold mb-4">
//                     ${product?.price}
//                   </Title>

//                   <Paragraph className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
//                     {product?.description}
//                   </Paragraph>

//                   {/* Action Buttons */}
//                   <Space size="middle" className="w-100 flex-wrap">
//                     <button 
//                       onClick={() => addToCart(product)} 
//                       className="btn btn-dark rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm fw-medium"
//                     >
//                       <ShoppingCartOutlined /> Add to Cart
//                     </button>
//                     <Link 
//                       to="/cart" 
//                       className="btn btn-outline-dark rounded-pill px-4 py-2 d-flex align-items-center gap-2 fw-medium"
//                     >
//                       Go to Cart <ArrowRightOutlined />
//                     </Link>
//                   </Space>
//                 </div>
//               </Col>
//             </Row>

//             {/* Similar Products Marquee Section */}
//             {similarProducts.length > 0 && (
//               <Row style={{ marginTop: "80px" }}>
//                 <Col span={24}>
//                   <div className="text-center mb-4">
//                     <Title level={3} className="fw-bold mb-1">You May Also Like</Title>
//                     <Text type="secondary">Explore complementary items from the same collection</Text>
//                   </div>

//                   <div className='similar-products mt-4'>
//                     <SafeMarquee
//                       pauseOnHover={true}
//                       pauseOnClick={true}
//                       speed={40}
//                       gradient={true}
//                       gradientColor={[248, 249, 250]}
//                     >
//                       {similarProducts.map((item) => (
//                         <Card
//                           key={item.id}
//                           hoverable
//                           className='mx-3 border-0 shadow-sm rounded-4 overflow-hidden'
//                           style={{ width: "260px", backgroundColor: "#ffffff" }}
//                           cover={
//                             <div className="bg-light p-3" style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                               <img
//                                 draggable={false}
//                                 alt={item.title}
//                                 src={item.image?.url}
//                                 style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%", mixBlendMode: 'multiply' }}
//                               />
//                             </div>
//                           }
//                         >
//                           <div className="text-center">
//                             <Title level={6} ellipsis={{ rows: 1 }} className="fw-bold text-dark mb-2" style={{ fontSize: '14px' }}>
//                               {item.title}
//                             </Title>
//                             <Text className="text-success fw-bold d-block mb-3">${item.price}</Text>
                            
//                             <Space size="small">
//                               <Link className='btn btn-outline-dark btn-sm rounded-pill px-3' to={`/product/${item.id}`}>
//                                 View
//                               </Link>
//                               <button 
//                                 onClick={() => addToCart(item)} 
//                                 className='btn btn-dark btn-sm rounded-pill px-3'
//                               >
//                                 Add
//                               </button>
//                             </Space>
//                           </div>
//                         </Card>
//                       ))}
//                     </SafeMarquee>
//                   </div>
//                 </Col>
//               </Row>
//             )}
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Product;




import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Col, Image, Row, Space, Typography, Card, message, Rate } from 'antd';
import Marquee from "react-fast-marquee";
import axios from 'axios';
import Loader from '../../../components/Loader';
import Header from '../../../components/Header';
import { useCart } from '../../../context/CartContext';
import { ShoppingCartOutlined, ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';

const SafeMarquee = Marquee?.default || Marquee;
const { Title, Paragraph, Text } = Typography;

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addedStatus, setAddedStatus] = useState(false);
  const { addToCart } = useCart();

  const getProduct = async (productId) => {
    setIsLoading(true);
    try {
      const { status, data } = await axios.get(`${import.meta.env.VITE_apiURL}/products/single?id=${productId}`);
      if (status === 200) {
        const { product: fetchedProduct } = data;
        setProduct(fetchedProduct);
        getSimilarProducts(fetchedProduct);
      }
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || "Failed to load product details");
    } finally {
      setIsLoading(false);
    }
  };

  const getSimilarProducts = async (data) => {
    try {
      const { status, data: resData } = await axios.get(`${import.meta.env.VITE_apiURL}/products/category?category=${data.category}`);
      if (status === 200) {
        const filtered = resData.products.filter(item => item.id !== data.id);
        setSimilarProducts(filtered);
      }
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || "Failed to load similar products");
    }
  };

  useEffect(() => {
    getProduct(id);
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = (item) => {
    if ((item.stockQuantity ?? 0) <= 0) return;
    addToCart(item);
    setAddedStatus(true);
    setTimeout(() => {
      setAddedStatus(false);
    }, 1500);
  };

  const isOutOfStock = (product.stockQuantity ?? 0) <= 0;

  return (
    <>
      <Helmet>
        <title>{product?.title ? `${product.title} | VibeCart` : 'Product Details | VibeCart'}</title>
        <meta name="description" content={product?.description || "Buy high-quality products on VibeCart with fast delivery."} />
        <link rel="canonical" href={`https://www.vibecart.com/product/${product.id}`} />
      </Helmet>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="container py-5">
            {/* Main Product Showcase Section */}
            <Row gutter={[48, 48]} align="middle" className="bg-white p-4 p-md-5 rounded-4 shadow-sm border border-light">
              <Col xs={24} md={12} className="text-center">
                <div 
                  className="bg-light rounded-4 p-4 d-flex align-items-center justify-content-center shadow-sm"
                  style={{ minHeight: '420px', width: '100%', overflow: 'hidden' }}
                >
                  <Image 
                    src={product.image?.url} 
                    alt={product.title}
                    className="img-fluid"
                    style={{ 
                      maxHeight: '380px', 
                      maxWidth: '100%', 
                      objectFit: 'contain',
                      mixBlendMode: 'multiply'
                    }}
                  />
                </div>
              </Col>

              <Col xs={24} md={12}>
                <div className="detail-content ps-md-3">
                  <Text type="secondary" className="text-uppercase fw-semibold tracking-wide small d-block mb-2">
                    {product?.category}
                  </Text>
                  
                  <Title level={2} className="fw-bold mb-3 text-dark" style={{ lineHeight: '1.3' }}>
                    {product.title}
                  </Title>

                  {/* Ratings */}
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <Rate disabled allowHalf value={product?.rating?.rate || 0} style={{ fontSize: '14px', color: '#fadb14' }} />
                    <Text type="secondary" className="small">
                      ({product?.rating?.count || 0} reviews)
                    </Text>
                  </div>

                  {/* Stock Status & Price */}
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className={`badge ${isOutOfStock ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'} px-3 py-2 rounded-pill small fw-semibold`}>
                      {isOutOfStock ? "Out of Stock" : `In Stock (${product.stockQuantity})`}
                    </span>
                    <Title level={2} className="text-success fw-bold m-0">
                      ${product?.price}
                    </Title>
                  </div>

                  <Paragraph className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
                    {product?.description}
                  </Paragraph>

                  {/* Action Buttons */}
                  <Space size="middle" className="w-100 flex-wrap">
                    <button 
                      onClick={() => handleAddToCart(product)} 
                      disabled={isOutOfStock}
                      className={`btn ${isOutOfStock ? 'btn-secondary opacity-50' : addedStatus ? 'btn-success' : 'btn-dark'} rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm fw-medium`}
                    >
                      {addedStatus ? <CheckOutlined /> : <ShoppingCartOutlined />}
                      {isOutOfStock ? "Sold Out" : addedStatus ? "Added to Cart" : "Add to Cart"}
                    </button>
                    <Link 
                      to="/cart" 
                      className="btn btn-outline-dark rounded-pill px-4 py-2 d-flex align-items-center gap-2 fw-medium"
                    >
                      Go to Cart <ArrowRightOutlined />
                    </Link>
                  </Space>
                </div>
              </Col>
            </Row>

            {/* Similar Products Marquee Section */}
            {similarProducts.length > 0 && (
              <Row style={{ marginTop: "80px" }}>
                <Col span={24}>
                  <div className="text-center mb-4">
                    <Title level={3} className="fw-bold mb-1">You May Also Like</Title>
                    <Text type="secondary">Explore complementary items from the same collection</Text>
                  </div>

                  <div className='similar-products mt-4'>
                    <SafeMarquee
                      pauseOnHover={true}
                      pauseOnClick={true}
                      speed={40}
                      gradient={true}
                      gradientColor={[248, 249, 250]}
                    >
                      {similarProducts.map((item) => {
                        const itemOutOfStock = (item.stockQuantity ?? 0) <= 0;
                        return (
                          <Card
                            key={item.id}
                            hoverable
                            className='mx-3 border-0 shadow-sm rounded-4 overflow-hidden'
                            style={{ width: "260px", backgroundColor: "#ffffff" }}
                            cover={
                              <div className="bg-light p-3" style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <img
                                  draggable={false}
                                  alt={item.title}
                                  src={item.image?.url}
                                  style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%", mixBlendMode: 'multiply' }}
                                />
                              </div>
                            }
                          >
                            <div className="text-center">
                              <Title level={5} ellipsis={{ rows: 1 }} className="fw-bold text-dark mb-1" style={{ fontSize: '14px' }}>
                                {item.title}
                              </Title>
                              <Text className="text-success fw-bold d-block mb-3">${item.price}</Text>
                              
                              <Space size="small">
                                <Link className='btn btn-outline-dark btn-sm rounded-pill px-3' to={`/product/${item.id}`}>
                                  View
                                </Link>
                                <button 
                                  onClick={() => addToCart(item)} 
                                  disabled={itemOutOfStock}
                                  className={`btn ${itemOutOfStock ? 'btn-secondary' : 'btn-dark'} btn-sm rounded-pill px-3`}
                                >
                                  {itemOutOfStock ? "Sold Out" : "Add"}
                                </button>
                              </Space>
                            </div>
                          </Card>
                        );
                      })}
                    </SafeMarquee>
                  </div>
                </Col>
              </Row>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Product;