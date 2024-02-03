import React, { useContext } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { UserContext } from '../../contexts/UserContext';

import BoardHeader from './BoardHeader';

const Board = () => {
  const userData = useContext(UserContext);
  const location = useLocation().pathname.split("/")[2];
  return (
    <BoardBox>
      {(location == 'list' || location == 'series' || location == 'intro') ?
        <BoardHeader />
        :
        <></>}
      <Outlet />
    </BoardBox>
  )
}

export default Board

const BoardBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;