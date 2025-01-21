import router from "./router.js";

// HashRouter 구현
class HashRouter {
  constructor(router) {
    this.router = router;
  }

  navigateTo(path) {
    if (!this.router.hasRoute(path)) {
      path = "/404";
    }
    // Hash 기반 경로 업데이트
    window.location.hash = path;
  }

  #getPath() {
    return window.location.hash.slice(1) || "/";
  }

  #handleRoute() {
    const path = this.#getPath();
    this.router.navigateTo(path);
  }

  initializeRoutes(routesConfig) {
    this.router.initializeRoutes(routesConfig);
  }

  #bindSPAEventHandlers() {
    // 초기 렌더링 경로 처리
    document.addEventListener("DOMContentLoaded", () => {
      this.#handleRoute();
    });

    // 해시 변경 이벤트 처리
    window.addEventListener("hashchange", () => {
      this.#handleRoute();
    });

    // 앵커 태그 클릭 이벤트 하이재킹
    document.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        const href = e.target.getAttribute("href");
        if (href?.startsWith("#")) {
          e.preventDefault();
          const path = href.slice(1);
          this.navigateTo(path);
        }
      }
    });
  }

  start() {
    this.#bindSPAEventHandlers();
  }
}

// HashRouter 인스턴스 생성
const hashRouter = new HashRouter(router);
export default hashRouter;
