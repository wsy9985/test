import React from 'react'
import './login.css'
import { Button, Form, Input, message } from 'antd';
import {UserOutlined,LockOutlined} from '@ant-design/icons';
import { Link ,useNavigate,useLocation} from 'react-router-dom';
import { LoginApi } from '../../request/api';
import axios from 'axios';

export default function Login() {
    const {pathname} = useLocation();
    console.log(pathname);
    const navigate = useNavigate();
    const onFinish = (values) => {
        axios.post('https://lianghj.top:8888/api/private/v1/login',{
        password:'123456',
        username:'admin'
        })
        // 获取成功结果
        .then(res=>{
        let{data} = res.data;
            sessionStorage.token = data.token // 避免多个用户同时登录产生数据覆盖等问题
        })

        LoginApi({
            username:values.username,
            password:values.password
        }).then(res =>{
            if(res.errCode === 0){
                message.success(res.message);
                // 存储数据
                localStorage.setItem('avatar',res.data.avatar)
                localStorage.setItem('cms-token',res.data['cms-token'])
                localStorage.setItem('editable',res.data.editable)
                localStorage.setItem('player',res.data.player)
                localStorage.setItem('username',res.data.username)
                // 跳转到app
                setTimeout(()=>{
                    return navigate('/app')
                },1000)
            }else{
                message.error(res.message);
            }
            
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='login'>
            <div className='login_box'>
                {/* <img src={logo} alt="" /> */}
                <div className='login_users'>
                    用户登录
                </div>

                <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item 
                        name="username"
                       
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input size="large"  prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                       
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password  size="large" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码"/>
                    </Form.Item>

                    <Form.Item>
                       <Link to="/register" >
                            <div className='login_set'>
                                没有账号?立即注册
                            </div>
                            
                       </Link>
                    </Form.Item>

                    <Form.Item
                    >
                        <Button size="large"  prefix={<UserOutlined />} type="primary" htmlType="submit" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
