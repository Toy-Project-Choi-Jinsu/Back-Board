import { Routes, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import axios from "./axios";

import Header from "./components/0.Header/Header";
import Main from "./components/1.Main/Main";
import Board from "./components/2.Board/Board";
import TempWrite from "./components/3.TempWrite/TempWrite";
import NewBoard from "./components/4.NewBoard/NewBoard";
import Read from "./components/5.Read/Read";
import MyPage from "./components/6.MyPage/MyPage";
import Login from "./components/0.Header/Login";
import Join from "./components/0.Header/Join";
import { useEffect, useState } from "react";
import BoardDetail from "./components/2.Board/BoardDetail";
import BoardList from "./components/2.Board/BoardList";
import BoardSeries from "./components/2.Board/BoardSeries";
import BoardIntro from "./components/2.Board/BoardIntro";
import Follow from "./components/2.Board/Follow";

function App() {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const response = await axios.post('/user/getUserData');
      const userData = response.data.getUserDataResult;
      if (userData) {
        setUserData(userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (accessToken != null) {
      getUserData();
    }
  }, []);

  return (
    <div>
      {/* UserContext.Provider를 새로운 값을 통해 업데이트 */}
      <UserContext.Provider value={userData}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/join" element={<Join />}></Route>
          <Route path="/:user_board" element={<Board />}>
            <Route path="/:user_board/list" element={<BoardList />}></Route>
            <Route path="/:user_board/series" element={<BoardSeries />}></Route>
            <Route path="/:user_board/intro" element={<BoardIntro />}></Route>
            <Route path="/:user_board/followers" element={<Follow />}></Route>
            <Route path="/:user_board/followings" element={<Follow />}></Route>
            <Route path="/:user_board/:bd_title" element={<BoardDetail />}></Route>
          </Route>
          <Route path="/tempwrite" element={<TempWrite />}></Route>
          <Route path="/newboard" element={<NewBoard />}></Route>
          <Route path="/read" element={<Read />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
