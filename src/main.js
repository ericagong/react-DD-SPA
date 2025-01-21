import router from "./router.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Profile from "./pages/Profile.js";
import NotFound from "./pages/NotFound.js";

const $rootEl = document.getElementById("root");

// 라우터 초기화
const initializeRouter = () => {
  const routesConfig = [
    { path: "/", handler: () => new Home($rootEl) },
    { path: "/login", handler: () => new Login($rootEl) },
    { path: "/profile", handler: () => new Profile($rootEl) },
    { path: "/404", handler: () => new NotFound($rootEl) },
  ];

  router.initializeRoutes(routesConfig);
};

// 앱 초기화
const initializeApp = () => {
  initializeRouter();
  router.start();
};

// 어플리케이션 시작
initializeApp();
