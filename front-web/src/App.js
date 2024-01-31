import { Routes, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import axios from "./axios";

import Header from "./components/0.Header/Header";
import Main from "./components/1.Main/Main";
import Blog from "./components/2.Blog/Blog";
import TempWrite from "./components/3.TempWrite/TempWrite";
import NewWrite from "./components/4.NewWrite/NewWrite";
import Read from "./components/5.Read/Read";
import MyPage from "./components/6.MyPage/MyPage";
import Login from "./components/0.Header/Login";
import Join from "./components/0.Header/Join";
import { useEffect, useState } from "react";

function App() {
  const accessToken = JSON.parse(localStorage.getItem("loginData"));
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const response = await axios.post('/user/getUserData', { accessToken });
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
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/tempwrite" element={<TempWrite />}></Route>
          <Route path="/newwrite" element={<NewWrite />}></Route>
          <Route path="/read" element={<Read />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
