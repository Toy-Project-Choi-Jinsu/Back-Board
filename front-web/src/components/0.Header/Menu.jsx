import React, { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../contexts/UserContext';

const Menu = ({ setMenuOpen }) => {
  const userData = useContext(UserContext);

  // 모달 외부 클릭 시 끄기
  const menuRef = useRef(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

  const nav = useNavigate();
  const moveMenu = (menu) => {
    if (menu != 'logout') {
      window.location.replace(`/${menu}`)
    } else {
      localStorage.clear()
      alert("로그아웃 되었습니다.")
      window.location.replace('/');
    }
    setMenuOpen(false);
  }

  return (
    <ChangeNickBox ref={menuRef}>
      <div onClick={() => moveMenu(`@${userData.user_board}/list`)}>내 보드</div>
      <div onClick={() => moveMenu('tempwrite')}>임시저장</div>
      <div onClick={() => moveMenu('read')}>관심 보드</div>
      <div onClick={() => moveMenu('mypage')}>마이페이지</div>
      <div onClick={() => moveMenu('logout')}>로그아웃</div>
    </ChangeNickBox>
  )
}

export default Menu

const ChangeNickBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 225px;
  z-index: 99999999;
  position: fixed;
  top: 80px;
  right: 10%;
  background-color: rgb(201, 131, 255);;
  border-radius: 5px;

  & div{
    display: flex;
    align-items: center;
    font-size: 18px;
    color: white;
    width: 150px;
    height: 45px;
    padding-left: 30px;
    cursor: pointer;
    &:hover {
      background-color: #2e22880f;
      color: #9000ff;
    }
  }

  @media only screen and (max-width: 1040px) {
    right: 3%;
  }
`;
