import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from "../../axios";
import imageCompression from "browser-image-compression";

import { VscEdit } from "react-icons/vsc";
import { UserContext } from '../../contexts/UserContext';
const BasicInfo = () => {
  // 유저 정보
  const userData = useContext(UserContext);
  // 이미지 변경
  const setImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('key', 'c45fbb5e972123a41582662a153f7f38');
      formData.append('image', file);
      formData.append('name', userData?.user_email);

      try {
        delete axios.defaults.headers.common["Authorization"];
        const response = await axios.post('https://api.imgbb.com/1/upload', formData);

        if (response.data.success) {
          const imageUrl = response.data.data.url;
          const accessToken = localStorage.getItem("accessToken");
          axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
          axios.post('/mypage/changeImg', { url: imageUrl }).then((res) => {
            if (res.data.changeImgResult) {
              alert("이미지 변경이 완료되었습니다.")
              userData.user_profile_img = imageUrl
              window.location.replace('/mypage')
            } else {
              alert("이미지 업로드 중 오류가 발생했습니다.");
            }
          })
        } else {
          console.error('Image upload failed:', response.data);
          alert("이미지 업로드 중 오류가 발생했습니다.");
        }
      } catch (error) {
        console.error('Error uploading image:', error.message);
        alert("이미지 업로드 중 오류가 발생했습니다.");
      }
    }
  };

  const [change, setChange] = useState(false)
  const [name, setName] = useState(userData?.user_name)
  const [intro, setIntro] = useState(userData?.user_intro)
  const showInput = () => {
    if (change) {
      if (name == userData?.user_name && intro == userData?.user_intro) {
        setChange(!change);
      } else {
        changeBasicInfo();
      }
    } else {
      setChange(!change);
    }

  }

  const changeBasicInfo = () => {
    axios.post('/mypage/changeBasicInfo', { name: name, intro: intro }).then((res) => {
      if (res.data.changeBasicInfoResult) {
        alert("기본정보 변경이 완료되었습니다.")
        userData.user_name = name;
        userData.user_intro = intro;
        setChange(!change);
      } else {
        alert("[NETWORK ERROR] 다시 시도해주세요.")
      }
    })
  }

  return (
    <BasicInfoBox>
      <ImageBox>
        <Img>
          <img src={userData?.user_profile_img} alt="유저사진" />
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
        {change ?
          <>
            <input type='text' className='name' value={name} onChange={(e) => { setName(e.target.value) }} />
            <input type='text' className='intro' value={intro} onChange={(e) => { setIntro(e.target.value) }} />
            <div className='btnBox'>
              <button onClick={showInput}>저장</button>
            </div>
          </>
          :
          <>
            <div className='name'>{userData?.user_name}</div>
            <div className='intro'>{userData?.user_intro}</div>
            <div className='btnBox'>
              <button onClick={showInput}>수정</button>
            </div>
          </>}

      </IntroBox>

    </BasicInfoBox>
  )
}

export default BasicInfo

const BasicInfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 65%;
  margin-bottom: 50px;
  @media screen and (max-width: 1040px) {
    flex-direction: column;
    width: 90%;
    margin-bottom: 0;
  }
`
const IntroBox = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
width: 65%;
height: 180px;
& .name{
  font-size: 30px;
  font-weight: bold;
}

& .intro{
  font-size: 20px;
  color: #868e86;
}

& .btnBox{
  display: flex;
  align-items: end;
  justify-content: end;
  width: 100%;
}

& button {
  width: 50px;
  height: 35px;
  border-radius: 17.5px;
  border-style: none;
  background-color: #950AFFaa;
  color: white;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
}
@media screen and (max-width: 1040px) {
    width: 100%;
    height: 150px;
    border-bottom: 1px solid #bdbdbd;
    padding-bottom: 10px;
  }

`

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0 0 0;

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
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid #bdbdbd;
  overflow: hidden;

  & img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    object-position: center;
  }
`;