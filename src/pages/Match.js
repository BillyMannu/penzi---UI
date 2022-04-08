import axios from 'axios';
import React, { useState } from 'react';
import '../index.css';
import { getFromLocal } from '../util/utils';
import { storeLocal } from '../util/utils';
import { useNavigate } from 'react-router-dom';

function Match() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const number = getFromLocal('phone_number');
  const endpoint_api = process.env.REACT_APP_endpoint_api;
  const navigate = useNavigate();

  const [postObj4, setpostObj4] = useState({
    keyword: 'match',
    upperAge: '',
    lowerAge: '',
    town: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    let range = [postObj4.lowerAge, postObj4.upperAge].join('-');

    let message = [postObj4.keyword, range, postObj4.town].join('#');

    console.log(message);
    axios
      .post(endpoint_api, { number, message })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        // window.location.href = './Choice';
        navigate('/choice');
        // storeLocal("upper_age", postObj4.upperAge);
        // storeLocal("lower_age", postObj4.lowerAge);
        // storeLocal("town", postObj4.town);
        storeLocal('SmS', message);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>Error!</div>;

  console.log(postObj4);
  console.log(error);
  const handleMatchData = (event) => {
    const { name, value } = event.target;
    setpostObj4((prevMatchData) => {
      return {
        ...prevMatchData,
        [name]: value,
      };
    });
  };

  return (
    <form className='card' onSubmit={handleSubmit}>
      <div>
        <h2>Input preference for your date</h2>
      </div>
      <div>
        <label htmlFor='prefTown'>Town:</label>
        <input
          type='text'
          name='town'
          value={postObj4.town}
          id='prefTown'
          placeholder='Pick your town of preference'
          required
          onChange={handleMatchData}
        />
      </div>
      <div>
        <label htmlFor='lowerAge'>Lower age</label>
        <input
          type='number'
          name='lowerAge'
          value={postObj4.lowerAge}
          id='lowerAge'
          min={18}
          max={99}
          placeholder='not younger than:'
          required
          onChange={handleMatchData}
        />
      </div>
      <div>
        <label htmlFor='upperAge'>upper age</label>
        <input
          type='number'
          name='upperAge'
          value={postObj4.upperAge}
          id='upperAge'
          min={18}
          max={99}
          placeholder='not older than:'
          required
          onChange={handleMatchData}
        />
      </div>
      <button
        type='button'
        className='btn'
        id='previous'
        onClick={(event) => (window.location.href = './Specifics')}
      >
        Previous
      </button>
      <button type='submit' className='btn' id='submit'>
        Submit
      </button>
      {/* <button type="button" className="btn" id="next"
       onClick={event => window.location.href= './Match'}>
                  Next
                </button> */}
      ;
    </form>
  );
}
export default Match;
