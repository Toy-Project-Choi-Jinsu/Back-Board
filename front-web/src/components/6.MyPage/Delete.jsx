import React from 'react'
import styled from 'styled-components'

const Delete = () => {
  return (
    <DeleteBox>
    <DataBox>
      <div className='title'>회원 탈퇴</div>
      <div className='content'>
        <div>탈퇴 시 모든 데이터가 삭제되며 복구되지 않습니다.</div>
        <button>회원 탈퇴</button>
      </div>
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

    & div{
      font-size: 18px;
      color: grey;
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
  }
`