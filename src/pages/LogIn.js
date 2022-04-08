import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { getFromLocal } from "../util/utils";

function LogIn() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  
  const endpoint_api = process.env.REACT_APP_endpoint_api;
  const number = getFromLocal("phone_number");

  const [postObj1, setPostObj1] = useState({
    keyword: "start",
    name: "",
    sex: "",
    dateOfBirth: "",
    province: "",
    town: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    let message = Object.values(postObj1).join("#");

    axios
      .post(endpoint_api, { number, message })
      .then((res) => {
        // data = res.stringify(data);
        console.log(res);
        setData(res.data);

        // window.location.href = './Specifics';
        navigate("/specifics");
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(postObj1);

  if (error) return <div>Error!</div>;
  if (loading) return <div>Loading ...</div>;

  const handleLoginData = (event) => {
    const { name, value } = event.target;
    setPostObj1((prevLoginState) => {
      return {
        ...prevLoginState,
        [name]: value,
      };
    });
  };
  return (
    <form className="card" onSubmit={handleSubmit}>
      <div>
        <h2>Enter Your Credentials below</h2>
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={postObj1.name}
          placeholder="Name"
          required
          onChange={handleLoginData}
        />
      </div>
      <label htmlFor="sex">Pick your gender:</label>
      <select name="sex" id="choice" required onChange={handleLoginData}>
        <option value="" disabled selected hidden>
          Gender
        </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="PreferNotToSay">Prefer Not To Say</option>
      </select>

      <div>
        <label htmlFor="date">Date of birth</label>
        <input
          name="dateOfBirth"
          value={postObj1.dateOfBirth}
          type="date"
          min="1942-01-01"
          max="2004-12-31"
          onChange={handleLoginData}
        />
      </div>

      <div>
        <label htmlFor="choice">Province:</label>
        <select
          id="choice"
          name="province"
          onChange={handleLoginData}
          value={postObj1.province}
        >
          <option value="" disabled selected hidden>
            Province
          </option>
          <option value="Nairobi">Nairobi</option>
          <option value="Nyanza">Nyanza</option>
          <option value="Central">Central</option>
          <option value="Western">Western</option>
          <option value="Coast">Coast</option>
          <option value="Eastern">Eastern</option>
          <option value="Rift Valley">Rift Valley</option>
          <option value="North Eastern">North Eastern</option>
        </select>
      </div>

      <div>
        <label htmlFor="town">Town:</label>
        <input
          type="text"
          name="town"
          id="town"
          placeholder="Town"
          value={postObj1.town}
          required
          onChange={handleLoginData}
        />
      </div>
      <button
        type="button"
        className="btn"
        id="previous"
        onClick={(event) => (window.location.href = "./")}
      >
        Previous
      </button>
      <button type="submit" className="btn" id="submit" onSubmit={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default LogIn;
