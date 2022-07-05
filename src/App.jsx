import React from 'react'
import { Button,Layout } from 'antd';
import { Outlet } from 'react-router-dom'
import Header from '../src/components/Header'
import Sider from '../src/components/Sider'
import Bread  from './components/Bread';

const { Content,Footer } = Layout;
export default function App() {
  return (
    <div>
      <Layout className='app_lay'>
        <Header/>
        <div className='container'>
          <Sider/>
          <Layout>
          <Content  style={{boxSizing:'border-box',
            padding:'15px 40px',display:'flex',flexDirection:'column',
            height:"calc(100vh - 102px)"
          }}
          >
            <Bread />
            <div className='container_content'>
              <Outlet />
            </div>
          </Content>
          <footer>Respect | Copyright &copy; 2022 Author siyuanWu  </footer>
         </Layout>  
        </div>
      </Layout>
      
    </div>
  )
}
