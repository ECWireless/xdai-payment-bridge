import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Bridge from 'views/Bridge';
import Search from 'views/Search';
import Header from 'components/Header';

const App: React.FC = () => {
  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} style={{ zIndex: 10000000000 }} />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/addresses/:id" element={<Bridge />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
