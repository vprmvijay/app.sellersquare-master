import React, { useState, useEffect } from "react";
import "./sidemenustyles.css";
import { Link } from "react-router-dom";

export default function Sidemenu() {
  const [propsCheckbox, setPropsCheckbox] = useState(
    JSON.parse(localStorage.getItem("propsCheckbox")) || false
  );
  const [backdropsCheckbox, setBackdropsCheckbox] = useState(
    JSON.parse(localStorage.getItem("backdropsCheckbox")) || false
  );

  useEffect(() => {
    localStorage.setItem("propsCheckbox", JSON.stringify(propsCheckbox));
  }, [propsCheckbox]);

  useEffect(() => {
    localStorage.setItem(
      "backdropsCheckbox",
      JSON.stringify(backdropsCheckbox)
    );
  }, [backdropsCheckbox]);

  return (
    <div className="floating-element">
      <div className="child-top child-top-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="26"
          viewBox="0 0 22 26"
          fill="none"
        >
          <path
            d="M11.063 0.571106L0.5 8.85705V25.4289H7.10187V15.762H15.0241V25.4289H21.626V8.85705L11.063 0.571106Z"
            fill="white"
          />
        </svg>
        <Link to="/">
          <p className="home">Home</p>
        </Link>
      </div>
      <div class="child-div view">
        <p>Entry</p>
      </div>
      <Link to="/props_manager">
        <div
          className={`child-div create ${
            propsCheckbox ? "selected" : ""
          }`}
        >
          <label>
            <input
              type="checkbox"
              className="props-checkbox"
              checked={propsCheckbox}
              onChange={(e) => setPropsCheckbox(e.target.checked)}
            />
            Props
          </label>
        </div>
      </Link>

      <Link to="/props_manager/backdrops">
        <div
          className={`child-div create ${
            backdropsCheckbox ? "selected" : ""
          }`}
        >
          <label>
            <input
              type="checkbox"
              className="backdrops-checkbox"
              checked={backdropsCheckbox}
              onChange={(e) => setBackdropsCheckbox(e.target.checked)}
            />
            Backdrops
          </label>
        </div>
      </Link>
      <div class="child-div view">
  <p>View</p>
</div>
<Link to="/props_manager/view">
  <div class="child-div create">
    <label>
      <input type="checkbox" className="props-checkbox" />
      Props
    </label>
  </div>
</Link>

<Link to="/props_manager/backdrops">
  <div class="child-div create">
    <label>
      <input type="checkbox" className="backdrops-checkbox" />
      Backdrops
    </label>
  </div>
</Link>
</div>
    
  );
}



