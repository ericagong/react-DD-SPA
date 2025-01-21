import Component from "../core/Component.js";
import router from "../router.js";
import UserStorage from "../UserStorage.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { isAuthenticated } from "../utils.js";

export default class Profile extends Component {
  setup() {
    // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    if (!isAuthenticated()) {
      router.navigateTo("/login");
      this.shouldRender = false;
      return {};
    }

    // 사용자 데이터 설정
    const user = UserStorage.getUser() || { username: "", email: "", bio: "" };
    return {
      username: user.username,
      email: user.email,
      bio: user.bio,
    };
  }

  template() {
    const { username, email, bio } = this.state;
    return `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          
        <div id="header-container"></div>

          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
                내 프로필
              </h2>
              <form id="profile-form">
                <div class="mb-4">
                  <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value="${username}"
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-4">
                  <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value="${email}"
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-6">
                  <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    class="w-full p-2 border rounded"
                  >${bio}</textarea>
                </div>
                <button
                  type="submit"
                  class="w-full bg-blue-600 text-white p-2 rounded font-bold"
                >
                  프로필 업데이트
                </button>
              </form>
            </div>
          </main>

          <div id="footer-container"></div>
        
        </div>
      </div>
    `;
  }

  mounted() {
    // Header와 Footer 렌더링
    const $headerEl = document.getElementById("header-container");
    const $footerEl = document.getElementById("footer-container");

    if ($headerEl) new Header($headerEl);
    if ($footerEl) new Footer($footerEl);
  }

  setEvent() {
    document.addEventListener("submit", (e) => {
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
  }
}
