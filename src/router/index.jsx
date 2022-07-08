/* 
    App > List + Edit + Datas
    Login
    Register
*/


import { BrowserRouter } from "react-router-dom";
import MyRoutes from '../pages/Routes'

function BasicRouter() {
  return (
    <BrowserRouter>
      <MyRoutes/>
      {/* {MyRoutes} */}
    </BrowserRouter>
  );
}

export default BasicRouter;


