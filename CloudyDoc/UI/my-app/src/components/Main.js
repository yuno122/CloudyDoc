/*---------------------------------------------------------------
* Class Name or File Name: Main
* Description: 파일 선택 페이지
* Included Methods: 
*       Main();
* Author: Hanseoyoung, Shinyoonho, Seominjeong
* Date : 2023/9/24 
* Version: release 1.0 on 2023/9/24
* 
* ⓒCopyright 2023 Hanseoyoung, Shinyoonho, Seominjeong in the Department of Computer Science at Chungbuk National University, Republic of Korea. All rights reserved. Contact us e-mail: * happyunbd364@naver.com, yuno122@naver.com, 
---------------------------------------------------------------*/
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import NewCode from "../img/newCode.svg";
import LoadCode from "../img/codeLoad.svg";
import ProfileIcon from "../img/ProfileIcon.png";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';
import { auth, storage } from '../firebase-config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

// 새 코드 카드 이미지 수정, css 수정 + 코드 작성 페이지 


function Main() {
    const [recentCodes, setRecentCodes] = useState([]);

    const navigate = useNavigate();
    const [userDisplayName, setUserDisplayName] = useState(""); // 유저 이름을 저장할 상태 추가

    const handleCodeLoad = async (event) => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".py"; 

        // 파일 선택(input) 다이얼로그 열기
        fileInput.click();

        // 파일 선택(input) 이벤트 리스너
        fileInput.addEventListener("change", async (e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
                try {
                    const fileContents = await readFileAsText(selectedFile);

                    // 파일 내용을 처리하거나 저장합니다.
                    console.log("불러온 코드 파일 내용:", fileContents);
                } catch (error) {
                    console.error("파일을 읽는 중 오류 발생:", error);
                }
            }
        });
    };

    // 파일을 읽어 텍스트로 반환하는 함수
    const readFileAsText = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target.result);
            };
            reader.onerror = (event) => {
                reject(event.target.error);
            };
            reader.readAsText(file);
        });
    };
    
    const handleLogout = async () => {
        try {
          await auth.signOut(); // Firebase 로그아웃 함수를 호출합니다
          navigate('/'); // 로그아웃 후 홈 페이지('/')로 이동합니다
        } catch (error) {
          console.error('로그아웃 중 오류 발생:', error);
        }
      };

    useEffect(() => {
        // Firebase에서 현재 로그인한 사용자 정보 가져오기
        const user = auth.currentUser;
        if (user) {
            setUserDisplayName(user.displayName);
        }
        const storageRef = ref(storage);
        const fetchRecentCodes = async () => {
            try {
                const files = await listAll(storageRef);
                const codes = await Promise.all(
                    files.items.map(async (fileRef) => {
                        const url = await getDownloadURL(fileRef);
                        return {
                            id: fileRef.name,
                            title: fileRef.name.replace('.txt', ''),
                            updatedAt: new Date(),
                            downloadUrl: url,
                        };
                    })
                );
                setRecentCodes(codes);
            } catch (error) {
                console.error('파일 목록을 불러오는 중 오류 발생:', error);
            }
        };

        fetchRecentCodes();
    }, []);


    return (
        
        <div className="main-container">
            <header className="app-header">
                <div className="logo-container">
                    <img src={logo} alt="logo" className="smalllogo" />
                </div>
                <div className="user-profile">
                    <img src={ProfileIcon} className="profileIcon" />
                    {userDisplayName && <div className="user-name">{userDisplayName}</div>}
                    <Button variant = "contained" className="logout-button" onClick={handleLogout}>로그아웃</Button>
                </div>
                
            </header>
            <div className="app-content">
                <div className="app-sidebsar">
                    <Link to="/new-load" className="sidebar-item">
                        <Card className="card1" variant="outlined" sx={{ maxWidth: 500 }}>
                            <CardMedia sx={{ height: 400 }} className="cardimg" image={LoadCode} title="newcode" />
                            <CardActions>
                                <Button size="Big" onClick={handleCodeLoad}>코드 불러오기</Button>
                            </CardActions>
                        </Card>
                    </Link>


                    <Link to="/NewCode" className="sidebar-item">
                        <Card className="card2" variant="outlined" sx={{ maxWidth: 500 }}>
                            <CardMedia sx={{ height: 400 }} image={NewCode} title="newcode" />
                            <CardActions>
                                <Button size="Big">새 코드</Button>
                            </CardActions>
                        </Card>
                    </Link>
                </div>
            </div>
            <div className="recent-codes">
                <h1 className="recentcode">최근 코드</h1>
                <List  sx={{ width: '100%', maxWidth: 1500, bgcolor: 'background.paper' }}>
            
                        {recentCodes.map((code) => (
                           
                            <li key={code.id}>
                                <ListItem>
                                <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon>
                                <ListItemButton onClick={() => window.open(code.downloadUrl)} target="_blank">
                                <ListItemText primary={code.title} />
                                
                                <span className="code-updated-at">
                                    {code.updatedAt.toLocaleDateString()}
                                </span>
                                </ListItemButton>
                                </ListItem>
                            </li>
                        ))}
                    
                </List>
            </div>
        </div>
    );
}

export default Main;
