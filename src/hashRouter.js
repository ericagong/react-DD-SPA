// HashRouter 구현
class HashRouter {
  constructor() {
    this.routes = {};
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  #handleRoute(path) {
    const handler = this.routes[path] || this.routes["/404"];
    handler();
  }

  navigateTo(path) {
    if (!this.routes[path]) {
      path = "/404";
    }
    // Hash 기반 경로 업데이트
    window.location.hash = path;
  }

  initializeRoutes(routesConfig) {
    routesConfig.forEach(({ path, handler }) => this.addRoute(path, handler));
  }

  #getPath() {
    return window.location.hash.slice(1) || "/";
  }

  #bindSPAEventHandlers() {
    // 초기 렌더링 경로 처리
    document.addEventListener("DOMContentLoaded", () => {
      const path = this.#getPath();
      this.#handleRoute(path);
    });

    // 해시 변경 이벤트 처리
    window.addEventListener("hashchange", () => {
      const path = this.#getPath();
      this.#handleRoute(path);
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

// HashRouter 인스턴스 생성
const hashRouter = new HashRouter();
export default hashRouter;
