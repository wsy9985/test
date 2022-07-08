import React, { Component } from 'react'
import logo from '../../img/1.webp'
import './index.css'
export default class Home extends Component {
    render() {
        return (
            <div className='showHome'>
                <img src={logo} alt="logo" />
                <h1>欢迎来到阿巴阿巴苦逼程序猿管理后台</h1>
                <h2>在这里，您可以亲身体验当一名BOSS（或是苦逼的电商运营人员），对用户数据进行添加、删除以及查询，</h2>
                <h2>并可以对人员的信息进行修改（仅限邮箱和手机号），权限的设置等操作暂未开启，后续还会引入电商的基本功能，可以查看小店的收入，制定最适合您的商业策略!!!</h2>
                <h6>ps:欢迎下次光临~</h6>
            </div>
        )
    }
}
