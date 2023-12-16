import React, { useState } from 'react'
import styled from 'styled-components';
import { AiFillCheckCircle } from "react-icons/ai";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";

import { Link } from "react-router-dom";
import axios from "../../axios";

const Login = () => {

  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')

  // 로그인 유지 체크 여부
  const [keepLogin, setKeepLogin] = useState(false);
  const checkKeepLogin = () => {
    setKeepLogin(!keepLogin);
  };

  // 로그인 함수
  const login = (e) => {
    e.preventDefault();
    console.log(email, pw);
    axios.post("/user/login", { email: email, pw: pw }).then((res) => {
      const loginData = res.data.loginResult;
      if (typeof loginData == "object") {
        alert(`${loginData.user_name}님 환영합니다!`);
        localStorage.setItem("loginData", JSON.stringify(loginData));
        window.location.replace("/");
      } else if (loginData) {
        alert("아이디 또는 비밀번호를 확인해주세요!");
      } else {
        alert("[NETWORK ERROR] 다시 시도해주세요.")
      }
    });
  };

  return (
    <LoginBack>
    <LoginBox>
      <Logo>
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/images/BackBoardLogo.png`} alt="백보드 로고" />
        </Link>
      </Logo>
      <LoginForm onSubmit={login}>
        <div>
          <input
            type="text"
            className="userInput"
            placeholder="이메일 ex) example@google.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="password"
            className="userInput"
            placeholder="비밀번호"
            onChange={(e) => {
              setPw(e.target.value);
            }}
          />
        </div>
        <LoginCheckBox onClick={checkKeepLogin}>
          {keepLogin ? (
            <AiFillCheckCircle id="check" className="checked" />
          ) : (
            <RiCheckboxBlankCircleLine id="check" className="noncheck" />
          )}
          <div style={{color:"grey"}}>로그인 상태 유지</div>
        </LoginCheckBox>
        <input type="submit" className="btnLogin" value="로그인" />
      </LoginForm>
      <div style={{fontSize:"15px", color:"grey"}}>────────── 소셜 로그인 ──────────</div>
      <SocialLogin>
        <div className='github'><FaGithub /></div>
        <div className='google'><FcGoogle /></div>
        <div className='kakao'><RiKakaoTalkFill /></div>
      </SocialLogin>
      <Join>
        <span>아직 계정이 없으신가요?</span>
        <Link to="/join" className="goToJoin">
          회원가입
        </Link>
      </Join>
    </LoginBox>
  </LoginBack>
);
};

export default Login

const LoginBack = styled.div`
  background-color: whitesmoke;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999999999;
`;

const LoginBox = styled.div`
  width: 100wh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
`;

const Logo = styled.div`
  & img {
    width: 380px;
    margin: 20px 0 10px 0;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  & input {
    border-radius: 10px;
    height: 60px;
  }

  & input::placeholder {
    color: #bdbdbd;
    font-size: 15px;
  }

  & .userInput {
    width: 365px;
    margin: 8px;
    border: none;
    padding-left: 12px;
  }

  & .btnLogin {
    width: 380px;
    margin-top: 30px;
    margin-bottom: 30px;
    background-color: #950AFF;
    border: none;
    color: white;
    font-size: 15px;
    cursor: pointer;
  }
`;

const LoginCheckBox = styled.div`
  display: flex;
  width: 380px;
  margin-top: 5px;
  & #check {
    font-size: 18px;
  }

  & .checked {
    color: #950AFF;
  }

  & .noncheck{
    color: grey;
  }

  & div {
    font-size: 14px;
    margin-left: 5px;
  }

  cursor: pointer;
`;

const SocialLogin = styled.div`
margin-top: 20px;
display: flex;
justify-content: space-between;
width: 220px;

& .github{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: black;
  color: white;
  cursor: pointer;
}

& .google{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid grey;
  background-color: white;
  cursor: pointer;
}

& .kakao{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: 	#FEE500;
  cursor: pointer;
}
`

const Join = styled.div`
  font-size: 12px;
  color: grey;
  margin-top: 40px;
  & .goToJoin {
    margin-left: 20px;
    text-decoration: none;
    color: #950AFF;
    font-weight: bold;
  }
`;