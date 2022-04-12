import React, { useState } from 'react';
import '../index.css';
import axios from 'axios';
import { getFromLocal } from '../util/utils';
import { useNavigate } from 'react-router-dom';

function Specifics() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const number = getFromLocal('phone_number');
  const endpoint_api = process.env.REACT_APP_endpoint_api;

  const [postObj2, setPostObj2] = useState({
    keyword: 'details',
    levelOfEducation: '',
    profession: '',
    religion: '',
    tribe: '',
  });

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    let message = Object.values(postObj2).join('#');

    axios
      .post(endpoint_api, { number, message })
      .then((res) => {
        setData(res.data);
        navigate('/Myself');
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

  const handleSpecificsData = (event) => {
    const { name, value } = event.target;
    setPostObj2((prevSpecificsState) => {
      return {
        ...prevSpecificsState,
        [name]: value,
      };
    });
  };

  return (
    <form className='card' onSubmit={handleSubmit}>
      <div>
        <h2>Tell us more about yourself</h2>
      </div>
      <div>
        <label htmlFor='levelOfEducation'>Level of education:</label>
        <input
          type='text'
          name='levelOfEducation'
          value={postObj2.levelOfEducation}
          id='levelOfEducation'
          placeholder='levelOfEducation'
          required
          onChange={handleSpecificsData}
        />
      </div>
      <div>
        <label htmlFor='profession'>profession:</label>
        <input
          type='text'
          name='profession'
          id='profession'
          value={postObj2.profession}
          placeholder='profession'
          required
          onChange={handleSpecificsData}
        />
      </div>
      <div>
        <label htmlFor='religion'>Religion:</label>
        <input
          type='text'
          name='religion'
          value={postObj2.religion}
          id='religion'
          placeholder='religion'
          onChange={handleSpecificsData}
        />
      </div>
      <div>
        <label htmlFor='tribe'>Tribe:</label>
        <input
          type='text'
          name='tribe'
          value={postObj2.tribe}
          id='tribe'
          placeholder='tribe'
          onChange={handleSpecificsData}
        />
      </div>
      <button
        type='button'
        className='btn'
        id='previous'
        onClick={(event) => navigate('/Registration')}
      >
        Previous
      </button>
      <button type='submit' className='btn' id='submit'>
        Submit
      </button>
      
    </form>
  );
}
export default Specifics;
