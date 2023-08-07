import "./cardstyles.css";
import { Link } from "react-router-dom";

function Card(props){
    return (
    <Link to={props.link} className="container">
        <div className="icon-container">
        <img src={props.icon} alt={props.text} />
        </div>
        <div className="text-wrapper">
            <p className="centered-text">{props.text}</p>
        </div>
    </Link>
    );
}

export default Card ;