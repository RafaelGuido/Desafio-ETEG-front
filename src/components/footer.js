import React from "react";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>CONTATO</h4>
            <ui className="list-unstyled">
                <li>(61)98275-0493</li>
                <li>rafatocco7@gmail.com</li>
                <li>https://www.linkedin.com/in/rafaeltoccolini/</li>
            </ui>
          </div>
          
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Rafael Toccolini | All rights reserved | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;