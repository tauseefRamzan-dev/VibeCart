// import {useEffect, useState } from 'react'
// import Header from '../../../components/Header'
// import { Typography,Row, Col, Divider, Button,Form,Input,Select, message } from 'antd'
// import { ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
// import { Link, useNavigate } from 'react-router-dom';
// import OrderSummary from '../../../components/OrderSummary';
// import {countries} from '../../../data/AllCountries'
// import { useCart } from '../../../context/CartContext';
// import { useAuth } from '../../../context/Auth';
// import axios from 'axios';

// const formatToNumber = (num) => Number(Number(num).toFixed(2));

// const index = () => {
//   const {user}=useAuth();
//   const {Title,Paragraph,Text}=Typography;
//   const [isProcessing,setIsProcessing]=useState(false)
//   const {UpdateCart,cart,addToCart,removeFromCart}=useCart();
// const Navigate=useNavigate();
//   const isEmpty = cart.length === 0;
//   const [form] = Form.useForm();


//  const productTotal =formatToNumber(cart.reduce((acc, item) => acc + (item.price * item.quantity), 0));
//     const shippingFee=30;
//     const totalAmount=formatToNumber(productTotal+shippingFee);



//    useEffect(() => {
// form.setFieldsValue({email: user?.email,fname: user?.fullName});
    
// }, []); 

// const onFinish=async(values)=>{
// const shippingAddress = {
//       fullName: `${values.fname} ${values.lname || ''}`.trim(),
//       email: values.email,
//       phoneNumber: values.phoneNumber,
//       address: values.shippingAddress,
//       country: values.country,
//       state: values.state,
//       zipCode: values.zipCode, 
//     };
      
     
// const orderItems=cart
// const order={ user,orderItems,subtotal: productTotal, shippingFee, totalAmount,shippingAddress }

// setIsProcessing(true)
// const token = localStorage.getItem("token");
// await axios.post(`${import.meta.env.VITE_apiURL}/orders/create`,order,{
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
// .then(({status,data})=>{
//   if(status===201)
//   {
//     const {message: resMessage,order}=data
//     message.success(resMessage)
//     localStorage.removeItem("cart")
//     Navigate("/dashboard/my-orders")
//   }
// }).catch((error)=>{
//   console.error(error)
//   message.error(error.response?.data?.message || "Try Again. Order not placed")
// }).finally(()=>{
//   setIsProcessing(false)
// })




// }
//   return (
//     <>
//     <Header/>
//     <div className="container">
//       <main className='mt-4'>

//            <Title className='text-center'>Checkout</Title>
//            <hr />

// {

// (isEmpty)?
//             <Row justify={"center"}>
//               <Col span={24}>
//               <div className="card p-4" style={{backgroundColor: "#F8F9FA"}}>
//                 <div className='text-center'>
//                       <Title className='fw-lighter pt-2 pb-4'>Your Cart is Empty</Title>
                      
//                       <Link to={"/"} className='btn btn-outline-dark w-25 '><ArrowLeftOutlined className='fw-bolder' /> Continue Shopping</Link>
//                 </div>
//               </div>
//               </Col>
//             </Row>
// :
//            <Row gutter={[16, 16]}  className='cart d-flex flex-row justify-content-between'>
//             <Col lg={16} md={16} sm={24} xs={24} >
//                   <div id='item-list' className='card'>
//                     <div style={{backgroundColor: "#F8F8F8"}} className='border-bottom'>
//                       <Title className='p-2' level={4}>Billing Address</Title>
//                     </div>
//                       <Form layout="vertical" form={form} onFinish={onFinish}>
//                     <Row className='p-2' gutter={[16,16]}>
//                       <Col lg={12} md={12} sm={24} xs={24}>
//                             <Form.Item label="First Name" name={"fname"} rules={[{required: true, message: "First Name must be required"}]} >
//                                <Input placeholder='Enter your first name' type={"text"} ></Input>
//                               </Form.Item>    
                               
//                       </Col>
//                       <Col lg={12} md={12} sm={24} xs={24}> 
//                       <Form.Item label="Last Name" name={"lname"} >
//                                <Input placeholder='Enter your last name' type={"text"}></Input>
//                               </Form.Item> 
//                       </Col>
//                       <Col span={24}>
//                       <Form.Item label="Email" name={"email"} rules={[{required: true, message: "Email must be required"}]}>
//                       <Input placeholder='you@example.com' type={"email"}></Input>
//                       </Form.Item>
//                       </Col>
//                       <Col span={24}>
//                       <Form.Item label="Phone Number" name={"phoneNumber"} rules={[{required: true, message: "Phone Number must be required"}]}>
//                       <Input  type={"tel"} placeholder='+923000000000'></Input>
//                       </Form.Item>
//                       </Col>
//                       <Col span={24}>
//                       <Form.Item label="Shipping Address" name={"shippingAddress"} rules={[{required: true, message: "Address must be required"}]}>
//                       <Input type={"text"}></Input>
//                       </Form.Item>
//                       </Col>
//                       <Col lg={8} md={8} sm={24} xs={24}>
//                       <Form.Item label="Country" name={"country"} rules={[{required: true, message: "Country must be required"}]}>
//                         <Select
//                         placeholder="Select a country"
//                         showSearch
                        
