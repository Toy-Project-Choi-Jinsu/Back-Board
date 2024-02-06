import React, { useContext, useEffect, useState } from 'react'
import axios from '../../axios';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../contexts/UserContext';

const Follow = () => {
    const loginUserData = useContext(UserContext);
    const thisBoard = useLocation().state.thisBoard;
    const loginBoard = useLocation().state.loginBoard;
    const location = useLocation().pathname;
    const type = location.split('/')[2];
    const [followList, setFollowList] = useState([]);
    const [loginUserFollowingList, setLoginUserFollowingList] = useState([]);
    const getFollowerList = async () => {
        try {
            const response = await axios.post('/board/getFollowerList', { thisBoard: thisBoard });
            const followerList = response.data.followerList;
            if (followerList) {
                setFollowList(followerList);
            } else if (followerList == null) {
                setFollowList([]);
            } else {
                throw Error
            }
        } catch (error) {
            window.location.replace(location)
            console.error("Error fetching main data:", error);
        }
    }

    const getFollowingList = async () => {
        try {
            const response = await axios.post('/board/getFollowingList', { thisBoard: thisBoard });
            const followingList = response.data.followingList;
            if (followingList) {
                setFollowList(followingList);
            } else if (followingList == null) {
                setFollowList([])
            } else {
                throw Error
            }
        } catch (error) {
            window.location.replace(location)
            console.error("Error fetching main data:", error);
        }
    }

    const getLoginUserFollowingList = async () => {
        try {
            const response = await axios.post('/board/getFollowingList', { thisBoard: loginBoard });
            const loginUserFollowingList = response.data.followingList;
            if (loginUserFollowingList) {
                setLoginUserFollowingList(loginUserFollowingList);
            } else if (loginUserFollowingList == null) {
                setLoginUserFollowingList([])
            } else {
                throw Error
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        getLoginUserFollowingList();
        if (type === "followers") {
            getFollowerList();
        } else {
            getFollowingList();
        }
    }, [])

    const goToMyBoard = () => {
        window.location.replace(`/@${loginBoard}/list`)
    }

    const goToBoard = (board) => {
        window.location.replace(`/@${board}/list`)
    }

    // 재사용 리팩토링 하기
    const follow = (result, board) => {
        if (result) {
            unFollowingBoard(board);
        } else {
            followingBoard(board);
        }
    }

    const followingBoard = async (board) => {
        try {
            const response = await axios.post('/board/followingBoard', { thisBoard: board, loginBoard: loginBoard });
            const followingBoardResult = response.data.followingBoardResult;
            if (followingBoardResult) {
                setLoginUserFollowingList([...loginUserFollowingList, board])
            } else {
                window.location.replace(location)
            }

        } catch (error) {
            window.location.replace(location)
            console.error("Error fetching main data:", error);
        }
    }

    const unFollowingBoard = async (board) => {
        try {
            const response = await axios.post('/board/unFollowingBoard', { thisBoard: board, loginBoard: loginBoard });
            const unFollowingBoardResult = response.data.unFollowingBoardResult;
            if (!unFollowingBoardResult) {
                const indexToRemoveLogin = loginUserFollowingList.indexOf(board);
                const updatedFollowingList = [...loginUserFollowingList];
                updatedFollowingList.splice(indexToRemoveLogin, 1);
                setLoginUserFollowingList(updatedFollowingList)
                if (loginBoard == thisBoard) {
                    const indexToRemoveThis = followList.indexOf(board);
                    const updatedFollowList = [...followList];
                    updatedFollowList.splice(indexToRemoveThis, 1);
                    setFollowList(updatedFollowList)
                }
            } else {
                window.location.replace(location)
            }

        } catch (error) {
            window.location.replace(location)
            console.error("Error fetching main data:", error);
        }
    }

    return (
        <FollowBox>
            {type === "followers" ? <div className='title'>팔로워</div> : <div className='title'>팔로잉</div>}
            {followList.map((board) => {
                return (
                    <FollowList key={board}>
                        <div className="name" onClick={() => goToBoard(board)}>
                            {board}
                        </div>
                        {board != (loginBoard) ?
                            <div className={loginUserFollowingList.includes(board) ? "followBtn true" : "followBtn false"}
                                onClick={() => follow(loginUserFollowingList.includes(board), board)}>
                                {loginUserFollowingList.includes(board) ? "" : "팔로우"}
                            </div> : <div className='followBtn loginBoard' onClick={goToMyBoard}>내 보드</div>}
                    </FollowList>
                )
            })}
        </FollowBox>
    )
}

export default Follow

const FollowBox = styled.div`
  width  : 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .title{
    font-size: 35px;
    font-weight: bold;
    margin: 80px 0 30px 0;
  }
`;

const FollowList = styled.div`
width: 15%;
display: flex;
justify-content: space-between;
align-items: center;
margin: 10px 0 10px 0;

& .name{
    font-size: 25px;
    font-weight: bold;
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

& .loginBoard{
    border: 2px solid #950AFF;
    color: white;
    background-color: #950AFF;
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
    width: 55%;
  }
`;