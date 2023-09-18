import React, {useState} from 'react';
import './App.css';
import Login from './components/Login';
import Join from './components/Join';
import Main from './components/Main';
import NewCode from "./components/NewCode";
import { Link, BrowserRouter, Route, Switch, Routes} from "react-router-dom";
import { auth } from "./firebase-config";

function App() {

  const [userData, setUserData] = useState(null);

  return (
    // <Login />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setUserData={setUserData} />}></Route>
          <Route path="/Join" element={<Join/>}></Route>
          <Route path="/Login" element={<Login setUserData={setUserData} />}></Route>
          <Route path='/Main' element={<Main setUserData={userData} />}></Route>
          <Route path='/NewCode' element={<NewCode/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
