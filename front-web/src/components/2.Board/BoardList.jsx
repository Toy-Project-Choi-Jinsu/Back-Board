import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import styled from 'styled-components';

const BoardList = () => {
    const userData = useContext(UserContext);
    return (
        <div>
            List
        </div>
    )
}

export default BoardList

const ProfileBox = styled.div`
    
`;
