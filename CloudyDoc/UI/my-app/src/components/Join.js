import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../img/logo.png';
import Button from '@mui/material/Button';

function Join(props) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    nickname: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // formData로 회원가입 처리
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="imgcontainer">
        <img src={logo} class="logo" />
      </div>
      <div class="logincontainer">
        <div>
          <label><b>아이디</b></label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label><b>비밀번호</b></label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label><b>비밀번호 확인</b></label>
          <input type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} />
          <Button variant="contained" class = "pswConfirm" color="success">확인</Button>
        </div>
        <div>
          <label><b>이메일</b></label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label><b>닉네임</b></label>
          <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} />
        </div>
        <Link to="/Login"><Button variant="contained" class = "loginbutton"type='button'>회원가입</Button></Link>
      </div>
    </form>
  );
}

export default Join;
