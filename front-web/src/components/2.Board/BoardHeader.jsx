import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext';
import axios from '../../axios';

import styled from 'styled-components';
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const BoardHeader = () => {
  const [thisBoardData, setThisBoardData] = useState([]);
  const loginUserData = useContext(UserContext);
  const location = useLocation().pathname;
  const { user_board } = useParams();
  const thisBoard = decodeURIComponent(user_board.substring(1));

  const [followState, setFollowState] = useState(false)
  const [follower, setFollower] = useState("0")
  const [following, setFollowing] = useState("0")

  const getThisBoardData = async () => {
    try {
      const response = await axios.post('/board/getThisBoardData', { thisBoard: thisBoard });
      const thisBoardData = response.data.getThisBoardDataResult;
      if (thisBoardData) {
        setThisBoardData(thisBoardData);
      } else {
        window.location.replace(location)
      }
    } catch (error) {
      console.error("Error fetching main data:", error);
    }
  }

  const getFollowState = async () => {
    try {
      const response = await axios.post('/board/getFollowState', { thisBoard: thisBoard, loginBoard: loginUserData?.user_board });
      const followState = response.data.followState;
      if (followState == undefined) {
        window.location.replace(location)
      } else {
        setFollowState(followState);
      }

    } catch (error) {
      window.location.replace(location)
      console.error("Error fetching main data:", error);
    }
  }

  const getFollowNumber = async () => {
    try {
      const response = await axios.post('/board/getFollowNumber', { thisBoard: thisBoard });
      const followNumber = response.data.followNumber;
      if (followNumber) {

      }
    } catch (error) {
      window.location.replace(location)
      console.error("Error fetching main data:", error);
    }
  }

  useEffect(() => {
    getThisBoardData();
    getFollowState();
  }, [])

  const follow = async () => {
    if (followState) {
      unFollowingBoard();
    } else {
      followingBoard();
    }
  }

  const followingBoard = async () => {
    try {
      const response = await axios.post('/board/followingBoard', { thisBoard: thisBoard, loginBoard: loginUserData?.user_board });
      const followingBoardResult = response.data.followingBoardResult;
      if (followingBoardResult) {
        setFollowState(followingBoardResult);
      } else {
        window.location.replace(location)
      }

    } catch (error) {
      window.location.replace(location)
      console.error("Error fetching main data:", error);
    }
  }

  const unFollowingBoard = async () => {
    try {
      const response = await axios.post('/board/unFollowingBoard', { thisBoard: thisBoard, loginBoard: loginUserData?.user_board });
      const unFollowingBoardResult = response.data.unFollowingBoardResult;
      if (!unFollowingBoardResult) {
        setFollowState(unFollowingBoardResult);
      } else {
        window.location.replace(location)
      }

    } catch (error) {
      window.location.replace(location)
      console.error("Error fetching main data:", error);
    }
  }

  return (
    <BoardHeaderBox>
      <ProfileBox>
        <ImgBox>
          <Img>
            <img src={thisBoardData?.user_profile_img} alt="유저사진" />
          </Img>
        </ImgBox>
        <IntroBox>
          <div className='name'>{thisBoardData?.user_name}</div>
          <div className='intro'>{thisBoardData?.user_intro}</div>
        </IntroBox>
      </ProfileBox>
      <FollowBox>
        <div className="follower">{`${follower} 팔로워`}</div>
        <div className="following">{`${following} 팔로잉`}</div>
      </FollowBox>
      <ContectBox>
        <div className="contect">
          <div className='github'><FaGithub /></div>
          <div className='google'><FcGoogle /></div>
        </div>
        {user_board != ("@" + loginUserData?.user_board) ?
          <div className={followState ? "followBtn true" : "followBtn false"}
            onClick={follow}>
            {followState ? "" : "팔로우"}
          </div> : <></>}
      </ContectBox>
      <BoardMenuBox color={location.split("/")[2]}>
        <Link to={`/${user_board}/list`}>
          <div className="list">보드</div>
        </Link>
        <Link to={`/${user_board}/series`}>
          <div className="series">시리즈</div>
        </Link>
        <Link to={`/${user_board}/intro`}>
          <div className="intro">소개</div>
        </Link>
      </BoardMenuBox>
    </BoardHeaderBox >
  )
}

export default BoardHeader

const BoardHeaderBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #bdbdbd;
  gap: 30px;
  @media screen and (max-width: 1040px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0 0 0;
`;

const Img = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid #bdbdbd;
  overflow: hidden;

  & img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    object-position: center;
  }
`;

const IntroBox = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
width: 70%;
height: 80px;
& .name{
  font-size: 30px;
  font-weight: bold;
}

& .intro{
  font-size: 20px;
  color: #868e86;
}

@media screen and (max-width: 1040px) {
    margin-top: 20px;
    width: 100%;
    height: 80px;
  }

`

const FollowBox = styled.div`
  width: 60%;
  display: flex;
  justify-content: end;
  gap: 15px;
  margin-bottom: 10px;

  & div{
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
    background-color: #950aff;
    width: fit-content;
    height: 35px;
    border-radius: 20px;
    padding: 0 15px 0 15px;
  }
    @media screen and (max-width: 1040px) {
    width: 100%;
  }
`;

const ContectBox = styled.div`
width: 60%;
display: flex;
justify-content: space-between;
align-items: center;
gap: 15px;

& .contect{
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 15px;
}

& .github{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: black;
  color: white;
  cursor: pointer;
}

& .google{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #bdbdbd;
  background-color: white;
  cursor: pointer;
}

& .followBtn{
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    width: fit-content;
    height: 30px;
    border-radius: 20px;
    padding: 0 15px 0 15px;
    cursor: pointer;
}

& .true{
    border: 2px solid #950AFF;
    color: white;
    background-color: #950AFF;

    &::before{
      content: "팔로잉";
    }
}

& .false{
    border: 2px solid #950AFF;
    color: #950AFF;
    background-color: white;
}

& .true:hover{
  border-color: #ff5959;
  color: white;
  background-color: #ff5959;
  &::before{
      content: "언팔로우";
    }
}

& .false:hover{
  color: white;
  background-color: #950AFF;
}
    @media screen and (max-width: 1040px) {
    width: 100%;
  }
`;

const BoardMenuBox = styled.div`
width: 60%;
margin: 100px 0 40px 0;
display: flex;
justify-content: center;
gap: 10px;

& a{
  width: 33%;
  color : black;
  text-decoration: none;
  font-size: 25px;
  font-weight: bold;

  & div{
    width: 100%;
    text-align: center;
  }

  & .${props => props.color}{
    color: #950AFF;
    border-bottom: 3px solid #950AFF;
  }
}
    @media screen and (max-width: 1040px) {
    width: 100%;
  }
`;