import router from "./router.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Profile from "./pages/Profile.js";
import NotFound from "./pages/NotFound.js";
import UserStorage from "./UserStorage.js";

// 라우터 초기화
const initializeRouter = () => {
  const routesConfig = [
    { path: "/", handler: Home },
    { path: "/login", handler: Login },
    { path: "/profile", handler: Profile },
    { path: "/404", handler: NotFound },
  ];

  routesConfig.forEach(({ path, handler }) => router.addRoute(path, handler));
};

// 이벤트 리스너 초기화
const initializeEventListeners = () => {
  // 로그인 폼 제출 이벤트
  document.addEventListener("submit", (e) => {
    if (e.target && e.target.id === "login-form") {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      if (username) {
        UserStorage.saveUser({ username, email: "", bio: "" });
        router.navigateTo("/");
      }
    }

    // 프로필 폼 제출 이벤트
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

  // 로그아웃 버튼 클릭 이벤트
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "logout") {
      UserStorage.clearUser();
      router.navigateTo("/login");
    }
  });
};

// 앱 초기화
const initializeApp = () => {
  initializeRouter();
  initializeEventListeners();
  router.start();
};

// 어플리케이션 시작
initializeApp();
