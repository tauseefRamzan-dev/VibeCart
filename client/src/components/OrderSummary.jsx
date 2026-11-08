// import {useEffect } from 'react';
// import { Typography,Button, } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import {useAuth} from '../context/Auth'

// const formatToNumber = (num) => Number(Number(num).toFixed(2));

// const orderSummary = (props) => {
//     const {Title,Paragraph,Text}=Typography;
//     const {isAuth}=useAuth();
//     const Navigate=useNavigate();
//     const {cart,showCheckoutButton}=props;



//     const productTotal =formatToNumber(cart.reduce((acc, item) => acc + (item.price * item.quantity), 0));
//     const shippingFee=30;
//     const totalAmount=formatToNumber(productTotal+shippingFee);

//    useEffect(() => {
    
//   localStorage.setItem("bill", JSON.stringify({subtotal: productTotal, shippingFee, totalAmount, }));
// }, [cart]); 
//     return (
//     <div className='order-summary card'>
//                     <div  style={{backgroundColor: "#F8F8F8"}} className='border-bottom'>
//                       <Title className='p-2' level={4}>Order Summary</Title>
//                     </div>
//                     <div className='d-flex flex-column p-3'>

//                     <div id='products' className='d-flex flex-row justify-content-between'>
//                          <Paragraph>Products<strong> ({cart.length})</strong> </Paragraph>
//                          <Text>${productTotal}</Text>
//                     </div>
//                     <div id='shipping' className='d-flex flex-row justify-content-between'>
//                         <Paragraph>Shipping</Paragraph>
//                         <Text>$30</Text>
//                     </div>
//                     <div id='shipping' className='d-flex flex-row justify-content-between'>
//                         <Paragraph> <strong>Total Amount</strong> </Paragraph>
//                         <Text> <strong>${totalAmount}</strong> </Text>
//                     </div>

//                    {
//                     (showCheckoutButton)?
//                     <div id='checkout' className='text-center'> 
//                          <Button onClick={()=>{
// if(isAuth){
//   Navigate("/checkout");

// }else
// {
//   Navigate("/auth/login");
// }

//                           }} color="default" variant="solid">
//             Go to checkout
//           </Button>
//                     </div>: ""
//                         } 
//                     </div>
//                   </div>
//   )
// }

// export default orderSummary



import { useEffect } from 'react';
import { Typography, Button, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useAuth } from '../context/Auth';

const { Title, Text } = Typography;

const formatToNumber = (num) => Number(Number(num).toFixed(2));

const OrderSummary = ({ cart = [], showCheckoutButton = true }) => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const isCartEmpty = cart.length === 0;
  const productTotal = formatToNumber(
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  const shippingFee = isCartEmpty ? 0 : 30;
  const totalAmount = formatToNumber(productTotal + shippingFee);

  useEffect(() => {
    localStorage.setItem(
      "bill",
      JSON.stringify({ subtotal: productTotal, shippingFee, totalAmount })
    );
  }, [cart, productTotal, shippingFee, totalAmount]);

  const handleCheckout = () => {
    if (isAuth) {
      navigate("/checkout");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
      {/* Summary Header */}
      <div className="bg-light px-4 py-3 border-bottom">
        <Title level={5} className="m-0 fw-semibold text-dark d-flex align-items-center gap-2">
          <ShoppingOutlined /> Order Summary
        </Title>
      </div>

      {/* Summary Details */}
      <div className="p-4 d-flex flex-column gap-3">
        <div className="d-flex justify-content-between align-items-center">
          <Text type="secondary">
            Subtotal <span className="fw-medium text-dark">({cart.length} items)</span>
          </Text>
          <Text className="fw-semibold text-dark">${productTotal.toFixed(2)}</Text>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <Text type="secondary">Shipping Fee</Text>
          <Text className="fw-semibold text-dark">
            {isCartEmpty ? "$0.00" : `$${shippingFee.toFixed(2)}`}
          </Text>
        </div>

        <Divider className="my-2" />

        <div className="d-flex justify-content-between align-items-center">
          <Text className="fw-bold text-dark fs-6">Total Amount</Text>
          <Text className="fw-bold text-success fs-5">
            ${totalAmount.toFixed(2)}
          </Text>
        </div>

        {/* Checkout CTA */}
        {showCheckoutButton && (
          <div className="mt-4">
  <button
    type="button"
    disabled={isCartEmpty}
    onClick={handleCheckout}
    className={`btn btn-dark w-100 rounded-pill fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2 custom-checkout-btn ${isCartEmpty ? 'disabled' : ''}`}
    style={{ height: '52px', fontSize: '1rem' }}
  >
    <span>Go to Checkout</span>
    <ArrowRightOutlined className="checkout-icon" />
  </button>
</div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;