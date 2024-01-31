const jwt = require("jsonwebtoken");

const getJwtAuth = (token, key) => {
    try {
        const jwtAuth = jwt.verify(token, key);
        return console.log("토큰 인증 성공."), jwtAuth.user_email
    } catch (error) {
        // 인증 실패
        // 유효시간이 초과된 경우
        if (error.name === "TokenExpiredError") {
            return console.log("토큰이 만료되었습니다."), false
        }
        // 토큰의 비밀키가 일치하지 않는 경우
        if (error.name === "JsonWebTokenError") {
            return console.log("유효하지 않은 토큰입니다."), false
        }
    }
}

module.exports = getJwtAuth;