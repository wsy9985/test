import "./ListT.css";
import { List, Skeleton, Pagination, Button, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { ArticleListApi, ArticleDelApi } from "../../request/api";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ListT = () => {
  const navigate = useNavigate();
  const confirm = Modal.confirm;
  const [update, setUpdate] = useState(1)
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getList = (num) => {
    ArticleListApi({
      num,
      count: pageSize,
    }).then((res) => {
      if (res.errCode === 0) {
        let { arr, total, num, count } = res.data;
        setList(arr);
        setTotal(total);
        setCurrent(num);
        setPageSize(count);
      }
    });
  };

  // 请求列表数据
  useEffect(() => {
    getList(current);
  }, []);

  // 模拟componentDidUpdate
  useEffect(() => {
    getList(current)
  }, [update])

  // 分页
  const onChange = (pages) => {
    getList(pages);
  };

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
            setUpdate(update+1)
          }
        });
      },
      onCancel:()=>{}
    });
  };

  return (
    <div className="List_table" style={{ padding: 15 }}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => {
          return (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  onClick={() => navigate("/app/edit" + item.id)}
                >
                  编辑
                </Button>,
                <Button type="danger" onClick={() => delFn(item.id)}>
                  删除
                </Button>,
              ]}
            >
              <Skeleton loading={false}>
                <List.Item.Meta
                  title={
                    <a
                      href={"http://codesohigh.com:8765/article/" + item.id}
                      target="_blank"
                    >
                      {item.title}
                    </a>
                  }
                  description={item.subTitle}
                />
                <div>{moment(item.date).format("YYYY-MM-DD hh:mm:ss")}</div>
              </Skeleton>
            </List.Item>
          );
        }}
      />
      <Pagination
        style={{ float: "right", marginTop: "20px" }}
        onChange={onChange}
        total={total}
        current={current}
        pageSize={pageSize}
      />
    </div>
  );
};

export default ListT;
