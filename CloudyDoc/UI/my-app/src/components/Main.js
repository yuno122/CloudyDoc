import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import logo from "../img/logo.png";
import NewCode from "../img/newCode.svg";
import LoadCode from "../img/codeLoad.png";
import ProfileIcon from "../img/ProfileIcon.png";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';


// 새 코드 카드 이미지 수정, css 수정 + 코드 작성 페이지 

function App() {
    const [recentCodes, setRecentCodes] = useState([
        { id: 1, title: "새로운 코드 1", updatedAt: new Date() },
        { id: 2, title: "새로운 코드 2", updatedAt: new Date() },
        { id: 3, title: "새로운 코드 3", updatedAt: new Date() },
        { id: 4, title: "새로운 코드 4", updatedAt: new Date() },
        { id: 5, title: "새로운 코드 5", updatedAt: new Date() },
        { id: 6, title: "새로운 코드 6", updatedAt: new Date() },
    ]);

    return (
        <div>
            <header className="app-header">
                <div className="logo-container">
                    <img src={logo} alt="logo" className="smalllogo" />
                </div>
                <div className="user-profile">
                    <img src={ProfileIcon} className="profileIcon"/>
                </div>
            </header>
            <div className="app-content">
                <div className="app-sidebar">
                    <Link to="/new-code" className="sidebar-item">
                        <Card variant="outlined" sx={{ maxWidth: 400 }}>
                            <CardMedia sx={{ height: 420 }} image={NewCode} title="newcode"/>
                            <CardActions>
                                <Button size="Big">코드 불러오기</Button>
                            </CardActions>
                        </Card>
                    </Link>


                    <Link to="/new-code" className="sidebar-item">
                        <Card variant="outlined" sx={{ maxWidth: 400 }}>
                            <CardMedia sx={{ height: 420 }} image={NewCode} title="newcode"/>
                            <CardActions>
                                <Button size="Big">새 코드</Button>
                            </CardActions>
                        </Card>
                    </Link>
                </div>
            </div>
            <div className="recent-codes">
                <h2>최근 코드</h2>
                <ul>
                    {recentCodes.map((code) => (
                        <li key={code.id}>
                            <Link to={`/code/${code.id}`}>{code.title}</Link>
                            <span className="code-updated-at">
                                {code.updatedAt.toLocaleDateString()}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
