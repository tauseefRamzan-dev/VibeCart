import { Link } from 'react-router-dom';
import Copyright from './Copyright';
import { Typography, Row, Col } from 'antd';

const Footer = () => {
  const { Title, Paragraph } = Typography;

  return (
    <footer className="bg-light p-4 mt-3">
      <div className='container'>
      <Row  gutter={[16, 16]} justify="space-between">
        <Col lg={10} xl={10} sm={24} xs={24}>
          <Title level={2}>VibeCart</Title>
          <Paragraph>
            Discover the best products at unbeatable prices. We strive to bring
            quality and affordability to your shopping experience. Shop with
            confidence and enjoy a seamless online shopping journey with us.
          </Paragraph>
          <Paragraph className="mt-2">
            Our mission is to provide top-notch products and exceptional customer
            service. Stay connected with us for the latest updates, offers, and
            new arrivals. Your satisfaction is our priority!
          </Paragraph>
        </Col>

        <Col lg={12} xl={12} sm={24} xs={24}>
          <Row gutter={[16, 16]} justify="end">
            <Col span={12}>
              <Title level={4}>Company</Title>
              <div className="d-flex flex-column gap-1">
                <Link to="/" className="link-body-emphasis text-decoration-none">Home</Link>
                <Link to="/about" className="link-body-emphasis text-decoration-none">About Us</Link>
                <Link to="/delivery" className="link-body-emphasis text-decoration-none">Delivery</Link>
                <Link to="/privacy" className="link-body-emphasis text-decoration-none">Privacy Policy</Link>
                <Link to="/terms" className="link-body-emphasis text-decoration-none">Terms & Conditions</Link>
                <Link to="/careers" className="link-body-emphasis text-decoration-none">Careers</Link>
              </div>
            </Col>

            <Col span={12}>
              <Title level={4}>Get In Touch</Title>
              <div className="d-flex flex-column gap-1">
                <a href="tel:+923000000000" className="link-body-emphasis text-decoration-none">+92-3000000000</a>
                <a href="mailto:vibecart@gmail.com" className="link-body-emphasis text-decoration-none">vibecart@gmail.com</a>
                <Link to="/support" className="link-body-emphasis text-decoration-none">Support Center</Link>
                <Link to="/faqs" className="link-body-emphasis text-decoration-none">FAQs</Link>
                <Link to="/chat" className="link-body-emphasis text-decoration-none">Live Chat</Link>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Copyright />
    </div>
    </footer>
  );
};

export default Footer;



