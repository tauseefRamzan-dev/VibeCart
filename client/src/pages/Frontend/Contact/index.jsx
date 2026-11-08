import { Helmet } from 'react-helmet-async';
import Header from '../../../components/Header'
import { Form, Input, Typography,Row,Col } from 'antd'
const index = () => {
  const {Title}=Typography;
  return (
    <>
<Helmet>
  <title>Contact Us | VibeCart</title>
  <meta name="description" content="Get in touch with the VibeCart support team for help and inquiries." />
  <link rel="canonical" href="https://www.vibecart.com/contact" />
</Helmet>

    <Header/>
    <div id='contactUs'>
      <div className="container my-4 py-3">
        <Title level={1} className='text-center'>Contact Us</Title>
        <hr />
      <div className="d-flex flex-row justify-content-center align-items-center mt-4">
        <div className='card border-0 w-100 p-3' style={{maxWidth: "450px"}}>

        <Form layout='vertical'>
          <Row>
            <Col span={24}>
            <Form.Item label="Name">
              <Input type={"text"} placeholder='Enter your name' />
            </Form.Item>
            </Col>
            <Col span={24}>
            <Form.Item label="Email">
              <Input type={"email"} placeholder='Enter your email' />
            </Form.Item>
            </Col>
            <Col span={24}>
            <Form.Item label="Message">
              <Input.TextArea placeholder='Enter your message' />
            </Form.Item>
            </Col>
            <Col span={24}>
            <Form.Item >
              <div className='text-center'>
             <button className='my-2 px-4  btn btn-dark'>Send</button>
              </div>
            </Form.Item>
            </Col>
          </Row>
        </Form>
        </div>
        <hr />
      </div>
    </div>
    </div>
    </>
  )
}

export default index