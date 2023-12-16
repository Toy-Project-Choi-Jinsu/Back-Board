import { Routes, Route} from "react-router-dom";
import Header from "./components/0.Header/Header";
import Main from "./components/1.Main/Main";
import Blog from "./components/2.Blog/Blog";
import TempWrite from "./components/3.TempWrite/TempWrite";
import NewWrite from "./components/4.NewWrite/NewWrite";
import Read from "./components/5.Read/Read";
import MyPage from "./components/6.MyPage/MyPage";
import Login from "./components/0.Header/Login";
import Join from "./components/0.Header/Join";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}>
          {/* <Route path="/rank" element={<Rank />}></Route>
          <Route path="/recent" element={<Recent />}></Route> */}
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/tempwrite" element={<TempWrite />}></Route>
        <Route path="/newwrite" element={<NewWrite />}></Route>
        <Route path="/read" element={<Read />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
