import { Helmet } from 'react-helmet-async';
import Header from '../../../components/Header'
import { Col, Image, Row, Typography } from 'antd'

const index = () => {
  const {Title,Paragraph,Text}=Typography;
  return (
    <>
<Helmet>
  <title>About Us | VibeCart</title>
  <meta name="description" content="Learn more about VibeCart, our mission, and our values." />
  <link rel="canonical" href="https://www.vibecart.com/about" />
</Helmet>

    <Header/>
    <main>
      <div id='about-section'>

      <div className="container my-4 py-3">

            <Title level={1} className='text-center'>About Us</Title>
            <hr />
            {/* <Paragraph className='lead text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum facere doloremque veritatis odit similique sequi. Odit amet fuga nam quam quasi facilis sed doloremque saepe sint perspiciatis explicabo totam vero quas provident ipsam, veritatis nostrum velit quos recusandae est mollitia esse fugit dolore laudantium. Ex vel explicabo earum unde eligendi autem praesentium, doloremque distinctio nesciunt porro tempore quis eaque labore voluptatibus ea necessitatibus exercitationem tempora molestias. Ad consequuntur veniam sequi ullam tempore vel tenetur soluta dolore sunt maxime aliquam corporis est, quo saepe dolorem optio minus sint nemo totam dolorum! Reprehenderit delectus expedita a alias nam recusandae illo debitis repellat libero, quasi explicabo molestiae saepe, dolorem tempore itaque eveniet quam dignissimos blanditiis excepturi harum numquam vel nihil? Ipsum</Paragraph> */}
            <Paragraph className='p-1'>Welcome, Your ultimate destination for fashion, style, and technology. Founded with a passion for quality and trends, we bring you a curated collection of premium products right to your doorstep.

Our journey started with a simple idea: to provide an effortless shopping experience without compromising on quality. Whether you are looking to upgrade your wardrobe with the latest Men's and Women's fashion, add a touch of elegance with our exclusive Jewelry, or stay ahead of the curve with cutting-edge Electronics—we have got you covered.
</Paragraph>
<Title level={3}>Why choose Us?</Title>
<ul className="list">
  <li className="list--item"><span>Premium Quality:</span> We handpick every item to ensure it meets our strict quality standards.</li>
  <li className="list-item"><span>Customer First:</span> Your satisfaction is our top priority. Our support team is always here to help.</li>
  <li className="list-item"><span>Fast & Secure Shipping:</span> Get your favorite products delivered safely and quickly.</li>
  <li className="list-item">A fourth item</li>
  <li className="list-item">And a fifth one</li>
</ul>
<Text className="fw-bold">Thank you for choosing us as your trusted shopping partner. Happy Shopping!</Text>
            <Title level={2} className='text-center'>Our Products</Title>
            <Row justify={"center"} gutter={[16,16]}>
              <Col xs={24} sm={12} md={8} lg={6} className='d-flex justify-content-center'><div className="card" style={{width: "16rem"}}>

  <Image  className="card-img-top" preview={false}  src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Card image cap"/>
  <div className="card-body">
    <Title level={4} className="card-text">Mens's Clothing</Title>
  </div>
</div></Col>
              <Col xs={24} sm={12} md={8} lg={6} className='d-flex justify-content-center'><div className="card" style={{width: "16rem"}}>
  <Image  className="card-img-top" preview={false}   src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Card image cap"/>
  <div className="card-body">
    <Title level={4} className="card-text">Women's Clothing</Title>
  </div>
</div></Col>
              <Col xs={24} sm={12} md={8} lg={6} className='d-flex justify-content-center'><div className="card" style={{width: "16rem"}}>
  <Image  className="card-img-top" preview={false} src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Card image cap"/>
  <div className="card-body">
    <Title level={4} className="card-text">Jewelery</Title>
  </div>
</div></Col>
              <Col xs={24} sm={12} md={8} lg={6} className='d-flex justify-content-center'><div className="card" style={{width: "16rem"}}>
  <Image  className="card-img-top" preview={false}  src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Card image cap"/>
  <div className="card-body">
    <Title level={4} className="card-text">Electronics</Title>
  </div>
</div></Col>
            
            </Row>
      </div>
      </div>
    </main>
    </>
  )
}

export default index