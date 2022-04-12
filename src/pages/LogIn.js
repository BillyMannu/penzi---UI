import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { storeLocal } from "../util/utils";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const endpoint_api = process.env.REACT_APP_endpoint_api;

  const [postObj, setPostObj] = useState({
    message: "penzi",
    number: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(endpoint_api, postObj)
      .then((res) => {
        setData(res.data);
        try {
          navigate("/Registration");
          alert("Number received, proceed to register");
        } catch (e) {
          console.log(e);
          alert("Sorry,Could not process your data");
        }

        storeLocal("phone_number", postObj.number);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(postObj);

  if (error) return <div>Error!</div>;
  if (loading) return <div>Loading... </div>;

  const handleLogInData = (event) => {
    const { name, value } = event.target;
    setPostObj((prevHomeData) => {
      return {
        ...prevHomeData,
        [name]: value,
      };
    });
  };
  return (
    <div>
      <div>
        <input
          type="text"
          value={usename}
          placeholder="Username"
          id="username"
          required
          onChange={handleLogInData}
        />
      </div>
      <div>
        <input
          type="text"
          value={password}
          placeholder="password"
          id="password"
          required
          onChange={handleLogInData}
        />
      </div>
    </div>
  );
}
export default Home;
