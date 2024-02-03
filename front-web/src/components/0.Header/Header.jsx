import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { UserContext } from '../../contexts/UserContext';

import styled from 'styled-components'
import { FaRegCircleUser } from "react-icons/fa6";

import Menu from './Menu';


const Header = () => {
  const location = useLocation().pathname;
  const user_board = decodeURIComponent(location.split("/")[1].substring(1))
  const userData = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // 모달창 노출
  const showMenu = () => {
    setMenuOpen(true);
  };

  return (
    <div>
      <div style={{ height: "90px" }}></div>
      <HeaderBox>
        {!location.includes("@") ?
          <Link to='/' className='logoBox'>
            <img src={`${process.env.PUBLIC_URL}/images/BackBoardLogo.png`} alt="웹페이지 로고" />
          </Link>
          :
          <div className='logoBox'>
            <Link to='/' >
              <img src={`${process.env.PUBLIC_URL}/images/BBInitialLogo.png`} alt="웹페이지 로고" />
            </Link>
            <Link to={`/@${user_board}/list`} className='myBlog'>
              {user_board}
            </Link>
          </div>
        }

        <div className='menuBox'>
          {userData != null ?
            <Link to='/newwrite'>
              <div className='newwrite'>보드 작성</div>
            </Link>
            :
            <Link to='/login'>
              <div className='newwrite'>로그인</div>
            </Link>}


          {userData != null ?
            <div className='imgBox' onClick={showMenu}>
              <img src={userData?.user_profile_img} alt="유저 사진" />
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
  position: fixed;
  top: 0;
  background-color: white;
  border-bottom: 1px solid #bdbdbd;

  & a{
    text-decoration: none;
  }

  & .logoBox{
    display: flex;
    align-items: center;
    margin-left: 10%;

    & .myBlog{
      font-size: 28px;
      font-weight: bold;
      margin-left: 10px;
      text-decoration: none;
      color: inherit;
    }

    @media screen and (max-width: 1040px) {
    margin-left: 3%;
  }
  }

  & img{
    height: 50px;
    @media screen and (max-width: 1040px) {
      height: 45px;
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
      /* max-width: 40px; */
      max-height: 40px;
    }
  }

`;
