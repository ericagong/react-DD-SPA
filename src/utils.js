import UserStorage from "./UserStorage.js";

// 컴포넌트 렌더링 함수
export const updateDOM = (html) => {
  document.getElementById("root").innerHTML = html;
};

// 로그인 상태 확인 함수
export const isAuthenticated = () => {
  return !!UserStorage.getUser();
};
