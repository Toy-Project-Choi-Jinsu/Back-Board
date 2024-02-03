import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../axios'
import styled from 'styled-components';

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
        {mainData.map((data) => {
          return (
            <Link to={`/@${data.user_board}/${data.bd_title}`} key={data.bd_idx}>
              <Content>
                <div className='titleImg'>
                  <img src={data.bd_title_img} alt="타이틀 이미지" />
                </div>
                <div className='title'>{data.bd_title}</div>
                <div className='content'>{data.bd_content}</div>
                <div className='created_at'>{data.bd_created_at}</div>
              </Content>
            </Link>
          )
        })}
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

const Content = styled.div`
border: 1px solid black;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: 400px;
    margin-bottom: 50px;

    & .titleImg{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 150px;
        overflow: hidden;
            & img{
            width: 100%;
            }
        }
        & .title{
        font-size: 14px;
        color: grey;
        }
        
        & .content{
        font-size: 20px;
        font-weight: bold;
        margin: -5px 0 - 5px 0;
        }
        
        & .created_at{
            
        }

    @media only screen and (max-width: 430px) {
        width: 370px;
        height: 470px;

        & .titleImg{
            height: 180px;
        }
    }
`