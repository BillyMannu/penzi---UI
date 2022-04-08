import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { storeLocal } from "../util/utils";

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

        navigate("/Login");
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
  console.log(endpoint_api)


  if (error) return <div>Error!</div>;
  if (loading) return <div>Loading... </div>;

  const handleHomeData = (event) => {
    const { name, value } = event.target;
    setPostObj((prevHomeData) => {
      return {
        ...prevHomeData,
        [name]: value,
      };
    });
  };
  return (
    <div className="main">
      <div>
        <div className="card">
          <h2>Let's start registration</h2>
          <form className="card" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="number">Number</label>
              <input
                type="text"
                name="number"
                id="number"
                placeholder="07xx xxx xxx"
                required
                onChange={handleHomeData}
              />
            </div>
            <div className="button">
              <button
                type="submit"
                className="btn"
                id="submit"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Home;
