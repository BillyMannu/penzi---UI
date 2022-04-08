import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { getFromLocal } from '../util/utils';

function Myself() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const number = getFromLocal('phone_number');

  const navigate = useNavigate();
  const [postObj3, setPostObj3] = useState({
    keyword: 'myself',
    message: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    let message = Object.values(postObj3).join(' ');
    console.log(message);
    axios
      .post('http://localhost:5000/penzi', { message, number })
      .then((res) => {
        setData(res.data);

        // window.location.href = './Match';
        navigate('/Match');
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

  return (
    <form className='card' onSubmit={handleSubmit}>
      <div>
        <h2>Description</h2>
      </div>
      <div>
        <textarea
          type='text'
          name='myself'
          value={postObj3.message}
          id='myself'
          placeholder='Give a description of yourself'
          onChange={(e) => {
            setPostObj3({ ...postObj3, message: e.target.value });
          }}
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
    </form>
  );
}
export default Myself;
