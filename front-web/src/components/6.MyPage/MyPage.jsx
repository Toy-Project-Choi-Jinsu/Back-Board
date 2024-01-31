import React from 'react'
import BasicInfo from './BasicInfo'
import UserData from './UserData'
import Delete from './Delete'
import styled from 'styled-components'

const MyPage = () => {
  return (
    <MyPageBox>
      <UserDataBox>
      <BasicInfo/>
      <UserData/>
      <Delete/>
      </UserDataBox>
    </MyPageBox>
  )
}

export default MyPage

const MyPageBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 84vh;
  padding: 30px 0 30px 0;
  background-color: whitesmoke;
`;

const UserDataBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 93%;
  padding: 30px 0 30px 0;
  background-color: white;
  border-radius: 20px;
  @media screen and (max-width: 1040px) {
    width: 90%;
    padding: 0 0 30px 0;
  }
`;