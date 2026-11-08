// // // import { Link } from 'react-router-dom'
// // // import { Avatar, Space, Dropdown} from 'antd'
// // // import {useAuth} from '../../context/Auth'
// // // import {useCart} from '../../context/CartContext'
// // // import {LogoutOutlined,ShoppingFilled,UserOutlined } from '@ant-design/icons';

// // // const Navbar = () => {
// // //   const {isAuth,user,dispatch,handleLogout}=useAuth();
// // //   const {cart}=useCart();
  


// // // const items=[
// // //   {
// // //     key: '1',
// // //     label: 'My Account',
// // //     disabled: true,
// // //   },
// // //   {
// // //     type: 'divider',
// // //   },
// // //   {
// // //     key: '2',
// // //     label: `Name: ${user?.fullName}`,
// // //   },
// // //   {
// // //     key: '3',
// // //     label: `Email: ${user?.email}`,
// // //   },
// // //   {
// // //     type: 'divider',
// // //   },
// // //  {
// // //       key: '4',
// // //       label: <span className="text-danger fw-bold">Logout</span>, 
// // //       icon: <LogoutOutlined className="text-danger" />,
// // //       onClick: () => {
// // //     handleLogout();
// // //       }
// // //     },
// // // ];

// // //   return (
// // //     <nav className="navbar navbar-expand-lg bg-light sticky-top">
// // //   <div className="container py-3 ">
// // // <Link 
// // //   to={"/"} 
// // //   className="navbar-brand d-flex align-items-center"
// // //   style={{ 
// // //     height: '40px',          
// // //     width: '160px',         
// // //     overflow: 'hidden',      
// // //     position: 'relative'
// // //   }}
// // // >
// // //   <img 
// // //     src="/logo.png" 
// // //     alt="VibeCart Logo" 
// // //     style={{ 
// // //       height: '140px',       
// // //       width: 'auto',
// // //       maxWidth: 'none',
// // //       position: 'absolute',
// // //       top: '50%',
// // //       left: '50%',
// // //       transform: 'translate(-50%, -50%)', 
// // //       objectFit: 'contain'
// // //     }} 
// // //   />
// // // </Link>
// // //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
// // //       <span className="navbar-toggler-icon"></span>
// // //     </button>
// // //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
// // //       <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
// // //         <li className="nav-item">
// // //           <Link to={"/"} className="nav-link active" aria-current="page" href="#">Home</Link>
// // //         </li>
// // //         <li className="nav-item">
// // //           <Link to={"/products"} className="nav-link" href="#">Products</Link>
// // //         </li>
// // //         <li className="nav-item">
// // //           <Link to={"/about"} className="nav-link" href="#">About</Link>
// // //         </li>
// // //         <li className="nav-item">
// // //           <Link to={"/contact"} className="nav-link" href="#">Contact</Link>
// // //         </li>

// // //         {

// // //           (isAuth && (user.role==="admin" || user.role==="superAdmin"))?    <li className="nav-item">
// // //           <Link to={"/dashboard"} className="nav-link" href="#">Dashboard</Link>
// // //         </li>
// // //           :""
// // //         }
     
// // //       </ul>


// // //       <Space>

// // // { 

// // //   (isAuth)? 
// // //   <Dropdown menu={{ items }}>
// // //     <a onClick={(e) => e.preventDefault()}>
// // //       <Space>
// // //         <Avatar size="large" icon={<UserOutlined />} />
// // //       </Space>
// // //     </a>
// // //   </Dropdown>
// // //   :
// // // <>
// // //       <Link to={"/auth/login"} className='btn btn-outline-dark'>
// // //       <i className="fas fa-sign-in-alt me-1"></i>
// // //       Login
// // //       </Link>
// // //       <Link to={"/auth/register"} className='btn btn-outline-dark'>
// // //       <i className="fa fa-user-plus me-1"></i>
// // //       Register
// // //       </Link>
// // // </>
// // // }
// // // { 
// // //   (isAuth && user.role==="customer")? 
// // //       <Link to={"/dashboard/my-orders"} className='btn btn-outline-dark'>
// // //         <Space size={"small"}>

