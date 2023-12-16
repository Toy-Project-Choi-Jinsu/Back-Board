import React from 'react'
import BasicInfo from './BasicInfo'
import UserData from './UserData'
import Delete from './Delete'
import styled from 'styled-components'

const MyPage = () => {
  return (
    <MyPageBox>
      <BasicInfo/>
      <UserData/>
      <Delete/>
    </MyPageBox>
  )
}

export default MyPage

const MyPageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;