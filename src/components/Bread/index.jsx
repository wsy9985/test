import React, {useState , useEffect}from 'react'
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';

export default function Bread() {
    const {pathname} = useLocation();
    const [breadName,setBreadName] = useState('')

    // 不是在组件加载时去获取路径,而是路径一旦发生变化,才获取对应路径名称
    useEffect(()=>{
        switch(pathname){
            case '/app':
                setBreadName('首页');
                break;
            case '/app/home':
                setBreadName('首页');
                break;
            case '/app/list':
                setBreadName('查看文章列表(Table)');
                break;
            case '/app/listT':
                setBreadName('查看文章列表(List)');
                break;
            case '/app/edit':
                setBreadName('编辑文章');
                break;
            case '/app/users':
                setBreadName('用户管理');
                break;
            case '/app/datas':
                setBreadName('电商管理');
                break;
            case '/app/datas/category':
                setBreadName('品类管理');
                break;
            case '/app/datas/goods':
                setBreadName('商品管理');
                break;
            case '/app/setting':
                setBreadName('设置');
                break;
            case '/app/setting/modify':
                setBreadName('修改资料');
                break;
            case '/app/setting/exchange':
                setBreadName('切换账号');
                break;
            default:
                setBreadName(pathname.includes('edit')?'文章编辑':'')
                break;
        }
    },[pathname])
    return (
        <Breadcrumb >
            <Breadcrumb.Item href='/app'>
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item >
                <span>{breadName}</span>
            </Breadcrumb.Item>
        </Breadcrumb>
    )
}
