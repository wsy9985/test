import React, {useEffect, useState}from 'react'
import './List.css'
import { Space, Table, Button,Modal,message} from 'antd';
import {ArticleListApi,ArticleDelApi} from '../../request/api'
import moment from 'moment';
import {useNavigate} from 'react-router-dom'

 function MyTitle(props) {
  return (
      <div>
          <a className='table_title' href={'http://codesohigh.com:8765/article/' + props.id} target='_blank' rel="noreferrer">{props.title}</a>
          <p style={{ color: '#999' }}>{props.subTitle}</p>
      </div>
  )
}


export default function List() {
  window.timer = null;
  const confirm = Modal.confirm;
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({current:1,pageSize:10,total:null})
  const [arr,setArr]= useState([]);

  const getArticleList = (current,pageSize) =>{
    ArticleListApi({
      num:current,
      count:pageSize
    }).then(res=>{
      if(res.errCode === 0){
          let {num,count,total} = res.data;
          setPagination({current:num,pageSize:count,total:total})
          // 接收文章数组
          const newArr = res.data.arr ;
          // 声明一个空数组
          let myArr = []
          newArr.map(items =>{
            let obj = {
              key:items.id,
              date:moment(items.date).format('YYYY-MM-DD hh:mm:ss'),
              myTitle:<MyTitle title={items.title} subTitle={items.subTitle} id={items.id}/>
            }
            myArr.push(obj)
          })
          setArr(myArr);
      } 
    })
  }

  // 请求文章列表()
  useEffect(()=>{
    clearTimeout(window.timer);
        window.timer = setTimeout(() => {
          getArticleList(pagination.current,pagination.pageSize)
      }, 0);
  },[])

  const pageChange=(pagination) => {
    console.log(pagination.current);
    getArticleList(pagination.current,pagination.pageSize)
  }

  const delFn = (id) => {
    confirm({
      title: "注意!",
      content: "此操作将永久删除数据,是否继续？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        ArticleDelApi({ id }).then((res) => {
          if (res.errCode === 0) {
            message.success(res.message);
            // 重新刷新页面,要么重新请求这个列表的数据
            // 1.window.reload
            // 2.调用getList()
            // 3.监听变量
            getArticleList(pagination.current,pagination.pageSize)
          }
        });
      },
      onCancel:()=>{}
    });
  };

  const columns = [
    {
      dataIndex: 'myTitle',
      key: 'myTitle',
      width:'60%',
      render:text=><div className='title'>{text}</div>
    },
    {
      dataIndex: 'date',
      key: 'date',
      render:text=><p className='title_text'>{text}</p>
      
    },
    {
      key: 'action',
      render: (text) => {
        return(
          <Space size="middle">
            <Button onClick={()=>navigate('/app/edit'+text.key)} type="primary">编辑</Button>
            <Button type="danger" onClick={() => delFn(text.key)}>删除</Button>
         </Space>
        )
      }
    },
  ];
  return (
    <div className='List_table'>
      <Table 
        showHeader={false} 
        columns={columns} 
        dataSource={arr} 
        onChange={pageChange}
        pagination={pagination}
      />
    </div>
  )
}





