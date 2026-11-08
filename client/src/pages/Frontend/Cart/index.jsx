// import Header from '../../../components/Header'
// import { Typography,Row, Col,Image, Button } from 'antd'
// import { ArrowLeftOutlined } from '@ant-design/icons';
// import { Link, useNavigate } from 'react-router-dom';
// import OrderSummary from '../../../components/OrderSummary';
// import {useCart} from '../../../context/CartContext'
// const index = () => {
//   const {Title,Paragraph,Text}=Typography;
//   const {addToCart,removeFromCart,UpdateCart,cart}=useCart();
  
// const Navigate=useNavigate();
//   const isEmpty = cart.length === 0;
//   const productTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

//   return (
//     <>
//     <Header/>
//     <div className="container">
//       <main className='mt-4'>

//            <Title className='text-center'>Cart</Title>
//            <hr />

// {

// (isEmpty)?
//             <Row justify={"center"}>
//               <Col span={24}>
//               <div className="card p-4" style={{backgroundColor: "#F8F9FA"}}>
//                 <div className='text-center'>
//                       <Title className='fw-lighter pt-2 pb-4'>Your Cart is Empty</Title>
                      
//                       <Link to={"/"} className='btn btn-outline-dark w-25 text-nowrap w-auto '><ArrowLeftOutlined className='fw-bolder' /> Continue Shopping</Link>
//                 </div>
//               </div>
//               </Col>
//             </Row>
// :
//            <Row gutter={[16, 16]}  className='cart d-flex flex-row justify-content-between'>
//             <Col lg={16} md={16} sm={24} xs={24} >
//                   <div id='item-list' className='card'>
//                     <div style={{backgroundColor: "#F8F8F8"}} className='border-bottom'>
//                       <Title className='p-2' level={4}>Item List</Title>
//                     </div>
//       {
//            cart.map((item)=>{
//             return(
//                  <div style={{height: "auto"}} id='item detail' className='d-flex flex-row justify-content-between p-3' key={item.id}>
//                         <Image style={{height: "75px", width: "100px"}} src={item.image.url} preview={false}></Image>
//                         <Title style={{width: "30%", marginBottom: "0"}} level={5} >{item.title}</Title>
//                         <div id='quantity&price' className='d-flex flex-column'>
//                         <div id='quantity' className='d-flex flex-row align-items-center justify-content-center gap-2'>
//                           <Button onClick={()=>{
//                             removeFromCart(item)
//                           }} size='small'>-</Button>
//                           <Paragraph className='m-0'>{item.quantity}</Paragraph>
//                           <Button onClick={()=>{
//                             addToCart(item)
                          
//                           }} size="small" className='d-inline'>+</Button>
//                         </div>
//                              <div id="price mt-4">
//                                  <Text className='fs-5' ><strong>
//                                   {item.quantity} &#10005; ${item.price}
//                                   </strong>
//                                   </Text>
//                              </div>
//                         </div>
//                     </div>
//             )
//            })
      
//                     }
                  
//                   </div>
//             </Col>
//             <Col lg={8} md={8} sm={24} xs={24}>
//                   <OrderSummary cart={cart} showCheckoutButton={true}/>
//             </Col>
//            </Row>
// }
//       </main>
//     </div>
//     </>
//   )
// }

// export default index


