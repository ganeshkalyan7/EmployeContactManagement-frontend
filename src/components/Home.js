import React from "react";
import Header from "./Header";

function Home() {
  return (
    <div>
      <Header />
      <div className="home-page">
        <div className="home-dev">
          <h2 id="welcom" className="text-info">
            <b> WELCOME </b>
          </h2>
          <h1>
            {" "}
            <b> This Is List Of Employees Contact Form </b>
          </h1>
          <h4> login to explore the employess</h4>
        </div>
      </div>
    </div>
  );
}

export default Home;
