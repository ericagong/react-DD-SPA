// SPA 라우터 구현
class Router {
  constructor() {
    this.routes = {};
  }

  #addRoute(path, handler) {
    this.routes[path] = handler;
  }

  #handleRoute(path) {
    const handler = this.routes[path] || this.routes["/404"];
    handler();
  }

  hasRoute(path) {
    return !!this.routes[path];
  }

  navigateTo(path) {
    if (!this.hasRoute(path)) {
      path = "/404";
    }
    // SPA 핵심 로직
    history.pushState(null, "", path);
    this.#handleRoute(path);
  }

  initializeRoutes(routesConfig) {
    routesConfig.forEach(({ path, handler }) => this.#addRoute(path, handler));
  }

  #bindSPAEventHandlers() {
    // 초기 렌더링 경로 처리
    document.addEventListener("DOMContentLoaded", () => {
      this.#handleRoute(window.location.pathname);
    });

    // 브라우저 뒤로가기/앞으로가기 처리
    window.addEventListener("popstate", () => {
      this.#handleRoute(window.location.pathname);
    });

    // 앵커 태그 클릭 이벤트 하이재킹
    document.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        const path = e.target.getAttribute("href");
        this.navigateTo(path);
      }
    });
  }

  start() {
    this.#bindSPAEventHandlers();
  }
}

// Router 인스턴스 생성
const router = new Router();
export default router;
