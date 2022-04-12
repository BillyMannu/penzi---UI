import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { storeLocal } from "../util/utils";

function Page1() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const endpoint_api = process.env.REACT_APP_endpoint_api;

  const [postObj0, setPostObj0] = useState({});
  const navigate = useNavigate();

  const createAccount = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(endpoint_api, postObj0)
      .then((res) => {
        setData(res.data);
        try {
          navigate("/createAccount");
          //   alert("Number received, proceed to register");
        } catch (e) {
          console.log(e);
          alert("Sorry,Could not process your data");
        }
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(postObj0);

  if (error) return <div>Error!</div>;
  if (loading) return <div>Loading... </div>;

  const signIn = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(endpoint_api, postObj0)
      .then((res) => {
        setData(res.data);
        try {
          navigate("/signIn");
          //   alert("Number received, proceed to register");
        } catch (e) {
          console.log(e);
          alert("Sorry,Could not process your data");
        }
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(postObj0);

  if (error) return <div>Error!</div>;
  if (loading) return <div>Loading... </div>;

  const homePage = (event) => {
    const { name, value } = event.target;
    setPostObj0((prevHomePage) => {
      return {
        ...prevHomePage,
        [name]: value,
      };
    });
  };
  return (
    <div>
      <div>
        <div className="page1" id="page1">
          <p>Hello World</p>
          <form>
            <div>
              <button
                type="button"
                className="btn"
                id="createAccount"
                onClick={createAccount}
              >
                CREATE ACCOUNT
              </button>
            </div>
            <div>
              <button
                type="button"
                className="btn"
                id="signIn"
                onClick={signIn}
              >
                SIGN IN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Page1;
