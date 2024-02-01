import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import axios from "../../axios";
import styled from 'styled-components';

const Join = () => {

  const nav = useNavigate();

  // 이름 관련 변수
  const [name, setName] = useState("");
  const [passName, setPassName] = useState(false);
  const checkName = () => {
    if (name != "") {
      setPassName(true);
    } else {
      setPassName(false);
    }
  };
  useEffect(() => {
    checkName();
  }, [name]);

  // 보드명 관련 변수
  const [board, setBoard] = useState("");
  const [passBoard, setPassBoard] = useState();
  const [passDupBoard, setPassDupBoard] = useState(false);
  const [checkBoardText, setCheckBoardText] = useState("");
  const checkBoard = () => {
    setPassDupBoard(false);
    if (board.length > 1 && board.length < 7) {
      setPassBoard(true);
      setCheckBoardText("* 보드명 중복 확인을 해주세요.");
    } else if (board == "") {
      setPassBoard();
      setCheckBoardText();
    } else {
      setPassBoard(false);
      setCheckBoardText("* 올바른 보드명을 입력해주세요.");
    }
  };
  useEffect(() => {
    checkBoard();
  }, [board]);

  const checkDupBoard = () => {
    axios.post("/user/join/checkDupBoard", { board: board }).then((res) => {
      if (res.data.checkDupBoardResult == board) {
        setPassBoard(true);
        setCheckBoardText("* 사용가능한 보드명 입니다.");
        setPassDupBoard(true);
      } else if (res.data.checkDupBoardResult) {
        setPassBoard(false);
        setCheckBoardText("* 중복된 보드명 입니다.");
      } else {
        alert("[NETWORK ERROR] 다시 시도해주세요.")
      }
    });
  };

  // 이메일 관련 변수
  const [email, setEmail] = useState("");
  const [passEmail, setPassEmail] = useState();
  const [passDupEmail, setPassDupEmail] = useState(false);
  const [checkEmailText, setCheckEmailText] = useState("");
  const checkEmail = () => {
    setPassDupEmail(false);
    if (email.includes("@") && email.includes(".")) {
      setPassEmail(true);
      setCheckEmailText("* 이메일 중복 확인을 해주세요.");
    } else if (email == "") {
      setPassEmail();
      setCheckEmailText();
    } else {
      setPassEmail(false);
      setCheckEmailText("* 올바른 이메일을 입력해주세요.");
    }
  };
  useEffect(() => {
    checkEmail();
  }, [email]);

  const checkDupEmail = () => {
    axios.post("/user/join/checkDupEmail", { email: email }).then((res) => {
      if (res.data.checkDupEmailResult == email) {
        setPassEmail(true);
        setPassDupEmail(true);
        setCheckEmailText("* 사용가능한 이메일 입니다.");
      } else if (res.data.checkDupEmailResult) {
        setPassEmail(false);
        setCheckEmailText("* 중복된 이메일 입니다.");
      } else {
        alert("[NETWORK ERROR] 다시 시도해주세요.")
      }
    });
  };

  // 비밀번호 관련 변수
  const [pw, setPw] = useState("");
  const [passPW, setPassPW] = useState();
  const [checkPWText, setCheckPWText] = useState("");
  const checkPW = () => {
    if (pw.length >= 8) {
      setPassPW(true);
      setCheckPWText();
    } else if (pw == "") {
      setPassPW();
      setCheckPWText();
    } else {
      setPassPW(false);
      setCheckPWText("* 올바른 비밀번호를 입력해주세요.");
    }
  };
  useEffect(() => {
    checkPW();
  }, [pw]);

  // 비밀번호 확인 관련 변수
  const [rePw, setRePw] = useState("");
  const [passRePW, setPassRePW] = useState();
  const [checkRePWText, setCheckRePWText] = useState("");
  const checkRePW = () => {
    if (rePw == "") {
      setPassRePW();
      setCheckRePWText();
    } else if (pw == rePw && rePw.length >= 8) {
      setPassRePW(true);
      setCheckRePWText();
    } else {
      setPassRePW(false);
      setCheckRePWText("* 비밀번호가 일치하는지 확인해주세요.");
    }
  };
  useEffect(() => {
    checkRePW();
  }, [rePw]);

  // 한줄 소개 관련 변수
  const [intro, setIntro] = useState("");
  const [passIntro, setPassIntro] = useState(false);
  const checkIntro = () => {
    if (intro != "") {
      setPassIntro(true);
    } else {
      setPassIntro(false);
    }
  };
  useEffect(() => {
    checkIntro();
  }, [intro]);

  const checkUserInput = () => {
    if (passDupEmail && passDupBoard && passPW && passRePW && passName) {
      join();
    } else {
      alert("회원가입 정보를 올바르게 입력해주세요.");
    }
  };

  const join = () => {
    axios.post('/user/join',
      {
        email: email,
        pw: pw,
        name: name,
        board: board,
        intro: intro
      })
      .then((res) => {
        if (res.data.joinResult) {
          alert("회원가입이 완료되었습니다.")
          nav('/login')
        } else {
          alert("[NETWORK ERROR] 다시 시도해주세요.")
        }
      })

  }

  return (
    <JoinBack>
      <JoinBox>
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/images/BackBoardLogo.png`} alt="백보드 로고" />
        </Link>
        <LoginDataBox>
          <LoginDataInput>
            <Title>
              환영합니다! 기본 회원 정보를 입력해주세요.
            </Title>
            <Input>
              <CheckBox>
                {passName ? (
                  <AiOutlineCheckCircle className="pass" />
                ) : (
                  <RiCheckboxBlankCircleLine className="init" />
                )}
              </CheckBox>
              <input
                className="normalInput"
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Input>
            <Warning></Warning>
            <Input>
              <CheckBox>
                {passBoard == null ? (
                  <RiCheckboxBlankCircleLine className="init" />
                ) : (
                  <>
                    {passBoard ? (
                      <AiOutlineCheckCircle className="pass" />
                    ) : (
                      <AiOutlineCloseCircle className="warn" />
                    )}
                  </>
                )}
              </CheckBox>
              <input
                className="dupCheckInput"
                type="text"
                placeholder="보드명 (2~6글자)"
                value={board}
                onChange={(e) => {
                  setBoard(e.target.value);
                }}
              />
              <DupCheckBox onClick={checkDupBoard}>중복확인</DupCheckBox>
            </Input>
            {passBoard ? (
              <Passed>{checkBoardText}</Passed>
            ) : (
              <Warning>{checkBoardText}</Warning>
            )}
            <Input>
              <CheckBox>
                {passEmail == null ? (
                  <RiCheckboxBlankCircleLine className="init" />
                ) : (
                  <>
                    {passEmail ? (
                      <AiOutlineCheckCircle className="pass" />
                    ) : (
                      <AiOutlineCloseCircle className="warn" />
                    )}
                  </>
                )}
              </CheckBox>
              <input
                className="dupCheckInput"
                type="text"
                placeholder="이메일 (example@gmail.com)"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <DupCheckBox onClick={checkDupEmail}>중복확인</DupCheckBox>
            </Input>
            {passEmail ? (
              <Passed>{checkEmailText}</Passed>
            ) : (
              <Warning>{checkEmailText}</Warning>
            )}

            <Input>
              <CheckBox>
                {passPW == null ? (
                  <RiCheckboxBlankCircleLine className="init" />
                ) : (
                  <>
                    {passPW ? (
                      <AiOutlineCheckCircle className="pass" />
                    ) : (
                      <AiOutlineCloseCircle className="warn" />
                    )}
                  </>
                )}
              </CheckBox>
              <input
                className="normalInput"
                type="password"
                placeholder="비밀번호 (8자리 이상) "
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value);
                }}
              />
            </Input>

            <Warning>{checkPWText}</Warning>
            <Input>
              <CheckBox>
                {passRePW == null ? (
                  <RiCheckboxBlankCircleLine className="init" />
                ) : (
                  <>
                    {passRePW ? (
                      <AiOutlineCheckCircle className="pass" />
                    ) : (
                      <AiOutlineCloseCircle className="warn" />
                    )}
                  </>
                )}
              </CheckBox>
              <input
                className="normalInput"
                type="password"
                placeholder="비밀번호 확인"
                value={rePw}
                onChange={(e) => {
                  setRePw(e.target.value);
                }}
              />
            </Input>
            <Warning>{checkRePWText}</Warning>
            <Input>
              <CheckBox>
                {passIntro ? (
                  <AiOutlineCheckCircle className="pass" />
                ) : (
                  <RiCheckboxBlankCircleLine className="init" />
                )}
              </CheckBox>
              <input
                className="normalInput"
                type="text"
                placeholder="한줄 소개(공백입력 가능)"
                value={intro}
                onChange={(e) => {
                  setIntro(e.target.value);
                }}
              />
            </Input>
            <Warning></Warning>
          </LoginDataInput>
          <button onClick={checkUserInput}>회원 가입</button>
        </LoginDataBox>
      </JoinBox>
    </JoinBack>
  )
}

export default Join

const JoinBack = styled.div`
  background-color: whitesmoke;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999999999;
`;

const JoinBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & img {
    width: 380px;
    margin: 30px 0 10px 0;
  }
`;

const LoginDataBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  & input {
    height: 50px;

    margin: 5px;
    border: none;
    background-image: url("/images/User");
    background-repeat: no-repeat;
    background-size: 32px;
    background-position: 10px center;
  }
  & .dupCheckInput {
    width: 290px;
  }

  & .normalInput {
    border-radius: 0 10px 10px 0;
    width: 340px;
  }

  & input::placeholder {
    color: #bdbdbd;
    font-size: 14px;
  }

  & input:focus {
    outline: none;
  }

  & button {
    color: white;
    font-size: 15px;
    border-radius: 10px;
    box-shadow: none;
    height: 50px;
    width: 390px;
    margin: 8px;
    background-color: #950AFF;
    border: none;
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-size: 13px;
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const LoginDataInput = styled.div`
  height: 600px;
`;

const Input = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Warning = styled.div`
  padding-left: 15px;
  margin-bottom: 10px;
  height: 15px;
  color: red;
  font-size: 12px;
`;

const Passed = styled.div`
  padding-left: 15px;
  margin-bottom: 10px;
  height: 15px;
  color: green;
  font-size: 12px;
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  margin-right: -5px;
  height: 52px;
  width: 40px;
  font-size: 25px;
  background-color: white;
  & .init {
    color: #bdbdbd;
  }
  & .pass {
    color: green;
  }
  & .warn {
    color: red;
  }
`;

const DupCheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-left: -5px;
  height: 52px;
  width: 50px;
  font-size: 10px;
  color: white;
  background-color: #950AFF;
  cursor: pointer;
`;