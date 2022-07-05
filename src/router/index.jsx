/* 
    App > List + Edit + Datas
    Login
    Register
*/

import App from '../App'
import Home from '../pages/Home'
import List from '../pages/List/List'
import ListT from '../pages/List/List2'
import Edit from '../pages/Edit/Edit'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Users from '../pages/Users/users'

import Category from '../pages/Datas/Category/category'
import Goods from '../pages/Datas/Goods/goods'

import Exchange from '../pages/Setting/Exchange/exchange'
import Modify from '../pages/Setting/Modify/modify'
import {BrowserRouter , Routes , Route,Navigate} from 'react-router-dom'

const BasicRouter = () =>(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/app' element={<App/>}>
                <Route path="" element={<Home/>} />
                <Route path="/app/home" element={<Home/>} />
                <Route path='/app/list' element={<List/>}/>
                <Route path='/app/listT' element={<ListT/>}/>
                <Route path='/app/edit' element={<Edit/>}/>
                <Route path='/app/edit:id' element={<Edit/>}/>
                <Route path='/app/users' element={<Users/>}/>
                <Route path='/app/datas' >
                    <Route path="" element={<Category/>} />
                    <Route path="/app/datas/category" element={<Category/>} />
                    <Route path="/app/datas/goods" element={<Goods/>} />
                    <Route path="*" element={<Navigate to='category'/>} />
                </Route>
                <Route path='/app/setting' >
                    <Route path="" element={<Category/>} />
                    <Route path="/app/setting/modify" element={<Modify/>} />
                    <Route path="/app/setting/exchange" element={<Exchange/>} />
                    <Route path="*" element={<Navigate to='modify'/>} />
                </Route>
            </Route>
            <Route path='/register' element={<Register/>}></Route>
            {/* <Route path='*' element={<Navigate to='login'/>}></Route> */}
        </Routes>
    </BrowserRouter>
)

export default BasicRouter