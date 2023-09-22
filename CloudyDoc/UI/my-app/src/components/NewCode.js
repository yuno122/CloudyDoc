import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import logo from "../img/logo.png";
import uploadCloud from "../img/uploadCloud.svg";
import downloadCloud from "../img/downloadCloud.svg";

import Editor from '@monaco-editor/react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getStorage , ref, uploadString } from 'firebase/storage';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const storage = getStorage();
const storageRef = ref(storage);

function NewCode() {

  const [editorValue, setEditorValue] = useState("# 코드 입력");

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [saveMessage, setSaveMessage] = useState(null);

  function handleEditorChange(value, event) {
    // here is the current value.
    setEditorValue(value);
  }

  const handleSaveDialogClose = () => {
    setSaveDialogOpen(false);
  };

  const handleSaveConfirm = async () => {
    if (fileName.trim() === '') {
      alert('파일 제목을 입력하세요.');
      return;
    }

    try {
      const codeRef = ref(storageRef, `${fileName}.txt`);
      await uploadString(codeRef, editorValue); 
      setSaveMessage(`'${fileName}.txt' 파일이 성공적으로 업로드되었습니다.`);
      setFileName(''); // 파일 제목 초기화
      setSaveDialogOpen(false); // 다이얼로그 닫기
    } catch (error) {
      console.error('코드 업로드 중 오류 발생:', error);
    }
  };

  const uploadCodeToFirebaseStorage = async () => {
    try {
      const codeRef = ref(storageRef, 'code.txt');
      await uploadString(codeRef, editorValue); 
      console.log('코드가 성공적으로 업로드되었습니다.');
    } catch (error) {
      console.error('코드 업로드 중 오류 발생:', error);
    }
  };

  function handleEditorDidMount(editor, monaco) {
    console.log('onMount: the editor instance:', editor);
    console.log('onMount: the monaco instance:', monaco);
  }

  function handleEditorWillMount(monaco) {
    console.log('beforeMount: the monaco instance:', monaco);
  }

  function handleEditorValidation(markers) {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }

  const handleSaveButtonClick = () => {
    setSaveDialogOpen(true);
  };


  const [fileAnchorEl, setFileAnchorEl] = useState(null);
  const [editAnchorEl, setEditAnchorEl] = useState(null);
  const [insertAnchorEl, setInsertAnchorEl] = useState(null);
  const [toolsAnchorEl, setToolsAnchorEl] = useState(null);

  const handleFileClick = (event) => {
    setFileAnchorEl(event.currentTarget);
  };

  const handleEditClick = (event) => {
    setEditAnchorEl(event.currentTarget);
  };

  const handleInsertClick = (event) => {
    setInsertAnchorEl(event.currentTarget);
  };

  const handleToolsClick = (event) => {
    setToolsAnchorEl(event.currentTarget);
  };

  const handleFileClose = () => {
    setFileAnchorEl(null);
  };

  const handleEditClose = () => {
    setEditAnchorEl(null);
  };

  const handleInsertClose = () => {
    setInsertAnchorEl(null);
  };

  const handleToolsClose = () => {
    setToolsAnchorEl(null);
  };


  return (
    <div >
      <header className="app-header" >
        <div className="logo-container">
          <img src={logo} alt="logo" className="smalllogo" />
        </div>
        <div className='codeTitle'>
          <h1>title.py </h1>
          <img src={uploadCloud} className='uploadcloud'/>
          <img src={downloadCloud} className='downloadcloud'/>
          <Button variant="outlined" onClick={handleSaveButtonClick}>코드 저장</Button>
          <Dialog open={saveDialogOpen} onClose={handleSaveDialogClose}>
            <DialogTitle>파일 제목 입력</DialogTitle>
            <DialogContent>
              <DialogContentText>파일의 제목을 입력하세요.</DialogContentText>
              <input
              type="text"
              placeholder="파일 제목"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSaveDialogClose}>취소</Button>
              <Button onClick={handleSaveConfirm} disabled={!fileName.trim()}>확인</Button>
            </DialogActions>
          </Dialog>
          {saveMessage && <div>{saveMessage}</div>}
        </div>
        <div>
          <AppBar position="static" className="appBar" sx={{ bgcolor: "black" }} >
            <Toolbar>
              <Typography variant="h6" className="codeMenuTitle" onClick={handleFileClick}>
                파일
              </Typography>
              <div>
                <Menu
                  id="simple-menu"
                  anchorEl={fileAnchorEl}
                  keepMounted
                  open={Boolean(fileAnchorEl)}
                  onClose={handleFileClose}
                >
                  <MenuItem onClick={handleFileClose}>새 문서</MenuItem>
                  <MenuItem onClick={handleFileClose}>사본 만들기</MenuItem>
                  <MenuItem onClick={handleFileClose}>제목 변경</MenuItem>
                  <MenuItem onClick={handleFileClose}>언어 변경</MenuItem>
                </Menu>
              </div>

              <Typography variant="h6" className="codeMenuTitle" onClick={handleEditClick}>
                수정
              </Typography>
              <div>
                <Menu
                  id="simple-menu"
                  anchorEl={editAnchorEl}
                  keepMounted
                  open={Boolean(editAnchorEl)}
                  onClose={handleEditClose}
                >
                  <MenuItem onClick={handleEditClose}>실행 취소</MenuItem>
                  <MenuItem onClick={handleEditClose}>재실행</MenuItem>
                  <MenuItem onClick={handleEditClose}>복사</MenuItem>
                  <MenuItem onClick={handleEditClose}>붙여넣기</MenuItem>
                  <MenuItem onClick={handleEditClose}>찾기</MenuItem>
                </Menu>
              </div>
              <Typography variant="h6" className="codeMenuTitle" onClick={handleInsertClick}>
                삽입
              </Typography>
              <div>
                <Menu
                  id="simple-menu"
                  anchorEl={insertAnchorEl}
                  keepMounted
                  open={Boolean(insertAnchorEl)}
                  onClose={handleInsertClose}
                >
                  <MenuItem onClick={handleInsertClose}>그림 이모티콘</MenuItem>
                  <MenuItem onClick={handleInsertClose}>특수 문자</MenuItem>
                </Menu>
              </div>

              <Typography variant="h6" className="codeMenuTitle" onClick={handleToolsClick}>
                도구
              </Typography>
              <div>
                <Menu
                  id="simple-menu"
                  anchorEl={toolsAnchorEl}
                  keepMounted
                  open={Boolean(toolsAnchorEl)}
                  onClose={handleToolsClose}
                >
                  <MenuItem onClick={handleToolsClose}>단어 수</MenuItem>
                  <MenuItem onClick={handleToolsClose}>글자 크기</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
        </div>

      </header>
      <Editor
      className='editor'
        height="90vh"
        defaultLanguage="python"
        value={editorValue}
        defaultValue="# 코드 입력"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        onValidate={handleEditorValidation}
        options={{
          fontSize: 15,
          minimap: { enabled: true },
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto'
          }}}
      />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<NewCode />, rootElement);
export default NewCode;