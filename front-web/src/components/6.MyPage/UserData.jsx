import React, { useContext, useEffect, useState } from 'react'
import axios from "../../axios";
import styled from 'styled-components';
import { UserContext } from '../../contexts/UserContext';

const UserData = () => {
  const userData = useContext(UserContext);

  const [board, setBoard] = useState(userData?.user_board)
  const [email, setEmail] = useState(userData?.user_email)
  const [boardChange, setBoardChange] = useState(false)
  const [emailChange, setEmailChange] = useState(false)

  useEffect(() => {
    setBoard(userData?.user_board)
    setEmail(userData?.user_email)
  }, [userData])

  const showBoardInput = () => {
    if (boardChange) {
      if (userData?.user_board == board) {
        setBoardChange(!boardChange)
      } else {
        changeBoard();
      }
    } else {
      setBoardChange(!boardChange)
    }
  }

  const showEmailInput = () => {
    if (emailChange) {
      if (userData?.user_email == email) {
        setEmailChange(!emailChange)
      } else {
        changeEmail();
      }
    } else {
      setEmailChange(!emailChange)
    }
  }

  const changeBoard = () => {
    axios.post('/mypage/changeBoard', { board: board }).then((res) => {
      if (res.data.changeBoardResult) {
        alert("보드명 변경이 완료되었습니다.")
        userData.user_board = board;
        setBoardChange(!boardChange);
      } else {
        alert("[NETWORK ERROR] 다시 시도해주세요.")
      }
    })
  }

  const changeEmail = () => {
    axios.post('/mypage/changeEmail', { email: email }).then((res) => {
      if (res.data.changeEmailResult) {
        localStorage.setItem("accessToken", JSON.stringify(res.data.newAccessToken));
        alert("이메일 변경이 완료되었습니다.")
        userData.user_email = email;
        setEmailChange(!emailChange);
      } else {
        alert("[NETWORK ERROR] 다시 시도해주세요.")
      }
    })
  }

  return (
    <UserDataBox>
      <DataBox>
        <div className='title'>보드 제목</div>
        {boardChange ?
          <div className='content'>
            <input type='text' value={board} onChange={(e) => { setBoard(e.target.value) }} />
            <button onClick={showBoardInput}>저장</button>
          </div>
          :
          <div className='content'>
            <div>{userData?.user_board}</div>
            <button onClick={showBoardInput}>수정</button>
          </div>}

      </DataBox>
      <DataBox>
        <div className='title'>이메일 주소</div>
        {emailChange ?
          <div className='content'>
            <input type='text' value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <button onClick={showEmailInput}>저장</button>
          </div>
          :
          <div className='content'>
            <div>{userData?.user_email}</div>
            <button onClick={showEmailInput}>수정</button>
          </div>}

      </DataBox>
    </UserDataBox>
  )
}

export default UserData

const UserDataBox = styled.div`
  width: 65%;
  @media screen and (max-width: 1040px) {
    width: 90%;
  }
`

const DataBox = styled.div`
margin-top: 20px;
padding-bottom: 10px;
  border-bottom: 1px solid #bdbdbd;

  & .title{
    font-size: 20px;
    font-weight: bold;
  }

  & .content{
    display: flex;
    justify-content: space-between;
    align-items: center;

    & div{
      font-size: 18px;
      color: grey;
    }

    & input{
      width: 80%;
      font-size: 18px;
    }

    & button{
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
  }
`