import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  PageHeader,
  Form,
  Input,
  message,
} from "antd";
import moment from "moment";
import "@wangeditor/editor/dist/css/style.css";
import { ArticleAddApi, ArticleSearchApi, ArticleUpdateApi } from "../../request/api";
import { useParams,useNavigate } from "react-router-dom";

import { Editor, Toolbar } from "@wangeditor/editor-for-react";

function Edit() {
  const [form] = Form.useForm();
  const [title,setTitle] = useState("")
  const [subTitle,setSubTitle] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editor, setEditor] = useState(null); // 存储 editor 实例
  const [html, setHtml] = useState(""); /* <p>hello</p> */
  const params = useParams();
  const navigate = useNavigate()

  const toolbarConfig = {};
  const editorConfig = {
    placeholder: "请输入内容...",
  };

  // 及时销毁 editor
  useEffect(() => {
    if (params.id) {
      ArticleSearchApi({ id: params.id }).then((res) => {
        if (res.errCode === 0) {
          let { title, subTitle, content } = res.data;
          console.log(content);
          setHtml(content);
          setTitle(title);
          setSubTitle(subTitle);
        }
      });
    }
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);


  const showModal = () => setIsModalVisible(true);
  const handleOk = () => {
    form
      // 校验字段
      .validateFields()
      .then((values) => {
        // form.resetFields();
        let {title,subTitle} = values
        // 发送请求
        if(params.id){
          ArticleUpdateApi({title,subTitle,content:html,id:params.id}).then(res=>{
            setIsModalVisible(false);
            if(res.errCode === 0)
           {
              message.success(res.message)
              setTimeout(() => {
                // 编辑完成返回上一页
                navigate(window.history.back())
              }, 1500);
            }else{
              message.error(res.message)
            }
          })
        }else{
          ArticleAddApi({title,subTitle,content:html}).then(res=>{
            setIsModalVisible(false);
            if(res.errCode === 0){
              message.success(res.message)
              setTimeout(() => {
                // 编辑完成返回上一页
                navigate('/app/list')
              }, 1500);
            }else{
              message.error(res.message)
            }
          })
        }
      })
      .catch(() => false);
  };


  return (
    <div >
      <PageHeader
        ghost={false}
        onBack={params.id ? () => window.history.back() : null}
        title="编辑文章"
        subTitle={"当前时间 :  " + moment(new Date()).format("LLLL")}
        extra={[
          <Button key="1" type="primary" onClick={showModal}>
            文章提交
          </Button>,
        ]}
      ></PageHeader>
      <div style={{ border: "1px solid #ccc", backgroundColor: "white" }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc", paddingLeft: "5px" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => {
            return (
            setHtml(editor.getHtml())
            )}
          }
          mode="default"
          style={{ height: "500px" }}
        />
      </div>

      <Modal
        title="请填写文章标题"
        visible={isModalVisible}
        onOk={handleOk}
        okText="提交" 
        cancelText="取消"
        onCancel={() => setIsModalVisible(false)}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4}}
          wrapperCol={{ span: 20}}
          autoComplete="off"
          initialValues={{title,subTitle}}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true,message: "请填写标题"}]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="副标题" name="subTitle">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Edit;
