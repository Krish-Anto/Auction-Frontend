import React from 'react';
import { Col, Row, Button, Form, Input, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../global';

const { Option } = Select;

function Signup() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    axios
      .post(`${API}/users/register`, values)
      .then((res) => {
        message.success('Registration successful');
        navigate('/login'); // Redirect to login page after signup
      })
      .catch((err) => {
        message.error('Registration failed');
      });
  };

  return (
    <div className="Signup">
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col lg={8} xs={22}>
          <Form
            name="signup"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
          >
            <h1>Signup</h1>

            <Form.Item
              label="UserId"
              name="userId"
              rules={[{ required: true, message: 'Please input your UserId!' }]}
            >
              <Input placeholder="Enter UserId" />
            </Form.Item>

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
  );
}

export default Signup;