// // //       <ShoppingFilled/>

// // //       My Orders
// // //         </Space>
// // //       </Link>
// // //       :""

// // // }


// // //       <Link to={"/cart"} className='btn btn-outline-dark'>
// // //       <i className="fa fa-cart-shopping me-1"></i>
// // //       Cart ({cart.length})</Link>
// // //       </Space>
// // //     </div>
// // //   </div>
// // // </nav>
// // //   )
// // // }

// // // export default Navbar




// import { Link, useLocation } from 'react-router-dom';
// import { Avatar, Space, Dropdown } from 'antd';
// import { useAuth } from '../../context/Auth';
// import { useCart } from '../../context/CartContext';
// import { LogoutOutlined, ShoppingFilled, UserOutlined } from '@ant-design/icons';
// import { motion, AnimatePresence } from 'framer-motion';

// const Navbar = () => {
//   const { isAuth, user, handleLogout } = useAuth();
//   const { cart } = useCart();
//   const location = useLocation(); // Current active page path
//   const items = [
//     {
//       key: '1',
//       label: 'My Account',
//       disabled: true,
//     },
//     {
//       type: 'divider',
//     },
//     {
//       key: '2',
//       label: `Name: ${user?.fullName}`,
//     },
//     {
//       key: '3',
//       label: `Email: ${user?.email}`,
//     },
//     {
//       type: 'divider',
//     },
//     {
//       key: '4',
//       label: <span className="text-danger fw-bold">Logout</span>,
//       icon: <LogoutOutlined className="text-danger" />,
//       onClick: () => {
//         handleLogout();
//       },
//     },
//   ];

//   return (
//     <nav className="navbar navbar-expand-lg bg-light sticky-top shadow-sm">
//       <div className="container py-2">
      
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           transition={{ type: 'spring', stiffness: 300 }}
//         >
//           <Link
//             to={'/'}
//             className="navbar-brand d-flex align-items-center"
//             style={{
//               height: '40px',
//               width: '160px',
//               overflow: 'hidden',
//               position: 'relative',
//             }}
//           >
//             <img
//               src="/logo.png"
//               alt="VibeCart Logo"
//               style={{
//                 height: '140px',
//                 width: 'auto',
//                 maxWidth: 'none',
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 objectFit: 'contain',
//               }}
//             />
//           </Link>
//         </motion.div>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
//             {['Home', 'Products', 'About', 'Contact'].map((item, index) => {
//               const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
//               const isActive = location.pathname === path;

//               return (
//                 <motion.li
//                   key={item}
//                   className="nav-item"
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3, delay: index * 0.1 }}
//                 >
//                   <Link to={path} className={`nav-link ${isActive ? 'active fw-semibold' : ''}`}>
//                     {item}
//                   </Link>
//                 </motion.li>
//               );
//             })}

//             {isAuth && (user.role === 'admin' || user.role === 'superAdmin') && (
//               <motion.li
//                 className="nav-item"
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: 0.4 }}
//               >
//                 <Link
//                   to={'/dashboard'}
//                   className={`nav-link ${location.pathname.startsWith('/dashboard') ? 'active fw-semibold' : ''}`}
//                 >
//                   Dashboard
//                 </Link>
//               </motion.li>
//             )}
//           </ul>

//           <Space align="center" size="middle">
//             {isAuth ? (
//               <Dropdown menu={{ items }}>
//                 <motion.a
//                   onClick={(e) => e.preventDefault()}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   style={{ display: 'inline-block', cursor: 'pointer' }}
//                 >
//                   <Space>
//                     <Avatar size="large" icon={<UserOutlined />} />
//                   </Space>
//                 </motion.a>
//               </Dropdown>
//             ) : (
//               <>
          
