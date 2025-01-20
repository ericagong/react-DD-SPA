// 사용자 데이터 관리 유틸리티
export default class UserStorage {
  static getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  static saveUser(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
  }

  static clearUser() {
    localStorage.removeItem("user");
  }
}
