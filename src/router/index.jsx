/* 
    App > List + Edit + Datas
    Login
    Register
    add
*/


import { BrowserRouter } from "react-router-dom";
import MyRoutes from '../pages/Routes'

function BasicRouter() {
  return (
    <BrowserRouter>
      <MyRoutes/>
    </BrowserRouter>
  );
}

export default BasicRouter;


