import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
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
        formData.append('details', values.details);
        fileList.forEach(file => {
            formData.append('photos', file.originFileObj);
        });

        try {
            const response = await axios.post(`${API}/pets`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': localStorage.getItem('token') // Send token for authorization
                }
            });
            message.success(response.data.message);
            form.resetFields();
            setFileList([]);
        } catch (error) {
            console.error('Error adding pet:', error);
            message.error('Failed to add pet.');
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
                label="Details"
                name="details"
                rules={[{ required: true, message: 'Please input the details!' }]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item label="Photos">
                <Upload 
                    fileList={fileList} 
                    onChange={handleUploadChange} 
                    beforeUpload={() => false} // Prevent automatic upload
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