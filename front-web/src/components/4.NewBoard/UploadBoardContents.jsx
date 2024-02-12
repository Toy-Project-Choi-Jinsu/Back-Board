import React from 'react'

const UploadBoardContents = ({ close }) => {
    return (
        <div>
            <div>
                <div>포스트 미리보기</div>
                <img src="" alt="" />
                <div>title</div>
                <div>content</div>
            </div>
            <div>
                <div>공개 설정</div>
                <div>라디오 버튼</div>
                <div>시리즈 설정</div>
                <div>시리즈 선택 버튼</div>
                <div>
                    <button onClick={close}>취소</button>
                    <button onClick={close}>업로드</button>
                </div>
            </div>
        </div>
    )
}

export default UploadBoardContents
