import "./sectionstyles.css";
import data from "../resources/services.json";
import Card from "./Card";


const services = data.services;


function Section() {
  
    return (
      <div className="grid-container">
        {services.map((service) => (
          <Card
            key={service.index}
            icon={service.icon}
            text={service.iconName}
            link={service.link}
          />
        ))}
      </div>
      
    );
  }

export default Section ;