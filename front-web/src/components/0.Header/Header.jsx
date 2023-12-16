import React, { useState } from 'react'
import styled from 'styled-components'
import { FaRegCircleUser } from "react-icons/fa6";


import { Link } from "react-router-dom";
import Menu from './Menu';

const Header = () => {

  const loginData = localStorage.getItem("loginData")

  const [menuOpen, setMenuOpen] = useState(false);

  // 모달창 노출
  const showMenu = () => {
    setMenuOpen(true);
  };

  return (
    <div>
        <div style={{height: "90px"}}></div>
    <HeaderBox>
      <Link to='/' className='logoBox'>
        <img src={`${process.env.PUBLIC_URL}/images/BackBoardLogo.png`} alt="웹페이지 로고" />
      </Link>
        <div className='menuBox'>
          {loginData != null ?
          <Link to='/newwrite'>
          <div className='newwrite'>보드 작성</div>
          </Link>
          :
          <Link to='/login'>
          <div className='newwrite'>로그인</div>
          </Link>}
          
          
            {loginData != null ?
            <div className='imgBox'>
              {loginData.user_profile_img != null ?
              <img src={`${process.env.PUBLIC_URL}/images/user2.png`} alt="유저 사진" onClick={showMenu}/>
              :
              <FaRegCircleUser onClick={showMenu}/>
              }
            </div>
            :
            <Link to='/login'>
              <div className='imgBox'>
            <FaRegCircleUser />
            </div>
            </Link>}
        </div>
        {menuOpen && <Menu setMenuOpen={setMenuOpen} />}
    </HeaderBox>
    </div>
  )
}

export default Header

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 90px;
  background-color: whitesmoke;
  position: fixed;
  top: 0;

  & a{
    text-decoration: none;
  }

  & .logoBox{
    margin-left: 10%;
    @media screen and (max-width: 1040px) {
    margin-left: 3%;
  }
  }

  & img{
    width: 250px;
    @media screen and (max-width: 1040px) {
      width: 230px;
  }
  }
  & .menuBox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 140px;
    margin-right: 10%;
    @media screen and (max-width: 1040px) {
    margin-right: 3%;
  }
  }

  & .newwrite{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px 0 10px;
    height: 40px;
    background-color: #950AFF;
    border-radius: 20px;
    font-weight: bold;
    color: white;
    cursor: pointer;
  }

  & .imgBox{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    border: 1px solid #bdbdbd;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;

    & svg{
      width: 40px;
      height: 40px;
      color: #950AFF;
    }

    & img{
      max-width: 40px;
      max-height: 40px;
    }
  }

`;
