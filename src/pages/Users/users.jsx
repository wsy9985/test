import { Space, Table, Tag, Pagination, message, Button, Modal, Form, Input, } from 'antd';
import axios from 'axios'
import { useState, useEffect, Component } from 'react'
import './users.css'


const Users = () => {
    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <a href='#'>{text}</a>,
        },
        {
            title: '工号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '角色名称',
            dataIndex: 'role_name',
            key: 'role_name',
        },
        {
            title: '手机号码',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: '电子邮件',
            key: 'email',
            dataIndex: 'email',
            render: text => <Tag>{text}</Tag>,
        },
        {
            title: '功能菜单',
            key: 'action',
            render: (text) => (
                <Space size="middle">
                    {/* 更新 */}
                    <a onClick={update.bind(this, text)}>修改</a>
                    {/* 删除 */}
                    <a onClick={del.bind(this, text)}>删除</a>
                </Space>
            ),
        },
    ];

    
    /* 状态定义 */
    let [data, setDate] = useState([]);
    let [total, setTotal] = useState(0);
    let [current, setCurrent] = useState(1);
    let [pageNum ,setPageNum] = useState(1);
    let [pageSize, setPageSize] = useState(8);
    let [keyid, setKeyid] = useState(null); // 修改时引入id
    let [keyName, setKeyName] = useState(null); // 查询时记录输入框value
    
    const confirm = Modal.confirm;
    const [isModalVisible, setIsModalVisible] = useState(false); 
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    
    /* 新增后清空选项卡内容 */
    const [form] = Form.useForm();

    /* 修改后清空选项卡内容 */
    const [form2] = Form.useForm();
    window.timer = null;

    /* 组件挂载时才调用 */
    useEffect(() => {
        /* 利用防抖来解决userEffect多次执行的问题 */
        clearTimeout(window.timer);
        window.timer = setTimeout(() => {
            showTable(1, 8);
        }, 0);
    }, [])

    /* 展示 */
    const showTable = (pagenum, pagesize, query) => {
        axios.get('https://lianghj.top:8888/api/private/v1/users', {
            params: {
                pagenum,
                pagesize,  
                query
            },
            headers: {
                Authorization: sessionStorage.token
            }
        })
        // 获取成功结果
        .then(res => {
            let { data: { users, total } } = res.data;
            setTotal(total);
            users.forEach((r, i) => {
                r.key = i;
            })
            setDate(users);
        })
    }

    /* 改变页码和pageSize的回调 */
    const changePageMode = (page,pageSize) => {
        showTable(page, pageSize, keyName);
        setPageSize(pageSize);
        setCurrent(page);
    }


    /* 删除记录的回调 */
    const del = (record) => {
        confirm({
            title:'注意!',
            content:'此操作将永久删除数据,是否继续？',
            okText: '确认',
            cancelText: '取消',
            onOk:() =>{
                axios.delete(`https://lianghj.top:8888/api/private/v1/users/${record.id}`, {
                    headers: {
                    Authorization: sessionStorage.token
                    }
                })
                // 获取成功结果
                .then(res => {
                    let { meta } = res.data;
                        message.success(meta.msg);
                        // 刷新页面
                        if(data.length === 1){
                            setCurrent(current -= 1);
                        }
                        showTable(current, pageSize);
                });
            },
            onCancel:()=>{
                
            }
        })
    }
        

    /* 修改记录的回调 */
    const update = (record) => {
        console.log(record.id);
        setKeyid(record.id)    
        setIsModalVisible2(true);
    }

    const handleOk2 = ({
        // 解构
        mobile,
        email,
     }) => {
        // console.log(keyid);
        axios.put(`https://lianghj.top:8888/api/private/v1/users/${keyid}`, {
            mobile,
            email,
        },           
        {    
            headers: {
                Authorization: sessionStorage.token
            }
        })
        // 获取成功结果
        .then(res => {
            let { meta } = res.data;
            if (meta.status === 200) {
                message.success(meta.msg);
                /* 刷新渲染,并关闭模态框 */
                showTable(current, pageSize);
                setIsModalVisible2(false);
                form2.resetFields();
            } else {
                message.error(meta.msg);
            } 
        })
    };

    /* 点击新增则打开,点击Ok或者取消则关闭*/
    const add = () => {
        setIsModalVisible(true);
    }
    const handleOk = ({
        // 解构
        username,
        password,
        mobile,
        email
     }) => {
        axios.post(`https://lianghj.top:8888/api/private/v1/users`, {
            username,
            password,
            mobile,
            email,
        },           
        {    
            headers: {
                Authorization: sessionStorage.token
            }
        })
        // 获取成功结果
        .then(res => {
            let { meta } = res.data;
            if (meta.status === 201) {
                message.success(meta.msg);
                /* 刷新渲染,并关闭模态框 */
                showTable(current, pageSize);
                setIsModalVisible(false);
                form.resetFields();
            } else {
                message.error(meta.msg);
            } 
        })
    };
    /* 取消新增的对话框 */
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    /* 取消修改的对话框 */
    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };

    /* 增改失败时提示 */
    const onFinishFailed = () => {
        message.error('校验失败,请重试')
    };

    

    /* 查询记录的回调 */
    const query = () => {
        console.log(keyName);
        setCurrent(1);
        showTable(1,pageSize,keyName)
        console.log(data);
                  
    }

    /* 记录对话框value */
    const change = (record)=>{       
        setKeyName(record.target.value); 
    }

    return (
        <div className='users'>
            <Input onChange={change} style={{width:'200px',marginRight: '10px'}}/>
            <Button type="primary" onClick={query} style={{ marginBottom: '20px' }}>查询</Button>
            <Button type="primary" onClick={add} style={{ marginBottom: '10px', marginLeft: '10px' }}>新增</Button>
            <Table columns={columns} dataSource={data} pagination={false} style={{ marginBottom: '20px' }}/>
            <Pagination
                style={{ marginTop: '10px' }}
                current={current} // 高亮当前页数
                pageSize={pageSize} // 每页条数
                defaultPageSize={8}
                pageSizeOptions={[
                    3, 5, 8, 12,20  // 指定每页显示数目
                ]}
                total={total}   // 记录总数
                showSizeChanger // 显示页数选择
                showQuickJumper // 显示跳转选择
                onChange={changePageMode} // page和pageSize改变的回调
                
                showTotal={total => `共 ${total} 项`}
            />

            {/* 新建用户信息 */}
            <Modal title="新建表单" footer={null} visible={isModalVisible} onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleOk}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密&nbsp;&nbsp;&nbsp;码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="手机号"
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your mobile!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 10,
                                span: 16,
                            }}
                            
                        >
                            <Button type="primary" htmlType="submit" style={{marginRight:'10px'}}>
                                确定
                            </Button>
                            <Button type="primary"  onClick={handleCancel}>
                                取消
                            </Button>
                        </Form.Item>
                </Form>
            </Modal>

            {/* 修改用户信息 */}
            <Modal title="修改信息" footer={null} visible={isModalVisible2} onCancel={handleCancel2}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleOk2}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form2}
                >
                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="手机号"
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your mobile!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 10,
                                span: 16,
                            }}
                            
                        >
                            <Button type="primary" htmlType="submit" style={{marginRight:'10px'}}>
                                确定
                            </Button>
                            <Button type="primary" onClick={handleCancel2}>
                                取消
                            </Button>
                        </Form.Item>
                </Form>
            </Modal>
        </div>
    )

};

export default Users