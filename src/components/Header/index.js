import Cookies from "js-cookie";
import {Link, useNavigate} from "react-router-dom" 
import { IoIosLogOut } from "react-icons/io";
import "./index.css"

const Header = () => {

   const navigate = useNavigate();
   const onClickLogoutBtn = () =>{
    Cookies.remove("jwt_token")
    navigate("/login");
   }
    return(
    <nav className="nav-header">
        <div className="nav-content">
            <ul className="nav-menu">
                <li  >
                    <Link className = "nav-link" to="/">Home</Link>
                </li>
                <li>
                <Link className = "nav-link" to="/menu">Menu</Link>
                </li>
                <li>
                <Link className = "nav-link" to="/myorder">My Order</Link>
                </li>
            </ul>
            <button type="button" className="logout-desktop-btn" onClick = {onClickLogoutBtn}>Logout</button>
            <button className="logout-mob-btn" type="button">
            <IoIosLogOut className="logout-icon"/>
            </button>
        </div>
    </nav>

)}

export default Header