import React from 'react'
import { Col, Row } from 'antd';
import { Button, Checkbox, Form, Input,message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { API } from '../global';

function Login() {
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try{
          console.log(values)
        const res = await axios.post(`${API}/users/login`,values)
          message.success("Login Success");
          if(!res.data){
            console.error("No res data found in localStorage - Login");
      return;
          }
         const token = res.data.token;
         const petId = res.data._id
         localStorage.setItem("userData",JSON.stringify({"token":token,"petId":petId}))
         navigate("/home")
        }
        
        catch(err){
          console.error("Error:",err)
        message.error("Invalid Credentials")
        }
      };

       const handleSignup = () => {
    navigate('/signup');
  };

  
  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="Login">
        
        <Row>
            <Col lg={24} xs={30}>
      <Form
    name="login"
    labelCol={{ span: 4 }}
    wrapperCol={{ span: 8 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    
  >
    <h1>Login</h1>
    <Form.Item
      label="UserId"
      name="userId"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input id='username' placeholder='123' />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password id='password' placeholder='john@123' />
    </Form.Item>

    <Form.Item 
    name = "remember"
    valuePropName='checked'
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
    <Form.Item>
              <Button type="link" onClick={handleForgotPassword}>
                Forgot Password
              </Button>
              <Button type="link" onClick={handleSignup}>
                Signup
              </Button>
            </Form.Item>
  </Form>
            </Col>
        </Row>
    </div>
  )
}

export default Login