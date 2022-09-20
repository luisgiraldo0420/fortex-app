import "./AdminLayout.scss";
import { TopMenu } from '../TopMenu';
import {LoginAdmin} from "../pages/Login/index";
import { useAuth } from "../hooks/useAuth";
//import { SideMenu } from "../SideMenu";


export default function AdminLayout(props: any) {
    const { children } = props;  
    const {auth} = useAuth();
    

    if (!auth) return <LoginAdmin />;
  return (
    <div className="admin-layout">
      <div className="admin-layout__menu">
        <TopMenu />
      </div>
      <div className="admin-layout__main-content-children">
        {children}
      </div>
    </div>
    
  );
}
