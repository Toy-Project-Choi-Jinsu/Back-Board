import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams, Link } from 'react-router-dom';
import axios from '../../axios';
import { UserContext } from '../../contexts/UserContext'

import styled from 'styled-components';

const BoardList = () => {
    const loginUserData = useContext(UserContext);
    const { user_board } = useParams();
    const location = useLocation().pathname;
    const thisBoard = decodeURIComponent(user_board.substring(1));
    const [thisBoardList, setThisBoardList] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const getThisBoardList = async () => {
        try {
            const response = await axios.post('/board/getThisBoardList', { thisBoard: thisBoard });
            const boardList = response.data.getThisBoardListResult;
            if (boardList || boardList.length == 0) {
                setThisBoardList(boardList);
            } else {
                window.location.replace(location)
            }
        } catch (error) {
            console.error("Error fetching main data:", error);
        }
    };

    // 화면 크기 줄어들 시 사이드바로 전환
    const handelResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        getThisBoardList();
        window.addEventListener("resize", handelResize);
        return () => {
            window.removeEventListener("resize", handelResize);
        };
    }, [])


    const itemsPerPage = 5; // 한 페이지에 표시될 아이템 개수
    const [currentPage, setCurrentPage] = useState(1);

    // 현재 페이지에 표시할 데이터 계산
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = thisBoardList.slice(startIndex, endIndex);

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(thisBoardList.length / itemsPerPage);

    // 페이지 이동 함수
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    return (
        <React.Fragment>
            <BoardListBox>
                <InputBox><input type="text" placeholder=' 검색어를 입력하세요.' /></InputBox>
                <ContentsBox color={`page${currentPage}`}>
                    <div className="tagMenu">
                        {windowWidth < 430 ? <></> : <div className="title">태그 목록</div>}

                        <div className='tag'>전체보기</div>
                        <div className='tag'>백엔드</div>
                        <div className='tag'>자바</div>
                        <div className='tag'>Node.js</div>
                        <div className='tag'>React.js</div>
                        <div className='tag'>MySQL</div>
                    </div>
                    <div className="contents">
                        {currentData.map((data) => {
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
                        <div className='pageNum'>
                            {Array.from({ length: totalPages },
                                (_, index) => index + 1).map((page) => (
                                    <button className={`page${page}`} key={page}
                                        onClick={() => handlePageChange(page)}>
                                        {page}
                                    </button>
                                ))}
                        </div>
                    </div>
                </ContentsBox>
            </BoardListBox>
        </React.Fragment>
    )
}

export default BoardList

const BoardListBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
    width: 80%;
`;

const InputBox = styled.div`
    width: 60%;
    text-align: end;
    margin-bottom: 30px;
    & input{
        width: 250px;
        height: 30px;
        font-size: 20px;
    }
`;

const ContentsBox = styled.div`
    display: flex;
    width: 100%;

    & .tagMenu{
        width: 15%;
        display: flex;
        flex-direction: column;
        gap: 5px;
        & .title{
            border-bottom: 2px solid #bdbdbd;
            padding-bottom: 10px;
            font-size:18px;
            color: grey;
        }

        & .tag{
            width: fit-content;
            white-space: nowrap;
        }

        & .tag:hover{
            color: #950aff;
        }
    }

    & .contents{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 70%;
        min-height: 600px;

        & .pageNum{
            display: flex;
            gap: 20px;
            margin-bottom:50px;
            & button{
                border: none;
                font-size:25px;
                cursor: pointer;
            }

            & .${props => props.color}{
                color: #950aff;
                font-weight:bold;
                font-size: 27px;
            }
        }
    }

    @media only screen and (max-width: 430px) {
            flex-direction: column;
            align-items: center;
        
        & .tagMenu{
            overflow-x: scroll;
            max-width: 400px;
            width: 100%;
            flex-direction: row;
            gap: 10px;
            margin-bottom: 20px;

            & .tag{
                display: flex;
                align-items: center;
                border: 1px solid black;
                border-radius: 20px;
                padding: 0 10px 0 10px;
                height: 25px;
            }

            & .tag:hover{
                color: white;
                font-weight: bold;
                background-color: #950aff;
            }
        }
    }
`;

const Content = styled.div`
border: 1px solid black;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: 500px;
    margin-bottom: 50px;

    & .titleImg{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 250px;
        overflow: hidden;
            & img{
            width: 100%;
            object-fit: cover;
            object-position:center;
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