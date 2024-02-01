import React, { useState } from 'react'
import styled from 'styled-components'
import axios from "../../axios";

const Delete = () => {
  const [pw, setPw] = useState("")
  const [deleteInput, setDeleteInput] = useState(false)
  const showDeleteInput = () => {
    setDeleteInput(!deleteInput);
  }

  const checkDelete = () => {
    const checkResult = window.confirm("탈퇴 시 모든 데이터가 삭제되며 복구되지 않습니다.\n정말로 탈퇴 하시겠습니까?")
    if (checkResult) {
      deleteAccount();
    } else {
      alert("탈퇴가 취소되었습니다.")
      setDeleteInput(!deleteInput);
    }
  }

  const deleteAccount = () => {
    try {
      axios.post("/user/delete", { pw: pw }).then((res) => {
        if (typeof res.data.deleteResult != "boolean") {
          alert('탈퇴가 완료되었습니다.');
          localStorage.clear();
          window.location.replace("/");
        } else if (res.data.deleteResult) {
          alert("잘못된 비밀번호입니다.");
        } else {
          alert("[NETWORK ERROR] 다시 시도해주세요.")
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DeleteBox>
      <DataBox>
        <div className='title'>회원 탈퇴</div>
        {deleteInput ?
          <div className='content'>
            <div className='inputBox'>
              <div className='deleteDiv'>비밀번호를 입력해주세요.</div>
              <input type='password' value={pw} onChange={(e) => { setPw(e.target.value) }} />
            </div>
            <button onClick={checkDelete}>회원 탈퇴</button>
          </div>
          :
          <div className='content'>
            <div>탈퇴 시 모든 데이터가 삭제되며 복구되지 않습니다.</div>
            <button onClick={showDeleteInput}>회원 탈퇴</button>
          </div>}
      </DataBox>
    </DeleteBox>
  )
}

export default Delete

const DeleteBox = styled.div`
  width: 65%;
  @media screen and (max-width: 1040px) {
    width: 90%;
  }
`

const DataBox = styled.div`
margin-top: 20px;
padding-bottom: 10px;
  /* border-bottom: 1px solid #bdbdbd; */

  & .title{
    font-size: 20px;
    font-weight: bold;
  }

  & .content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    & div{
      font-size: 18px;
      color: grey;
      @media screen and (max-width: 1040px) {
          width: 95%;
      }
    }

    & .inputBox{
      width: 60%;
      & input{
        width: 50%;
      }
      @media screen and (max-width: 1040px) {
        width: 95%;
        & input{
          width: 80%;
        }
      }
      }
    }

    & button{
      width: 110px;
      height: 35px;
      border-radius: 17.5px;
      border-style: none;
      background-color: #ff5959;
      color: white;
      font-weight: bold;
      font-size: 15px;
      cursor: pointer;
    }
`