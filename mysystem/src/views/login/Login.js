import React from 'react'
import {message, Button, Checkbox, Form, Input } from 'antd';
import './Login.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate=useNavigate()
  const onFinish = (values) => {
    // console.log('Success:', values);
     axios.get(`/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`)
     .then(res=>{
      // console.log(res.data)
      if(res.data.length===0){
        error();
      }
      else {
        success()
        localStorage.setItem('token',JSON.stringify(res.data[0]))
        navigate('/home')
      }
     })
  };
  const error = () => {
    message.error('login error');
  };
  const success = () => {
    message.success('login success');
  };
  return (
    <div style={{ backgroundColor: "rgba(138,169,198,0.3)", height: '100%', zIndex: '-999' }}>

      <div className='loginContainer'>
        <div className='loginTitle'>全球新闻发布系统</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
