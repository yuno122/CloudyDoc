import React from 'react';
import './App.css';
import Login from './components/Login';
import Join from './components/Join';
import Main from './components/Main';
import NewCode from "./components/NewCode";
import { Link, BrowserRouter, Route, Switch, Routes} from "react-router-dom";

function App() {
  return (
    // <Login />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/Join" element={<Join/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path='/Main' element={<Main/>}></Route>
          <Route path='/NewCode' element={<NewCode/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
