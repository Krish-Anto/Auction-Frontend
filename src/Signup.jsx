import React from 'react'
import { Col, Row, Button, Form, Input, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../global';

function Signup() {
    const navigate = useNavigate();

    const onFinish = async(values) => {
      try{
        const res = await axios.post(`${API}/users/register`, values)
        console.log(res)

            // localStorage.setItem('token', res.data.token);
            // localStorage.setItem('roles', res.data.roles);
          message.success('Registration successful');
          navigate('/'); 
      } catch(err){
        console.error('Error from Backend:', err)
          message.error('Registration failed');
        };
    };
  return (
    <div className='signup'>
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col lg={24} xs={32}>
          <Form
            name="signup"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
          >
            <h1>Signup</h1>
            <Form.Item
              label="name"
              name="name"
              rules={[{ required: true, message: 'Please input your name' }]}
            >
              <Input placeholder="Enter UserId" />
            </Form.Item>

            <Form.Item
              label="UserId"
              name="userId"
              rules={[{ required: true, message: 'Please input your UserId!' }]}
            >
              <Input placeholder="Enter UserId" />
            </Form.Item>
            <Form.Item
              label="email"
              name="email"
              rules={[{ required: true, message: 'Please input your email' }]}
            >
              <Input placeholder="Enter FirstName" />
            </Form.Item>
            {/* <Form.Item
              label="LastName"
              name="LastName"
              rules={[{ required: true, message: 'Please input your LastName' }]}
            >
              <Input placeholder="Enter LastName" />
            </Form.Item> */}

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: 'Please select your role!' }]}
            >
              <Select placeholder="Select your role">
                <Option value="adopter">Adopter</Option>
                <Option value="owner">Pet Owner</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Signup
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Signup