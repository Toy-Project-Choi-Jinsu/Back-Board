import axios from "axios";

const instance = axios.create({
  baseURL: "http://172.30.1.26:5555"
});

const setAuthToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
}

setAuthToken();

instance.interceptors.response.use(
  (response) => {
    // 성공적인 응답 처리 로직
    if (response.data.headers === false) {
      alert("로그인 정보가 만료되었습니다. 다시 로그인 해주세요.")
      localStorage.clear();
      window.location.replace('/login');
    }
    return response;
  }
);

export default instance;