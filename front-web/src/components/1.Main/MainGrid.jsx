import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const MainGrid = ({ data }) => {
    return (
        <Link to={`/@${data.user_board}/${data.bd_title}`}>
            <Content>
                <div className='titleImg'>
                    <img src={data.bd_title_img} alt="sss" />
                </div>
                <div className='title'>{data.bd_title}</div>
                <div className='content'>{data.bd_content}</div>
                <div className='created_at'>{data.bd_created_at}</div>
            </Content>
        </Link>
    )
}

export default MainGrid

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