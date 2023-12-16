import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from "../../axios";
import imageCompression from "browser-image-compression";

import { VscEdit } from "react-icons/vsc";
const BasicInfo = () => {
      // 유저 전체 정보
  const userData = localStorage.getItem("loginData")

  // 이미지 압축
  const [img, setImg] = useState({ pre: "", data: "" });
  const setImage = async (e) => {
    if (e.target.files[0]) {
      const options = {
        maxSizeMB: 0.05, // 이미지 최대 용량
        maxWidthOrHeight: 500, // 최대 넓이(혹은 높이)
        useWebWorker: true,
      };
      try {
        let compFile = await imageCompression(e.target.files[0], options);
        setImg({
          pre: URL.createObjectURL(compFile),
          data: compFile,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 이미지 변환시 데이터 베이스/로컬스토리지에 이미지 저장
  const sendImg = () => {
    let formData = new FormData();
    formData.append("image", img.data);
    formData.append("id", userData.mem_id);
    axios
      .post("/user/changeImg", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.chageImgResult) {
          alert("이미지 변경이 완료되었습니다.");
          window.location.replace("/mypage");
        } else {
          alert("이미지 변경이 실패하였습니다.");
          window.location.replace("/mypage");
        }
      });
  };

  // 이미지 선택을 새로 하는 경우 이미지 저장 함수 실행
  useEffect(() => {
    if (img.data != "") {
      sendImg();
    }
  }, [img]);

  // 로컬 스토리지에서 불러온 이미지 데이터 변환
  const conImg = btoa(
    String.fromCharCode(...new Uint8Array(userData?.mem_profile_img?.data))
  );
  return (
    <BasicInfoBox>
    <ImageBox>
    <Img>
      {userData?.mem_profile_img != null ? (
        <img src={`data:image/png;base64,${conImg}`} alt="유저사진" />
      ) : (
        <img
          src={`${process.env.PUBLIC_URL}/images/User2.png`}
          alt="기본 유저사진"
        />
      )}
    </Img>
    <label htmlFor="file">
      <VscEdit />
    </label>
    <input
      type="file"
      id="file"
      accept="image/*"
      onChange={(e) => {
        setImage(e);
      }}
    />
  </ImageBox>
  <IntroBox>
  <h1 className='name'>이름</h1>
  <div className='intro'>한줄소개</div>
  </IntroBox>
  
  </BasicInfoBox>
  )
}

export default BasicInfo

const BasicInfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
`
const IntroBox = styled.div`
width: 60%;
height: 250px;
border: 1px solid black;

& .name{
  /* font-size: 30px; */
}

& .intro{
  font-size: 20px;
}

`

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 0 0 0;

  label {
    position: relative;
    top: -30px;
    right: -50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    border-radius: 50%;
    border: 4px solid white;
    background-color: #d0d0d0;
    cursor: pointer;
    height: 30px;
    width: 30px;
  }

  & input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;

const Img = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 1px solid #bdbdbd;
  overflow: hidden;

  & img {
    max-width: 300px;
    max-height: 300px;
  }
`;