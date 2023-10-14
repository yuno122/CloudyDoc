/*---------------------------------------------------------------
* Class Name or File Name: Join 
* Description: 유저 회원가입 처리 페이지
* Included Methods: 
*       Join;
*       handleChange;
*       handleSubmit;
* Author: Hanseoyoung, Shinyoonho, Seominjeong
* Date : 2023/9/24 
* Version: release 1.0 on 2023/9/24
* 
* ⓒCopyright 2023 Hanseoyoung, Shinyoonho, Seominjeong in the Department of Computer Science at Chungbuk National University, Republic of Korea. All rights reserved. Contact us e-mail: * happyunbd364@naver.com, yuno122@naver.com, 
---------------------------------------------------------------*/
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../img/logo.png';
import Button from '@mui/material/Button';
/*---------------------------------------------------------------
* Method Name: Join(props)
* Function: ‘학생’ 데이터베이스에 새로운 학생을 추가하는 기능을 수행한다. 
* Parameter: username: 이름
             password: 비밀번호
             passwordConfirm: 비밀번호  확인
             email: 이메일
             nickname: 별명
* Return Value:  
---------------------------------------------------------------*/
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
