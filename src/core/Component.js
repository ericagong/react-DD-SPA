export default class Component {
  $target;
  state;
  shouldRender;

  constructor($target) {
    this.$target = $target;
    this.shouldRender = true;
    this.state = this.setup(); // 초기 상태 설정
    this.render(); // 초기 렌더링
    this.setEvent(); // 이벤트 설정
  }

  setup() {
    return {}; // 초기 상태 반환 (하위 클래스에서 구현)
  }

  template() {
    return ""; // 렌더링 템플릿 반환 (하위 클래스에서 구현)
  }

  render() {
    if (!this.shouldRender) return;
    this.$target.innerHTML = this.template();
    this.mounted(); // 렌더링 이후 실행
  }

  mounted() {
    // 자식 컴포넌트 렌더링
  }

  setEvent() {
    // 이벤트 바인딩 (하위 클래스에서 구현)
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render(); // 상태 변경 후 자동 렌더링
  }
}
