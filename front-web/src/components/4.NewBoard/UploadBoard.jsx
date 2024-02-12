import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const UploadBoard = ({ width = 280, xPosition, isOpen, children, close, closeSet, setX, setOpen }) => {
    const side = useRef();
    //메뉴 닫기 함수
    const closeMenu = (e) => {
        if (e) {
            setX(-width);
            setOpen(false);
        }
    };
    useEffect(() => {
        closeMenu(close);
        closeSet(false);
    }, [close]);

    return (
        <SideBarBox>
            <SideBarView
                ref={side}
                style={{
                    width: `${100}%`,
                    height: "100%",
                    transform: `translatey(${-xPosition}px)`,
                }}
            >
                {/* 사이드바 컴포넌트 내부 값이 구현되는 위치 */}
                <SideBarContents>{children}</SideBarContents>
            </SideBarView>
        </SideBarBox>
    )
}

export default UploadBoard

const SideBarBox = styled.div`
  /* background-color: aliceblue; */
`;

const SideBarView = styled.div`
  background-color: grey;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  transition: 0.4s ease;
  color: #202020;
  height: 100%;
  padding-top:40px;
  z-index: 99;

  & .btnSideBar {
    position: relative;
    top: 25px;
    left: -55px;
    width: 30px;
    height: 30px;
    z-index: 99;
    transition: 0.5s ease;
  }
  & .btnOff {
    left: -55px;
    /* background-color: white;
    border-radius: 50%; */
  }
  & .btnOn {
    left: 300px;
  }
`;

const SideBarContents = styled.div`
  position: relative;
  top: -35px;
  height: 100vh;
  width: 100%;
`;