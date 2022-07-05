import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "./modify.css";
import { GetUsersData } from "../../../request/api";

export default function Modify() {
  

  return (
    <div className="means">
      <Form
        name="basic"
        style={{ width: "400px" }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="修改用户名"
          name="username"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="修 改 密 码"
          name="password"

        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 5,span: 19}}
        >
          <Button type="primary" htmlType="submit" style={{width:'40%'}}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
