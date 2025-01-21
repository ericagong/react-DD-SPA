import Component from "../core/Component.js";

export default class Footer extends Component {
  template() {
    return `
      <footer class="bg-blue-600 text-white p-4 text-center">
          &copy; 2021. All rights reserved.
      </footer>
    `;
  }
}
