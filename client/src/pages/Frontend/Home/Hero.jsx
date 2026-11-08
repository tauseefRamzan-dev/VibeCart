// // import { Image } from 'antd'
// import { Image } from 'antd'
// import {Typography} from 'antd'
// import { Link } from 'react-router-dom';
// // import mainImg from '../../../../assets/main.jpg'
// const Hero = () => {
//   const {Paragraph,Title}=Typography;
//   return (
//        <div className="card bg-dark text-white border-0 mx-3">
//   <Image src="/main.jpg" className="card-img img-fluid" height="500px" alt="Hero Image"/>
//   <div className="card-img-overlay d-flex align-items-center">
//     <div className="container">
//     <Title level={5} className="card-title fs-1 fw-lighter d-block text-dark">New Season Arrivals</Title>
//     <br />
//     <div>
//       <Title level={3} className=" fw-bold text-dark">Upgrade Your Lifestyle, Elevate Your Style</Title>
//   <p className="lead text-dark " >Discover the latest trends in fashion, timeless jewelry, and cutting-edge electronics. Handpicked premium quality products, just for you.</p>
// <Link to={"products"} className="btn btn-outline-dark text-white btn-lg px-4 py-2 fw-semibold">
//   Shop Now
// </Link>
//     </div>
//     </div>
//   </div>
// </div>
//   )
// }

// export default Hero



import { Image, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const { Title, Paragraph } = Typography;

  // Container variants child elements ko order wise (stagger) animate karne ke liye
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Text elements ke entrance animation
  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Right side image ka slide & fade animation
  const imageVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <div className="mx-3 rounded-4 overflow-hidden bg-light shadow-sm mt-2">
      <div className="row g-0 align-items-center">
        
        {/* Left Side Content with Stagger Animation */}
        <motion.div 
          className="col-12 col-md-5 p-4 p-md-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Title 
              level={5} 
              className="mb-2 text-uppercase fw-bold" 
              style={{ color: '#555555', letterSpacing: '2px', fontSize: '13px' }}
            >
              New Season Arrivals
            </Title>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Title 
              level={2} 
              className="fw-bold mb-3" 
              style={{ color: '#000000', lineHeight: '1.25', fontSize: '2rem' }}
            >
              Upgrade Your Lifestyle, Elevate Your Style
            </Title>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Paragraph 
              className="mb-4" 
              style={{ color: '#444444', fontSize: '15px', fontWeight: '500', lineHeight: '1.6' }}
            >
              Discover the latest trends in fashion, timeless jewelry, and cutting-edge electronics. Handpicked premium quality products, just for you.
            </Paragraph>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="d-inline-block"
            >
              <Link 
                to="/products" 
                className="btn btn-dark btn-lg px-4 py-2.5 rounded-3 fw-semibold shadow-sm text-decoration-none"
                style={{ backgroundColor: '#000000', borderColor: '#000000', color: '#ffffff' }}
              >
                Shop Now →
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Side Image */}
        <motion.div 
          className="col-12 col-md-7 overflow-hidden"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <Image 

            src="/main.jpg" 
            className="img-fluid w-100" 
            style={{ height: 'auto', objectFit: 'cover' }} 
            alt="Hero Image" 
            preview={false}
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;