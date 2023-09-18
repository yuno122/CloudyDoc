import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../img/logo.png';
import Join from './Join';
import { Link, useNavigate, BrowserRouter, Route, Switch, Routes} from "react-router-dom";
import Button from '@mui/material/Button';
import { auth } from "../firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Login(props) {
    const [inputId, setInputId] = useState("")
    const [inputPw, setInputPw] = useState("")

    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
    
    // login 버튼 클릭 이벤트
    const onClickLogin = () => {
        console.log('click login')
    }

    const navigate = useNavigate();
    
    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider(); // provider 구글 설정
        signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
          .then((data) => {
            props.setUserData(data.user); // user data 설정
            console.log(data); // console에 UserCredentialImpl 출력
            navigate("/Main");
          })
          .catch((err) => {
            console.log(err);
          });
      }


    // 페이지 렌더링 후 가장 처음 호출되는 함수
    /*useEffect(() => {
        axios.get('/user_inform/login')
            .then(res => console.log(res))
            .catch()
    },
        // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
        []) */

    return (
        <div>
            <div class="imgcontainer">
                <img src={logo} class="logo" />
            </div>
            <div class="logincontainer">
                <label htmlfor="ID"><b>ID</b></label>
                <input type="text" placeholder="ID를 입력하세요" name="ID" value={inputId} onChange={handleInputId} />

                <label htmlfor="psw"><b>비밀번호</b></label>
                <input type="password" placeholder="비밀번호를 입력하세요" name="psw" value={inputPw} onChange={handleInputPw} />

                <div>
                    <Link to ="/Main"><Button variant="contained" class = "loginbutton"type='button' onClick={onClickLogin}>Login</Button></Link>
                </div>

                <div>
                    <Button variant="contained" className="loginbutton" type="button" onClick={handleGoogleLogin}>구글로그인</Button>
                </div>
            </div>

            <div class="logincontainer">
                {/* <span class="psw">Forgot <a href="#">password?</a></span> */}                    
                    <Link to="/Join"><Button variant='text'>회원가입</Button></Link>
                    
            </div>
        </div>
            )
}

            export default Login;