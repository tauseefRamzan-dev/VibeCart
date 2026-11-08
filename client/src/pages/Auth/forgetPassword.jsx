import { useState } from 'react'
import Header from '../../components/Header'
import { Col, Form, Input, Row, Typography,Button, message } from 'antd'
import '../../sass/_auth.scss'
import { Link } from 'react-router-dom'
import {isEmailValid} from "../../global/global"
const intialState={email: ""}
const ForgetPassword = () => {
  const [state,setState]=useState(intialState);
  const {Title,Paragraph}=Typography;
  const [isProcessing,setIsProcessing]=useState(false)
const handleChange=(e)=>{
  setState({...state,[e.target.name] :e.target.value})
  console.log(state);
}

const handleSubmit=()=>{
const {email}=state;

  if(!isEmailValid(email))
  {
    return message.info("Please enter correct email address!")
  }
  setIsProcessing(true)
//   sendPasswordResetEmail(auth, email)
//   .then(() => {
//     // Password reset email sent!
//     // ..
//     message.success("Password reset email sent!")
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//     console.log(error)
//     message.error("Something went wrong. Please Try Again!")
//   }).finally(()=>{
//     setIsProcessing(false);
//   });
}
  

  

  return (
    <>
    <Header/>
    <main className='mt-3'>
    <Title className='text-center'>Forget Password</Title>
    <div className="container">
    <hr />
    <div className='auth'>
      <div className='card border-0 p-3'>
     <Form layout='vertical'>
      <Row>
        <Col span={24}>
        <Form.Item label="Email" name={"email"}>
          <Input type={"email"} placeholder='example@gmail.com' name="email" onChange={handleChange} />

          </Form.Item>
          </Col>
          <Col span={24}>
          <Paragraph className='d-inline'>Password remember? </Paragraph>
          <Link to={"/auth/login"}>Login</Link>
          </Col>
          <Col span={24}>
          <div className="text-center mt-3">               
            <Button onClick={handleSubmit} loading={isProcessing} color="default" variant="solid" htmlType='submit'>
            Send email to reset password
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

export default ForgetPassword

