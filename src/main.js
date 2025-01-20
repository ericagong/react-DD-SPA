import router from "./router.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Profile from "./pages/Profile.js";
import NotFound from "./pages/NotFound.js";
import UserStorage from "./UserStorage.js";

// 라우터 초기화
const initializeRouter = () => {
  router.addRoute("/", Home);
  router.addRoute("/login", Login);
  router.addRoute("/profile", Profile);
  router.addRoute("/404", NotFound);
};

// 이벤트 하이재킹
const hijackGlobalEventListeners = () => {
  // 초기 렌더링 이벤트
  document.addEventListener("DOMContentLoaded", () => {
    router.handleRoute(window.location.pathname);
  });

  // a 태그 클릭 이벤트
  document.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      const path = e.target.getAttribute("href");
      router.navigateTo(path);
    }
  });
};

// 이벤트 리스너 초기화
const initializeEventListeners = () => {
  // 로그인 form submit 이벤트
  document.addEventListener("submit", (e) => {
    if (e.target && e.target.id === "login-form") {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      if (username) {
        UserStorage.saveUser({ username, email: "", bio: "" });
        router.navigateTo("/");
      }
    }
  });

  // 로그아웃 버튼 클릭 이벤트
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "logout") {
      UserStorage.clearUser();
      router.navigateTo("/login");
    }
  });

  // 프로필 form submit 이벤트
  document.addEventListener("submit", (e) => {
    if (e.target && e.target.id === "profile-form") {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const bio = document.getElementById("bio").value.trim();

      if (username) {
        UserStorage.saveUser({ username, email, bio });
        router.navigateTo("/profile");
      }
    }
  });

  // SPA 처리 위한 이벤트 hijacking
  hijackGlobalEventListeners();
};

initializeRouter();
initializeEventListeners();
