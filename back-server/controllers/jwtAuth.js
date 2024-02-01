const jwt = require("jsonwebtoken");

module.exports = {
    signToken: (payload, expiresIn) => {
        const key = process.env.SECRECT_KEY
        return jwt.sign(payload, key, { expiresIn: expiresIn })
    },
    verifyToken: (req, res, next) => {
        const accessToken = req.headers['authorization'].split('"')[1];
        const key = process.env.SECRECT_KEY
        try {
            const decoded = jwt.verify(accessToken, key);
            console.log("토큰 인증 성공.")
            req.token = decoded.user_email;
            next();
        } catch (error) {
            // 인증 실패
            // 유효시간이 초과된 경우
            if (error.name === "TokenExpiredError") {
                console.log("토큰이 만료되었습니다.");
                res.json({ headers: false })
            }
            // 토큰의 비밀키가 일치하지 않는 경우
            if (error.name === "JsonWebTokenError") {
                console.log("유효하지 않은 토큰입니다.");
                res.json({ headers: false })
            }
        }
    },
};