//       // defaultValue="choose..."
//       // style={{ width: 150 }}
//       // onChange={handleChange}
//       options={countries}
//     />
//                       </Form.Item>
//                       </Col>
//                       <Col lg={8} md={8} sm={12} xs={24}>
//                       <Form.Item label="State" name={"state"} rules={[{required: true, message: "State is required"}]}>
//                         <Input type='text'></Input>
//                       </Form.Item>
//                       </Col>
//                       <Col lg={8} md={8} sm={12} xs={24}>
//                       <Form.Item label="Zip" name={"zipCode"} rules={[{required: true, message: "ZIP Code is required"}]}>
//                         <Input type='text'></Input>
//                       </Form.Item>
//                       </Col>
//                       <Col span={24}>
//                       <Divider/>
//                       <Title level={4}>Payment</Title>
//                       </Col>
//                       <Col lg={12} md={12} sm={24} xs={24}>
//                             <Form.Item label="Name on the card" name={"creditCardName"} rules={[{required: true, message: "Credit Card Name must be required"}]} >
//                                <Input  type={"text"} ></Input>
//                               </Form.Item>    
//                       <Paragraph className='text-muted text-nowrap'>Full name as displayed on card</Paragraph>
//                       </Col>
//                       <Col lg={12} md={12} sm={24} xs={24}> 
//                       <Form.Item label="Credit Card Number" name={"creditCardNumber"} rules={[{required: true, message: "Credit Card Number must be required"}]} >
//                                <Input type={"text"} placeholder="XXXX-XXXX-XXXX-XXXX"></Input>
//                               </Form.Item> 
//                       </Col>
//                       <Col span={12}>
//                       <Form.Item label="Expiration" name={"expire"} rules={[{required: true, message: "Expire Date must be mentioned"}]} >
//                                <Input type={"text"} placeholder="MM/YY"></Input>
//                               </Form.Item>
//                       </Col>
//                       <Col span={12}>
//                       <Form.Item label="CVV" name={"cvv"} rules={[{required: true, message: "CVV is required"}]} >
//                                <Input type={"text"} placeholder="123" maxLength={4}></Input>
//                               </Form.Item>
//                       </Col>
//                       <hr />
//                       <Col span={24}>
//                       <Button icon={<CheckCircleOutlined/>} loading={isProcessing} type="primary" block htmlType="submit" >Place Order</Button>
//                       </Col>
//                     </Row>
//                       </Form>
                  
//                   </div>
//             </Col>
//             <Col lg={8} md={8} sm={24} xs={24}>
//                   <OrderSummary cart={cart}/>
//             </Col>
//            </Row>
// }
//       </main>
//     </div>
//     </>
//   )
// }

// export default index


import { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import { Typography, Row, Col, Divider, Button, Form, Input, Select, message } from 'antd';
import { ArrowLeftOutlined, CheckCircleOutlined, CreditCardOutlined, HomeOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import OrderSummary from '../../../components/OrderSummary';
import { countries } from '../../../data/AllCountries';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/Auth';
import axios from 'axios';
import { Helmet } from 'react-helmet-async'

const formatToNumber = (num) => Number(Number(num).toFixed(2));
const { Title, Paragraph, Text } = Typography;

const CheckoutIndex = () => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const isEmpty = cart.length === 0;

  const productTotal = formatToNumber(cart.reduce((acc, item) => acc + (item.price * item.quantity), 0));
  const shippingFee = 30;
  const totalAmount = formatToNumber(productTotal + shippingFee);

  useEffect(() => {
    form.setFieldsValue({ email: user?.email, fname: user?.fullName });
  }, [user, form]);

  const onFinish = async (values) => {
    const shippingAddress = {
      fullName: `${values.fname} ${values.lname || ''}`.trim(),
      email: values.email,
      phoneNumber: values.phoneNumber,
      address: values.shippingAddress,
      country: values.country,
      state: values.state,
      zipCode: values.zipCode,
    };

    const orderItems = cart;
    const order = { user, orderItems, subtotal: productTotal, shippingFee, totalAmount, shippingAddress };

    setIsProcessing(true);
    const token = localStorage.getItem("token");

    try {
      const { status, data } = await axios.post(`${import.meta.env.VITE_apiURL}/orders/create`, order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (status === 201) {
        message.success(data.message || "Order placed successfully!");
        localStorage.removeItem("cart");
        navigate("/dashboard/my-orders");
      }
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || "Try Again. Order not placed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
<Helmet>
  <title>Checkout | VibeCart</title>
  <meta name="robots" content="noindex, nofollow" /> {/* Sensitive page, no indexing needed */}
  <link rel="canonical" href="https://www.vibecart.com/checkout" />
</Helmet>


      <Header />
      <div className="container py-5">
        <main>
          <div className="text-center mb-4">
            <Title level={2} className="fw-bold mb-1">Checkout</Title>
            <Text type="secondary">Complete your shipping and payment details to finalize your order</Text>
          </div>
          <hr className="mb-4" />

          {isEmpty ? (
            <Row justify="center">
              <Col xs={24} md={12}>
                <div className="card p-5 border-0 shadow-sm rounded-4 text-center bg-light">
                  <div className="py-4">
                    <Title level={3} className="fw-light mb-3">Your Cart is Empty</Title>
                    <Text type="secondary" className="d-block mb-4">
                      Add items to your cart before proceeding to checkout.
                    </Text>
                    <Link to="/" className="btn btn-dark rounded-pill px-4 py-2 shadow-sm fw-medium">
                      <ArrowLeftOutlined className="me-2" /> Continue Shopping
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <Row gutter={[24, 24]} className="justify-content-between">
              {/* Billing & Shipping Details Column */}
              <Col lg={16} md={16} sm={24} xs={24}>
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white p-4 p-md-5">
                  <div className="d-flex align-items-center gap-2 mb-4 pb-2 border-bottom">
                    <HomeOutlined className="text-primary fs-5" />
                    <Title level={4} className="m-0 fw-semibold">Shipping & Billing Address</Title>
                  </div>

                  <Form layout="vertical" form={form} onFinish={onFinish} requiredMark="optional">
                    <Row gutter={[16, 16]}>
                      <Col lg={12} md={12} sm={24} xs={24}>
                        <Form.Item label="First Name" name="fname" rules={[{ required: true, message: "First Name is required" }]}>
                          <Input placeholder="Enter your first name" size="large" className="rounded-3" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={24} xs={24}>
                        <Form.Item label="Last Name" name="lname">
                          <Input placeholder="Enter your last name" size="large" className="rounded-3" />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item label="Email Address" name="email" rules={[{ required: true, message: "Email is required" }, { type: 'email', message: 'Enter a valid email' }]}>
                          <Input placeholder="you@example.com" size="large" className="rounded-3" />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: "Phone Number is required" }]}>
                          <Input type="tel" placeholder="+923000000000" size="large" className="rounded-3" />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item label="Street Address" name="shippingAddress" rules={[{ required: true, message: "Address is required" }]}>
                          <Input placeholder="House #, Street name, Area" size="large" className="rounded-3" />
                        </Form.Item>
                      </Col>
                      <Col lg={8} md={8} sm={24} xs={24}>
                        <Form.Item label="Country" name="country" rules={[{ required: true, message: "Country is required" }]}>
                          <Select
                            placeholder="Select country"
                            showSearch
                            size="large"
                            options={countries}
                            optionFilterProp="label"
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={8} md={8} sm={12} xs={24}>
                        <Form.Item label="State / Province" name="state" rules={[{ required: true, message: "State is required" }]}>
                          <Input placeholder="State" size="large" className="rounded-3" />
                        </Form.Item>
                      </Col>
                      <Col lg={8} md={8} sm={12} xs={24}>
                        <Form.Item label="ZIP / Postal Code" name="zipCode" rules={[{ required: true, message: "ZIP code is required" }]}>
                          <Input placeholder="ZIP Code" size="large" className="rounded-3" />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Divider className="my-4" />
                        <div className="d-flex align-items-center gap-2 mb-4">
                          <CreditCardOutlined className="text-primary fs-5" />
                          <Title level={4} className="m-0 fw-semibold">Payment Details</Title>
                        </div>
                      </Col>

                      <Col lg={12} md={12} sm={24} xs={24}>
                        <Form.Item label="Name on Card" name="creditCardName" rules={[{ required: true, message: "Card Name is required" }]}>
                          <Input placeholder="John Doe" size="large" className="rounded-3" />
                        </Form.Item>
                        <Paragraph type="secondary" className="small mt-n2">Full name as displayed on card</Paragraph>
                      </Col>
                      <Col lg={12} md={12} sm={24} xs={24}>
                        <Form.Item label="Card Number" name="creditCardNumber" rules={[{ required: true, message: "Card Number is required" }]}>
                          <Input placeholder="XXXX-XXXX-XXXX-XXXX" size="large" className="rounded-3" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Expiration Date" name="expire" rules={[{ required: true, message: "Expiration date is required" }]}>
                          <Input placeholder="MM/YY" size="large" className="rounded-3" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="CVV Code" name="cvv" rules={[{ required: true, message: "CVV is required" }]}>
                          <Input.Password placeholder="123" maxLength={4} size="large" className="rounded-3" />
                        </Form.Item>
                      </Col>

                      <Col span={24} className="mt-4">
                        <Button
                          icon={<CheckCircleOutlined />}
                          loading={isProcessing}
                          type="primary"
                          size="large"
                          block
                          htmlType="submit"
                          className="border-0 rounded-pill py-3 fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2"
                          style={{ height: '52px' }}
                        >
                        {`Place Order Now · $${totalAmount}`}
                        </Button>
                        
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>

              {/* Order Summary Column */}
              <Col lg={8} md={8} sm={24} xs={24}>
                  <OrderSummary cart={cart} showCheckoutButton={false} />
              </Col>
            </Row>
          )}
        </main>
      </div>
    </>
  );
};

export default CheckoutIndex;