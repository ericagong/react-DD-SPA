import Component from "../core/Component.js";
import UserStorage from "../UserStorage.js";
import router from "../router.js";

export default class Login extends Component {
  template() {
    return `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input type="text" id="username" required placeholder="사용자 이름" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <input type="text" id="email" placeholder="이메일(선택)" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <input type="text" id="bio" placeholder="자기소개(선택)" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
      </form>
      <div class="mt-4 text-center">
        <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
      </div>
      <hr class="my-6">
      <div class="text-center">
        <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
      </div>
    </div>
  </main>
`;
  }

  setEvent() {
    // 로그인 폼 제출 이벤트
    document.addEventListener("submit", (e) => {
      if (e.target && e.target.id === "login-form") {
        e.preventDefault();

        const username = document.getElementById("username")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const bio = document.getElementById("bio")?.value.trim();

        if (username) {
          UserStorage.saveUser({ username, email, bio });
          router.navigateTo("/");
        }
      }
    });
  }
}
