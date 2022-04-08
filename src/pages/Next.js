import axios from "axios";
import React, { useState } from "react";
import "../index.css";
import { getFromLocal } from "../util/utils";

function Next() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const number = getFromLocal("phone_number");
  const match = getFromLocal("message")

  const [postObj4, setpostObj4] = useState({
    keyword: "Next",
  });

  const getData = () => {
    setLoading(true);
    // let age = Object.values({lowerAge,upperAge}).join('-')
    // console.log(Object.values({lowerAge,upperAge})).join('-')
    // console.log(age)

    //[message.keyword,message.name,message.dateOfBirth].join("#");
    let range = [postObj4.lowerAge, postObj4.upperAge].join("-");
    console.log(range);

    let message = [postObj4.keyword, range, postObj4.town].join("#");

    // let message = Object.values(postObj4).join('#')
    console.log(message);
    axios
      .post("http://localhost:5000/penzi", { number, message })
      .then((res) => {
        setData(res.data);

        window.location.href = "./Choice";
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>Error!</div>;

  console.log(postObj4);
  console.log(error);

  return (
    <div className="card">
      <div>
        <h2>Input preference for your date</h2>
      </div>
      <div>
        <label htmlFor="prefTown">Town:</label>
        <input
          type="text"
          name="  prefTown"
          id="prefTown"
          placeholder="Pick your town of preference"
          required
          onChange={(e) => {
            setpostObj4({
              ...postObj4,
              town: e.target.value,
            });
          }}
        />
      </div>
      
      <button
        type="button"
        className="btn"
        id="previous"
        onClick={(event) => (window.location.href = "./Specifics")}
      >
        Previous
      </button>
      <button type="button" className="btn" id="submit" onClick={getData}>
        <span>Submit</span>
      </button>
      {/* <button type="button" className="btn" id="next"
       onClick={event => window.location.href= './Next'}>
                  Next
                </button> */}
      ;
    </div>
  );
}
export default Next;
