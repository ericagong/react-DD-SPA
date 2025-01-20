// SPA 라우터 구현
class Router {
  constructor() {
    this.routes = {};
    // router event listener 하이재킹
    // 브라우저 뒤로가기, 앞으로가기 이벤트
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    const handler = this.routes[path] || this.routes["/404"];
    handler();
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    if (!this.routes[path]) {
      path = "/404";
    }
    history.pushState(null, "", path);
    this.handleRoute(path);
  }
}

// 라우터 인스턴스 생성
const router = new Router();
export default router;
