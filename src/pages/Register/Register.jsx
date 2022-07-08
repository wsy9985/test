import React from 'react'
import './register.css'
import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link,useNavigate } from 'react-router-dom';
import {RegisterApi} from '../../request/api'

export default function Register() {
    const navigate = useNavigate()

    const onFinish = (values) => {
        RegisterApi({
            username:values.username,
            password:values.password
        }).then(res=>{
            if(res.errCode === 0){
                message.success(res.message)
                // 跳转至登录页
                setTimeout(()=>{
                    return navigate('/login')
                },1000)
            }else{
                message.error(res.message)
            };
        })
    };

    return (
        <div className='login'>
            <div className='login_box'>
                {/* <img src={logo} alt="" /> */}
                <div className='login_users'>
                    用户注册
                </div>

                <Form
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"

                        rules={[
                            {
                                required: true,
                                message: '请输入您的用户名!',
                            },
                        ]}
                    >
                        <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                    </Form.Item>

                    <Form.Item
                        name="password"

                        rules={[
                            {
                                required: true,
                                message: '请输入账户密码!',
                            },
                        ]}
                    >
                        <Input.Password size="large" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请再次确认密码!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('您所输入的两次密码不一致!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password size="large" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请再次确认密码" />
                    </Form.Item>

                    <Form.Item>
                        <Link to="/login" >
                            <div className='register_set'>
                                已有账号?前往登录
                            </div>
                        </Link>
                    </Form.Item>

                    <Form.Item
                    >
                        <Button size="large" prefix={<UserOutlined />} type="primary" htmlType="submit" block>
                            立即注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

