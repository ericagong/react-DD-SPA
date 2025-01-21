import Component from "../core/Component.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import UserStorage from "../UserStorage.js";
import router from "../router.js";

export default class Home extends Component {
  template() {
    return `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <div id="header-container"></div>
          <main class="p-4">
            <div class="mb-4 bg-white rounded-lg shadow p-4">
              <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
              <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
            </div>

            <div class="space-y-4">
              <div class="bg-white rounded-lg shadow p-4">
                <div class="flex items-center mb-2">
                  <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
                  <div>
                    <p class="font-bold">홍길동</p>
                    <p class="text-sm text-gray-500">5분 전</p>
                  </div>
                </div>
                <p>오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!</p>
                <div class="mt-2 flex justify-between text-gray-500">
                  <button>좋아요</button>
                  <button>댓글</button>
                  <button>공유</button>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow p-4">
                <div class="flex items-center mb-2">
                  <img src="https://via.placeholder.com/40" alt="프로필" class="rounded-full mr-2">
                  <div>
                    <p class="font-bold">김철수</p>
                    <p class="text-sm text-gray-500">15분 전</p>
                  </div>
                </div>
                <p>새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!</p>
                <div class="mt-2 flex justify-between text-gray-500">
                  <button>좋아요</button>
                  <button>댓글</button>
                  <button>공유</button>
                </div>
              </div>
              <!-- 더 많은 게시물들 생략 -->
            </div>
          </main>
          <div id="footer-container"></div>
        </div>
      </div>
    `;
  }

  mounted() {
    const $headerEl = document.getElementById("header-container");
    const $footerEl = document.getElementById("footer-container");

    new Header($headerEl);
    new Footer($footerEl);
  }

  setEvent() {
    // 로그아웃 버튼 클릭 이벤트
    document.addEventListener("click", (e) => {
      if (e.target && e.target.id === "logout") {
        UserStorage.clearUser();
        router.navigateTo("/login");
      }
    });
  }
}
