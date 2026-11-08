import { useState } from 'react'
import Header from '../../components/Header'
import { Col, Form, Input, Row, Typography,Button, message } from 'antd'
import '../../sass/_auth.scss'
import { Link } from 'react-router-dom'
import {isEmailValid} from "../../global/global"
import {LoginOutlined} from '@ant-design/icons';
import {useAuth} from '../../context/Auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'

const intialState={email: "", password: ""}
const login = () => {
  const [state,setState]=useState(intialState);
  const Navigate=useNavigate();
  const [isProcessing,setIsProcessing]=useState(false)
  const {Title,Paragraph}=Typography;
  const {dispatch,readProfile}=useAuth();
const handleChange=(e)=>{
  setState({...state,[e.target.name] :e.target.value})
  // console.log(state);
}

const handleSubmit=()=>{
const {email,password}=state;

  if(!isEmailValid(email))
  {
    return message.info("Please enter correct email address!")
  }
  if(password.length<8)
  {
    return message.info("Password must be 8 character.")
  }
setIsProcessing(true)
 axios.post(`${import.meta.env.VITE_apiURL}/auth/login`, { email, password })
      .then(({ status, data }) => {
        if (status === 200) {
          const { message: resMessage, token } = data
          localStorage.setItem("token", token)
          readProfile(token)
          message.success(resMessage)
        }
      })
      .catch(error => {
        console.error("error", error)
        // message.error("Something went wrong. Please try again.")
        message.error(error.response?.data?.message)
      })
      .finally(() => {
        setIsProcessing(false)
      })
  

}




  return (
    <>
<Helmet>
  <title>Login | VibeCart</title>
  <link rel="canonical" href="https://www.vibecart.com/auth/login" />
</Helmet>

    <Header/>
    <main className='mt-3'>
    <Title className='text-center'>Login</Title>
    <div className="container">
    <hr />
    <div className='auth'>
      <div className='card border-0 p-3'>
     <Form layout='vertical' onFinish={handleSubmit}>
      <Row>
        <Col span={24}>
        <Form.Item label="Email">
          <Input type={"email"} placeholder='example@gmail.com' name="email" onChange={handleChange} />

          </Form.Item>
          </Col>
        <Col span={24}>
        <Form.Item label="Password">
          <Input.Password  placeholder='Password' name="password" onChange={handleChange} />
          </Form.Item>
          </Col>
          <Col span={24}>
          <Paragraph className='d-inline'>New here? </Paragraph>
          <Link to={"/auth/register"}>Register</Link>
          </Col>
          <Col span={24}>
          <Paragraph className='d-inline'>Forget Password? </Paragraph>
          <Link to={"/auth/forgetPassword"}>Reset Password</Link>
          </Col>
          <Col span={24}>
          <div className="text-center mt-3">               
            <Button loading={isProcessing} icon={<LoginOutlined />}  color="default" variant="solid" htmlType='submit'>
              
            Login
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

export default login