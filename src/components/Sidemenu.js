import "./sidemenustyles.css";
import { Link } from "react-router-dom";

export default function Sidemenu (){
    return (
        <div class="floating-element">
            <div class="child-top child-top-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="26" viewBox="0 0 22 26" fill="none">
                <path d="M11.063 0.571106L0.5 8.85705V25.4289H7.10187V15.762H15.0241V25.4289H21.626V8.85705L11.063 0.571106Z" fill="white"/>
                </svg>
                <Link to="/">
                    <p className="home">Home</p>
                </Link>
                
            </div>
            <Link to="/service_manager">
                <div class="child-div view">
                    <p className="bar">Create</p>
                </div>
            </Link>
            
            <Link to="/service_manager/delete">
                <div class="child-div create">
                    <p className="bar">Delete</p>
                </div>
            </Link>
            
        </div>
    );
}