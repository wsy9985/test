import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { GetUsersDataApi, ChangeUsersDataApi } from "../../../request/api";
import "./modify.css";

// 转换图片地址的方法
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export default function Modify() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [userName, setUserName] = React.useState("");
  const [passWord, setPassWord] = React.useState("");

  useEffect(() => {
    // 获取用户名和密码
    GetUsersDataApi().then((res) => {
      if (res.errCode === 0) {
        // sessionStorage.setItem("username", res.data.username);
        setPassWord(res.data.password);
        setUserName(res.data.username);
      }
    });
  }, []);

  // 表单提交后的回调
  const onFinish = (values) => {
    const { password, newpassword } = values;
    if (password === passWord) {
      if (newpassword && newpassword.trim() !== "") {
        console.log("right");
        ChangeUsersDataApi({
          password: newpassword,
        }).then((res) => {
          // message.success('密码修改成功,请重新登录')
          message.success(res.message);
          setTimeout(() => navigate("/login"), 1500);
        });
      } else {
        message.error("密码不能为空");
      }
    } else {
      message.error("密码错误,请重试");
    }
  };

  // 限制图片大小只能是200KB
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/webp";
    if (!isJpgOrPng) {
      message.error("图片格式仅限 JPG/PNG/WEBP !");
    }
    const isLt200KB = file.size / 1024  < 200; // file.size默认为B
    if (!isLt200KB) {
      message.error("图片大小必须小于 200 KB !");
    }
    return isJpgOrPng && isLt200KB;
  };

  // 点击上传图片
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // console.log(info.file.response.data.filePath);
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        // 存储图片名
        localStorage.setItem('avatar',info.file.response.data.filePath)
        window.location.reload()
      });
    }
  };

  // 上传按钮
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div className="means">
      <div className="password_change">密码修改</div>
      <Form
        name="basic"
        style={{ width: "400px" }}
        onFinish={onFinish}
        autoComplete="off"
      >
        {/* <Form.Item
          label="修改用户名"
          name="username"
          
        >
          <Input placeholder="请输入新用户名"/>
        </Form.Item> */}

        <Form.Item label="初 始 密 码" name="password">
          <Input.Password placeholder="请输入原密码" />
        </Form.Item>

        <Form.Item label="修 改 密 码 " name="newpassword">
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
          <Button type="primary" htmlType="submit" style={{ width: "40%" }}>
            确认修改
          </Button>
        </Form.Item>
      </Form>
      <Upload
        name="avatar" // 与后端协约一致,不需要在api里做配置
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false} // 选择多图 or 单图 ? true : false
        action="/api/upload" /* 后端接口(配置代理)*/
        // action="http://47.93.114.103:6688/manage/upload" /* 后端接口(直接引入,会导致跨域问题) */
        beforeUpload={beforeUpload} // 上传前的方法
        onChange={handleChange} // 点击后的回调
        headers={{"cms-token":localStorage.getItem('cms-token')}}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
}
