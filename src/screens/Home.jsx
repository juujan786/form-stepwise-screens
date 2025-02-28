import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>
        <span>Form with Redux toolkit: </span>
        <span>
          <Link to={"/step/personal_info"}>Redux Toolkit Form</Link>
        </span>
      </div>
      <div>
        <span>Form with Context API: </span>
        <span>
          <Link to={"/context/personal_info"}>Context API Form</Link>
        </span>
      </div>
    </div>
  );
};

export default Home;
