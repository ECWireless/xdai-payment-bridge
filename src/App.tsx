import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bridge from 'views/Bridge';
import Search from 'views/Search';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/address/:id" element={<Bridge />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
