import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from '../../axios';
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import DOMPurify from 'dompurify';
import { UserContext } from '../../contexts/UserContext';
import styled from 'styled-components';
import UploadBoard from './UploadBoard';
import UploadBoardContents from './UploadBoardContents';

Quill.register("modules/imageResize", ImageResize);

const NewBoard = () => {

  const userData = useContext(UserContext);
  const quillRef = useRef(null);
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("");

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
        ["clean"],
      ]
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  const setImage = async (file) => {
    const range = quillRef.current.getEditor().getSelection(true);
    quillRef.current.getEditor().insertEmbed(range.index, "image", "https://i.gifer.com/YlWC.gif");
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        axios.post('/image/uploadBoardImg', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "type": 'board_contents',
            "id": userData?.user_email,
            "overwrite": false
          },
        }).then((res) => {

          if (res.data.uploadBoardImgResult) {
            quillRef.current.getEditor().deleteText(range.index, 1);
            quillRef.current.getEditor().insertEmbed(range.index, "image", res.data.uploadBoardImgResult);
          } else {
            quillRef.current.getEditor().insertEmbed(range.index, "image", 'https://cdn.questionpro.com/userimages/site_media/no-image.png');
          }
        })
      } catch (error) {
        console.error('Error uploading image:', error.message);
        quillRef.current.getEditor().insertEmbed(range.index, "image", 'https://cdn.questionpro.com/userimages/site_media/no-image.png');
      }
    }
    quillRef.current.getEditor().setSelection(range.index + 1);
  };

  useEffect(() => {
    const handleImage = () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      input.onchange = async () => {
        const file = input.files[0];
        await setImage(file);
      };
    }

    if (quillRef.current) {
      const { getEditor } = quillRef.current;
      const toolbar = quillRef.current.getEditor().getModule("toolbar");
      toolbar.addHandler("image", handleImage);
    }
  }, []);

  const uploadBoard = async () => {
    const cleanContent = DOMPurify.sanitize(content); // 사용자 입력을 안전하게 처리
    // cleanHTML을 서버로 전송하거나 다른 작업 수행
    console.log('안전한 HTML:', cleanContent);

  }

  // 사이드바 열고 닫기
  const [close, setClose] = useState(false);
  const closeMenu = (e) => {
    setClose(e);
  };

  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-1000);
  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(-1000);
      setOpen(false);
    }
  };

  return (
    <NewBoardBox>
      <Header>
        <button className='back' onClick={() => window.history.back()}>나가기</button>
        <div className='nextBtns'>
          <button className='save' onClick={uploadBoard}>임시저장</button>
          <button className='upload' onClick={toggleMenu}>업로드</button>
        </div>
      </Header>
      <Title type="text" onChange={(e) => { setTitle(e.target.value) }}
        placeholder='제목을 입력하세요'
      />
      <WriteBox>
        <ReactQuill
          ref={quillRef}
          style={{ height: "100%" }}
          theme="snow"
          modules={modules}
          formats={formats}
          value={content || ""}
          onChange={setContent}
        />
      </WriteBox>
      <div className="uploadBoard">
        <UploadBoard width={350} xPosition={xPosition} close={close} closeSet={closeMenu} setX={setX} setOpen={setOpen}>
          <UploadBoardContents close={toggleMenu} />
        </UploadBoard>
      </div>
    </NewBoardBox>
  )
}

export default NewBoard

const NewBoardBox = styled.div`
display: flex;
flex-direction:column;
align-items: center;
  width: 100%;

  & .uploadBoard {
      display: flex;
      justify-content: right;
      width: 100%;
      margin-right: 30px;
  }
`

const Title = styled.input`
  width: 59%;
  height: 40px;
  font-size: 27px;
  padding: 5px;
  margin: 10px 0 10px 0;
`

const WriteBox = styled.div`
  width: 60%;
  height: 60vh;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 10px;
  width: 59%;
  height: 60px;
  border-top: 2px solid #bdbdbd;
  border-bottom: 2px solid #bdbdbd;
  margin-top: 20px;

  & button{
    height: 35px;
    width: 100px;
    border-radius: 10px;
    border-style:none;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }

  & .nextBtns{
    display: flex;
    align-items: center;
    gap: 10px;
    height: 100%;
  }

  & .back{
    background-color: white;
    color: grey;
  }
  & .save{
    background-color: white;
    color: #ce8eff;
  }
  & .upload{
    background-color: #ce8eff;
    color: white;
  }

  & .back:hover{
    background-color: #ff6d6d;
    color: white;
  }
  & .save:hover{
    color: #ce8eff;
    background-color: whitesmoke;
  }
  & .upload:hover{
    background-color: #950AFF;
  }
`