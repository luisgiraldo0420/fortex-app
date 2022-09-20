import AdminLayout from '../layouts/AdminLayout';
import Home from '../pages/home';
import {LoginAdmin} from '../pages/Login/index';
import Error404 from '../pages/error404';
const routes = [
  {
    layout: AdminLayout,
    component: Error404
  },

  {
    path: "/",
    layout: AdminLayout,
    component: Home,
    exact: true,
  },
  {
    path: "/login",
    layout: AdminLayout,
    component: LoginAdmin,
    exact: true,
  },
  
];

export default routes;