//                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                   <Link
//                     to={'/auth/login'}
//                     className={`btn ${
//                       location.pathname === '/auth/login' ? 'btn-dark' : 'btn-outline-dark'
//                     }`}
//                   >
//                     <i className="fas fa-sign-in-alt me-1"></i>
//                     Login
//                   </Link>
//                 </motion.div>

              
//                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                   <Link
//                     to={'/auth/register'}
//                     className={`btn ${
//                       location.pathname === '/auth/register' ? 'btn-dark' : 'btn-outline-dark'
//                     }`}
//                   >
//                     <i className="fa fa-user-plus me-1"></i>
//                     Register
//                   </Link>
//                 </motion.div>
//               </>
//             )}

//             {isAuth && user.role === 'customer' && (
//               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                 <Link
//                   to={'/dashboard/my-orders'}
//                   className={`btn ${
//                     location.pathname === '/dashboard/my-orders' ? 'btn-dark' : 'btn-outline-dark'
//                   }`}
//                 >
//                   <Space size={'small'}>
//                     <ShoppingFilled />
//                     My Orders
//                   </Space>
//                 </Link>
//               </motion.div>
//             )}

          
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Link
//                 to={'/cart'}
//                 className={`btn d-flex align-items-center gap-2 ${
//                   location.pathname === '/cart' ? 'btn-dark' : 'btn-outline-dark'
//                 }`}
//               >
//                 <i className="fa fa-cart-shopping"></i>
//                 <span>Cart</span>
//                 {
//                   (cart.length===0)?
// ""
//                   :
// <AnimatePresence mode="wait">
//                   <motion.span
//                     key={cart.length}
//                     initial={{ scale: 0.4, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     exit={{ scale: 0.4, opacity: 0 }}
//                     transition={{ type: 'spring', stiffness: 500, damping: 15 }}
//                     className={`badge rounded-pill ${
//                       location.pathname === '/cart' 
//                         ? 'bg-white text-dark shadow-sm' 
//                         : 'bg-dark text-white'
//                     }`}
//                     style={{
//                       padding: '0.35em 0.65em',
//                       fontSize: '0.75rem',
//                       fontWeight: '600',
//                     }}
//                   >
//                     {cart.length}
//                   </motion.span>
//                 </AnimatePresence>
//                 }
                
