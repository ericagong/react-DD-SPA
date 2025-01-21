import hashRouter from "./hashRouter.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Profile from "./pages/Profile.js";
import NotFound from "./pages/NotFound.js";

const $rootEl = document.getElementById("root");

// 라우터 초기화
const initializeRouter = () => {
  const routesConfig = [
    {
      path: "/",
      handler: () => new Home($rootEl),
    },
    {
      path: "/login",
      handler: () => new Login($rootEl),
    },
    {
      path: "/profile",
      handler: () => {
        const user = localStorage.getItem("user");
        if (!user) {
          // 로그인되지 않은 경우, 로그인 페이지로 리다이렉트
          hashRouter.navigateTo("/login");
          return;
        }
        new Profile($rootEl);
      },
    },
    {
      path: "/404",
      handler: () => new NotFound($rootEl),
    },
  ];

  routesConfig.forEach(({ path, handler }) =>
    hashRouter.addRoute(path, handler),
  );
};

// 앱 초기화
const initializeApp = () => {
  initializeRouter();
  hashRouter.start();
};

// 어플리케이션 시작
initializeApp();
