import React, { Component } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import CfbNav from './components/Navbar';
import Top25Teams from './views/Top25Teams';
import Team from './views/Team';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <CfbNav />
      <Container fluid className={"bg-dark text-light"}>
        <Routes>
          <Route path="/" element={<Top25Teams />} />
          <Route path="/team/:team_id" element={<Team />} />
        </Routes>


      </Container>
    </div>
  );
}

export default App;