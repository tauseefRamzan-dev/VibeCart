import { useState } from 'react'
import Header from '../../components/Header'
import { Col, Form, Input, Row, Typography,Button, message } from 'antd'
import '../../sass/_auth.scss'
import { Link } from 'react-router-dom'
import {isEmailValid} from "../../global/global"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserAddOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet-async'
const intialState={fname: "", email: "", password: ""}
const register = () => {
  const [state,setState]=useState(intialState);
  const {Title,Paragraph}=Typography;
  const navigate=useNavigate();
  const [isProcessing,setIsProcessing]=useState(false)
const handleChange=(e)=>{
  setState({...state,[e.target.name] :e.target.value})
  // console.log(state);
}

const handleSubmit=()=>{
  const {fname,email,password}=state;
  
  if(fname.length<3)
    {
      return message.info("Please enter your correct name!");
    }
    if(!isEmailValid(email))
      {
        return message.info("Please enter correct email address!")
      }
      if(password.length<8)
        {
          return message.info("Password must be 8 character.")
        }
        const userData={
          fullName:fname,
          email,
          password
        }
        setIsProcessing(true)
 axios.post(`${import.meta.env.VITE_apiURL}/auth/register`, userData)
      .then(({ status, data }) => {
        if (status === 201) {
          const { message: resMessage } = data
          message.success(resMessage)
          navigate("/auth/login")
        }
      })
      .catch(error => {
        console.error("error", error)
        // message.error("User not registered.")
         message.error(error.response?.data?.message)
      })
      .finally(() => {
        setIsProcessing(false)
      })


}

  return (
    <>
<Helmet>
  <title>Create an Account | VibeCart</title>
  <link rel="canonical" href="https://www.vibecart.com/auth/register" />
</Helmet>

    <Header/>
    <main className='mt-3'>
    <Title className='text-center'>Register</Title>
    <div className="container">
    <hr />
    <div className='auth'>
      <div className='card border-0 p-3'>
     <Form layout='vertical' onFinish={handleSubmit}>
      <Row>
        <Col span={24}>
        <Form.Item label="Full Name">
          <Input type={"text"} placeholder='Enter Your Name' name='fname' onChange={handleChange} />
          </Form.Item>
          </Col>
        <Col span={24}>
        <Form.Item label="Email">
          <Input type={"email"} placeholder='example@gmail.com' name="email" onChange={handleChange} />

          </Form.Item>
          </Col>
        <Col span={24}>
        <Form.Item label="Password">
          <Input.Password name="password" onChange={handleChange} />
          </Form.Item>
          </Col>
          <Col span={24}>
          <Paragraph className='d-inline'>Already has an account? </Paragraph>
          <Link to={"/auth/login"}>Login</Link>
          </Col>
          <Col span={24}>
          <div className="text-center mt-3">               
            <Button loading={isProcessing} icon={<UserAddOutlined />} color="default" variant="solid" htmlType='submit'>
            Register
          </Button>
          </div>
          </Col>

      </Row>
     </Form>
      </div>
    </div>
    </div>
    </main>
    </>
  )
}

export default register