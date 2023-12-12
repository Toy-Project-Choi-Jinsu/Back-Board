import React from 'react'
import styled from 'styled-components'
import { FaRegCircleUser } from "react-icons/fa6";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
        <div style={{height: "90px"}}></div>
    <HeaderBox>
        <img src={`${process.env.PUBLIC_URL}/images/BackBoardLogo.png`} alt="웹페이지 로고" />
        <div className='menuBox'>
          <div className='newwrite'>보드 작성</div>
          <Link to='/login'>
          <div className='imgBox'>
          <FaRegCircleUser />
            {/* <img src={`${process.env.PUBLIC_URL}/images/user2.png`} alt="유저 사진" /> */}
          </div>
          </Link>
        </div>
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

  & img{
    margin-left: 10%;
    width: 250px;
    @media screen and (max-width: 1040px) {
      width: 230px;
    margin-left: 3%;
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
