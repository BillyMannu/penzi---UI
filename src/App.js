import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Layout from './pages/Layout';
import LogIn from './pages/LogIn';
import Specifics from './pages/Specifics';
import Myself from './pages/Myself';
import Match from './pages/Match';
import Choice from './pages/Choice';
import Describe from './pages/Describe';
import NoPage from './pages/NoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='LogIn' element={<LogIn />} />
            <Route path='Specifics' element={<Specifics />} />
            <Route path='Myself' element={<Myself />} />
            <Route path='Match' element={<Match />} />
            <Route path='Choice' element={<Choice />} />
            <Route path='Describe' element={<Describe />} />
          </Route> 
            <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
