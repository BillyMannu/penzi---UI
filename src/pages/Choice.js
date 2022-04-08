import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { getFromLocal } from '../util/utils';

function Choice() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const number = getFromLocal('phone_number');

  const [message, setmessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    axios
      .post('http://localhost:5000/penzi', { number, message })
      .then((res) => {
        setData(res.data);

        navigate('/Describe');
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

  console.log(message);
  console.log(error);

  return (
    <form className='card' onSubmit={handleSubmit}>
      <div>
        <label htmlFor='Number'>Number:</label>
        <input
          type='text'
          name='Number'
          id='Number'
          placeholder='Write the number of the date you prefered here'
          required
          onChange={(e) => {
            setmessage(e.target.value);
          }}
        />
      </div>
      <button
        type='button'
        className='btn'
        id='previous'
        onClick={(event) => navigate('/Match')}
      >
        Previous
      </button>
      <button type='submit' className='btn' id='submit'>
        Submit
      </button>
     
      
    </form>
  );
}
export default Choice;