import Header from '../../../components/Header';
import { Typography, Row, Col, Image, Button, Tooltip } from 'antd';
import { ArrowLeftOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import OrderSummary from '../../../components/OrderSummary';
import { useCart } from '../../../context/CartContext';
import { Helmet } from 'react-helmet-async'


const { Title, Text } = Typography;

const CartIndex = () => {
  const { addToCart, removeFromCart, cart } = useCart();
  const isEmpty = cart.length === 0;

  return (
    <>
<Helmet>
  <title>Your Shopping Cart | VibeCart</title>
  <meta name="robots" content="noindex, follow" /> {/* SEO best practice for cart pages */}
  <link rel="canonical" href="https://www.vibecart.com/cart" />
</Helmet>

    
      <Header />
      <div className="container py-4 py-md-5">
        <main>
          {/* Cart Header */}
          <div className="text-center mb-4">
            <Title level={2} className="fw-bold mb-1">
              <ShoppingCartOutlined className="me-2" /> Shopping Cart
            </Title>
            <Text type="secondary">Review your selected items before proceeding to checkout</Text>
          </div>
          <hr className="mb-4 opacity-25" />

          {isEmpty ? (
            <Row justify="center">
              <Col xs={24} md={12}>
                <div className="card p-4 p-md-5 border-0 shadow-sm rounded-4 text-center bg-light">
                  <div className="py-3">
                    <ShoppingCartOutlined style={{ fontSize: '64px', color: '#cbd5e1' }} className="mb-3" />
                    <Title level={3} className="fw-light mb-3">Your Cart is Empty</Title>
                    <Text type="secondary" className="d-block mb-4">
                      Looks like you haven't added anything to your cart yet.
                    </Text>
                    <Link to="/" className="btn btn-dark rounded-pill px-4 py-2 shadow-sm fw-medium">
                      <ArrowLeftOutlined className="me-2" /> Continue Shopping
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <Row gutter={[24, 24]}>
              {/* Item List Column */}
              <Col lg={16} md={15} xs={24}>
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                  <div className="bg-light px-4 py-3 border-bottom">
                    <Title level={5} className="m-0 fw-semibold text-secondary">
                      Cart Items ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                    </Title>
                  </div>

                  <div className="divide-y">
                    {cart.map((item) => (
                      <div 
                        key={item.id} 
                        className="p-3 p-md-4 border-bottom"
                      >
                        <Row align="middle" gutter={[16, 16]} className="justify-content-between">
                          
                          {/* Image & Title Details */}
                          <Col xs={24} sm={12} md={12} className="d-flex align-items-center gap-3">
                            <div 
                              className="bg-light rounded-3 p-2 d-flex align-items-center justify-content-center flex-shrink-0"
                              style={{ width: '75px', height: '75px' }}
                            >
                              <Image 
                                src={item.image.url} 
                                alt={item.title}
                                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                                preview={false} 
                              />
                            </div>
                            <div className="flex-grow-1 overflow-hidden">
                              <Tooltip title={item.title} placement="topLeft">
                                <h6 
                                  className="fw-bold text-dark mb-1"
                                  style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    lineHeight: '1.3',
                                    fontSize: '0.95rem'
                                  }}
                                >
                                  {item.title}
                                </h6>
                              </Tooltip>
                              <Text type="secondary" className="small">
                                Unit: ${item.price}
                              </Text>
                            </div>
                          </Col>

                          {/* Controls and Total Price Section */}
                          <Col xs={24} sm={12} md={12} className="d-flex align-items-center justify-content-between justify-content-sm-end gap-3">
                            {/* Quantity Controls */}
                            <div className="d-flex align-items-center gap-2 border rounded-pill px-3 py-1 bg-light">
                              <Button 
                                type="text" 
                                shape="circle" 
                                size="small" 
                                onClick={() => removeFromCart(item)}
                                className="fw-bold text-dark p-0 d-flex align-items-center justify-content-center"
                                style={{ width: '24px', height: '24px' }}
                              >
                                -
                              </Button>
                              <span className="fw-semibold px-2">{item.quantity}</span>
                              <Button 
                                type="text" 
                                shape="circle" 
                                size="small" 
                                onClick={() => addToCart(item)}
                                className="fw-bold text-dark p-0 d-flex align-items-center justify-content-center"
                                style={{ width: '24px', height: '24px' }}
                              >
                                +
                              </Button>
                            </div>

                            {/* Total Price */}
                            <div className="text-end ms-sm-3" style={{ minWidth: '85px' }}>
                              <Text className="fw-bold text-success fs-6">
                                ${(item.price * item.quantity).toFixed(2)}
                              </Text>
                            </div>
                          </Col>

                        </Row>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>

              {/* Order Summary Column */}
              <Col lg={8} md={9} xs={24}>
                <OrderSummary cart={cart} showCheckoutButton={true} />
              </Col>
            </Row>
          )}
        </main>
      </div>
    </>
  );
};

export default CartIndex;