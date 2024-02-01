import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import styled from 'styled-components';
import MainGrid from './MainGrid';

const Main = () => {
  const [mainData, setMainData] = useState([]);
  const getMainData = async () => {
    try {
      const response = await axios.post('/getMainData');
      const mainData = response.data.getMainDataResult;
      if (mainData) {
        setMainData(mainData);
      } else {
        window.location.replace('/');
      }
    } catch (error) {
      console.error("Error fetching main data:", error);
    }
  };

  useEffect(() => {
    getMainData();
  }, [])

  return (
    <MainBox>
      <Contents>
        {mainData.map((data) => <MainGrid key={data.bd_idx} data={data} />)}
      </Contents>
    </MainBox>
  )
}

export default Main
const MainBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const Contents = styled.div`
    margin-top: 20px;
    display: grid;
    width: 80%;
    grid-template-columns: repeat(auto-fill, minmax(300px, auto));
    gap: 40px;
    justify-content: center;

    @media only screen and (max-width: 430px) {
        width: 90%;
    }
`;