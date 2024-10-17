import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Radio } from 'antd';
import axios from 'axios';
import { API } from '../global';

const AddPet = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const handleUploadChange = ({ fileList }) => setFileList(fileList);

    const onFinish = async (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('breed', values.breed);
        formData.append('gender', values.gender);
        formData.append('details', values.details);
        fileList.forEach(file => {
            formData.append('image', file.originFileObj);
        });
        const Token = localStorage.getItem('token')
        const parsedToken =  JSON.parse(Token);
        const {token} = parsedToken;
        console.log("Token",token)
        if (!token) {
            message.error('No authorization token found. Please login.');
            return;
        }
        try {
            const response = await axios.post(`${API}/pets/addpets`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // Send token for authorization
                }
            });
            message.success(response.data.message);
            form.resetFields();
            setFileList([]);
            navigate("/home");
        } catch (error) {
            if (error.response && error.response.data.error === 'jwt expired') {
                message.error('Session expired, please log in again');
                navigate('/login'); 
              }else{
            console.error('Error adding pet:', error);
            message.error('Failed to add pet.');}
        }
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item
                label="Pet Name"
                name="name"
                rules={[{ required: true, message: 'Please input the pet name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Breed"
                name="breed"
                rules={[{ required: true, message: 'Please input the breed!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: 'Please select the gender!' }]}
            >
                <Radio.Group>
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label="Details"
                name="details"
                rules={[{ required: true, message: 'Please input the details!' }]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item label="Image">
                <Upload 
                    fileList={fileList} 
                    onChange={handleUploadChange} 
                    beforeUpload={() => false} // Prevent automatic upload
                    listType="picture"  
                >
                    <Button>Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Add Pet</Button>
            </Form.Item>
        </Form>
    );
};

export default AddPet;
