import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  HomeOutlined,
  LaptopOutlined,
  UserOutlined,
  EditOutlined,
  MailOutlined,
  BarsOutlined,
  ReadOutlined,
  ApartmentOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "../Sider/index.css";

const { subMenu } = Menu;

const items = [
  getItem("首页", "app/home", <HomeOutlined />),
  getItem("文章总览", "app/list", <ReadOutlined />),
  getItem("文章总览", "app/listT", <ReadOutlined />),
  getItem("编辑文章", "app/edit", <EditOutlined />),
  getItem("用户管理", "app/users", <UserOutlined />),
  getItem("电商管理", "app/datas", <LaptopOutlined />, [
    getItem("品类管理", "app/datas/category", <ApartmentOutlined />),
    getItem("商品管理", "app/datas/goods", <BarsOutlined />),
  ]),
  getItem("设置", "app/setting", <SettingOutlined />, [
    getItem("修改资料", "app/setting/modify"),
    getItem("切换账号", "app/setting/exchange"),
  ]),
];

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export default function Sider() {
    const foldArr = [];
    let keyNum = 0
    const navigate = useNavigate();
    const location = useLocation();
    const [defaultKey, setDefaultKey] = useState("");
    const [openKeys, setOpenKeys] = useState([]);
    // const [openKey, setOpenKey] = useState([]);
    const [defaultSubKey, setDefaultSubKey] = useState("app/datas/category");

  // componentDidMount
  useEffect(() => {
    // console.log(items);
    let path = location.pathname;
    // 获取三级路由key值
    let key0 = path.split("/")[3];
    // 获取二级路由key值
    let key = path.split("/")[2];
    // 获取一级路由key值
    let key1 = path.split("/")[1];
    if (key && !key0) {
      // 利用正则表达式保障路径
      setDefaultKey("app/" + key.replace(/[^a-zA-Z]/g,''));
      // setDefaultKey("app/" + key);
      // setOpenKeys("app/" + key)
    } else if (key1 + "" === "app" && !key) {
      setDefaultKey("app/home");
    }
    if (key0) {
        // console.log(key0);
        if( key === 'datas'){
            console.log(key + '');
            items[5].children.forEach((item,i)=>{
                foldArr[i] = item.key
                console.log(foldArr);
            })  
        }
        setDefaultKey("app/" +key +'/' + key0);
        setDefaultSubKey("app/"+key +'/' + key0);
     }   


    if(location.pathname === '/app/datas/category'){
        setOpenKeys(foldArr[0]);
        // onOpenChange(foldArr[0])
        // setDefaultKey('app/datas')
    }else if(location.pathname === '/app/datas/goods'){
        setOpenKeys(foldArr[1] );
        // onOpenChange(foldArr[1])
        // setDefaultKey('app/datas')
    }
  }, [location.pathname]);


  const handleClick = (e) => {
    navigate("/" + e.key);
    setDefaultKey(e.key);
  };

  const onOpenChange = (openKeysIn) => {
    setOpenKeys(openKeysIn );
   
  };

  return (
    <div className="sider_set">
      <Menu
        onClick={handleClick}
        style={{ width: 256, height: "100%", width: "200px" }}
        selectedKeys={[defaultKey]}
        // selectopenkeys={[defaultSubKey]}
        mode="inline"
        items={items}
        onOpenChange={onOpenChange}
        openKeys = {openKeys}
      />
    </div>
  );
}