//               </Link>
//             </motion.div>
//           </Space>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { Link, useLocation } from 'react-router-dom';
import { Avatar, Space, Dropdown } from 'antd';
import { useAuth } from '../../context/Auth';
import { useCart } from '../../context/CartContext';
import { LogoutOutlined, ShoppingFilled, UserOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { isAuth, user, handleLogout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();

  const items = [
    { key: '1', label: 'My Account', disabled: true },
    { type: 'divider' },
    { key: '2', label: `Name: ${user?.fullName}` },
    { key: '3', label: `Email: ${user?.email}` },
    { type: 'divider' },
    {
      key: '4',
      label: <span className="text-danger fw-bold">Logout</span>,
      icon: <LogoutOutlined className="text-danger" />,
      onClick: () => handleLogout(),
    },
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-light sticky-top shadow-sm">
      <div className="container py-2">
        
        {/* Brand / Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Link
            to={'/'}
            className="navbar-brand d-flex align-items-center"
            style={{ height: '40px', width: '140px', overflow: 'hidden', position: 'relative' }}
          >
            <img
              src="/logo.png"
              alt="VibeCart Logo"
              style={{
                height: '120px',
                width: 'auto',
                maxWidth: 'none',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                objectFit: 'contain',
              }}
            />
          </Link>
        </motion.div>

        {/* Mobile Actions Container (Cart & Toggler grouped for clean mobile header) */}
        <div className="d-flex align-items-center gap-2 d-lg-none">
          {/* Mobile Cart Button Shortcut */}
          <Link
            to={'/cart'}
            className={`btn btn-sm position-relative d-flex align-items-center ${
              location.pathname === '/cart' ? 'btn-dark' : 'btn-outline-dark'
            }`}
          >
            <i className="fa fa-cart-shopping"></i>
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                {cart.length}
              </span>
            )}
          </Link>

          {/* Hamburger Toggler */}
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 py-2 py-lg-0">
            {['Home', 'Products', 'About', 'Contact'].map((item, index) => {
              const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
              const isActive = location.pathname === path;

              return (
                <motion.li
                  key={item}
                  className="nav-item my-1 my-lg-0"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link to={path} className={`nav-link ${isActive ? 'active fw-semibold' : ''}`}>
                    {item}
                  </Link>
                </motion.li>
              );
            })}

            {isAuth && (user.role === 'admin' || user.role === 'superAdmin') && (
              <motion.li
                className="nav-item my-1 my-lg-0"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Link
                  to={'/dashboard'}
                  className={`nav-link ${location.pathname.startsWith('/dashboard') ? 'active fw-semibold' : ''}`}
                >
                  Dashboard
                </Link>
              </motion.li>
            )}
          </ul>

          {/* Desktop & Mobile Expanded Actions */}
          <Space align="center" size="middle" className="flex-wrap w-100 justify-content-lg-end mt-2 mt-lg-0">
            {isAuth ? (
              // <Dropdown menu={{ items }} trigger={['click']}>
              //   <motion.a
              //     onClick={(e) => e.preventDefault()}
              //     whileHover={{ scale: 1.1 }}
              //     whileTap={{ scale: 0.9 }}
              //     style={{ display: 'inline-block', cursor: 'pointer' }}
              //   >
              //     <Space>
              //       <Avatar size="large" icon={<UserOutlined />} />
              //     </Space>
              //   </motion.a>
              // </Dropdown>
          <Dropdown menu={{ items }}>
                <motion.a
                  onClick={(e) => e.preventDefault()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ display: 'inline-block', cursor: 'pointer' }}
                >
                  <Space>
                    <Avatar size="large" icon={<UserOutlined />} />
                  </Space>
                </motion.a>
              </Dropdown>
            ) : (
              <div className="d-flex gap-2 w-100 w-lg-auto">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-fill">
                  <Link
                    to={'/auth/login'}
                    className={`btn w-150 ${location.pathname === '/auth/login' ? 'btn-dark' : 'btn-outline-dark'} w-100`}
                  >
                    <i className="fas fa-sign-in-alt me-1"></i> Login
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-fill">
                  <Link
                    to={'/auth/register'}
                    className={`btn ${location.pathname === '/auth/register' ? 'btn-dark' : 'btn-outline-dark'} w-100`}
                  >
                    <i className="fa fa-user-plus me-1"></i> Register
                  </Link>
                </motion.div>
              </div>
            )}

            {isAuth && user.role === 'customer' && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-100 w-lg-auto">
                <Link
                  to={'/dashboard/my-orders'}
                  className={`btn w-100 ${location.pathname === '/dashboard/my-orders' ? 'btn-dark' : 'btn-outline-dark'}`}
                >
                  <Space size={'small'}>
                    <ShoppingFilled />
                    My Orders
                  </Space>
                </Link>
              </motion.div>
            )}

            {/* Desktop Cart Button (Hidden on small screens since it's in the top bar now) */}
            <div className="d-none d-lg-block">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={'/cart'}
                  className={`btn d-flex align-items-center gap-2 ${
                    location.pathname === '/cart' ? 'btn-dark' : 'btn-outline-dark'
                  }`}
                >
                  <i className="fa fa-cart-shopping"></i>
                  <span>Cart</span>
                  {cart.length > 0 && (
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={cart.length}
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                        className={`badge rounded-pill ${
                          location.pathname === '/cart' ? 'bg-white text-dark shadow-sm' : 'bg-dark text-white'
                        }`}
                        style={{ padding: '0.35em 0.65em', fontSize: '0.75rem', fontWeight: '600' }}
                      >
                        {cart.length}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </Link>
              </motion.div>
            </div>
          </Space>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;