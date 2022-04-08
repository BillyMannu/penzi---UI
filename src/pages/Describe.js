import React, { useState } from 'react';
import '../index.css';
import axios from 'axios';
import { getFromLocal } from '../util/utils';
import { useNavigate } from 'react-router-dom';

function Describe() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const number = getFromLocal('phone_number');
  const navigate = useNavigate();

  const [postObj5, setPostObj5] = useState({
    keyword: 'describe',
    tel_number: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    let message = Object.values(postObj5).join('');

    axios
      .post('http://localhost:5000/penzi', { number, message })
      .then((res) => {
        setData(res.data);
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

  const handleDescribeData = (event) => {
    const { value } = event.target;
    setPostObj5(value);
  };

  return (
    <form className='card' onSubmit={handleSubmit}>
      <div>
        <h2>Description:</h2>
      </div>
      <div>
        <label htmlFor='telNumber'>
          Enter phone number of the date you picked
        </label>
        <input
          id='telNumber'
          type='text'
          name='telNumber'
          value={postObj5.tel_number}
          placeholder='telNumber'
          required
          onChange={handleDescribeData}
        />
      </div>

      <button
        type='button'
        className='btn'
        id='previous'
        onClick={(event) => navigate('/Choice')}
      >
        Previous
      </button>
      <button className='btn' id='submit'>
        <span>Submit</span>
      </button>
      <button
        type='button'
        className='btn'
        id='ToHomePage'
        onClick={(event) => navigate('/')}
      >
        To Home Page
      </button>
    </form>
  );
}
export default Describe;
