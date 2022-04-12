import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Registration from './pages/Registration';
import Specifics from './pages/Specifics';  // Registration
import Myself from './pages/Myself';
import Match from './pages/Match';
import Choice from './pages/Choice';
import Describe from './pages/Describe';
import NoPage from './pages/NoPage';
// import Page1 from './pages/page1';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path='Page1' element={<Page1 />} /> */}
            <Route path='Registration' element={<Registration />} />
            <Route path='Specifics' element={<Specifics />} />;
            <Route path='Myself' element={<Myself />} />;
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
