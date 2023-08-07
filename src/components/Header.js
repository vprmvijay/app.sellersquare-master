import "./headerstyles.css";
import logo from "../resources/sellersquarelogo.png";
import user from "../resources/Vector.png";

function Header(){
    return (
        <div className="header">
            <div className="Group-left">
                <img id="pagelogo" src={logo} alt="sellersquare_logo"/>
                <span id="brand">sellersquare</span>
            </div>
            <div className="Group-right">
                <img id="notificatoin_icon" src={user} alt="bell-icon"/>
                <img id="profile_picture" src={logo} alt="user pic" />
            </div>
        </div>
    );
}

export default Header;