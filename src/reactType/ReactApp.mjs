import { getLocalStorage, setLocalStorage } from "../localStorage.mjs";
import { addEvent, element } from "../util.mjs";
import useState from "../reactType/useState.js";

const App = (selector) => {
  const [state, setState, subscribe] = useState(getLocalStorage("userName"));
  const $app = element(`#${selector}`);
  const handler = ({ target }) => {
    event.preventDefault();
    const [input] = target.children;
    subscribe(render);
    setState(setLocalStorage("userName", input.value));
    console.log(state());
  };
  const render = () => {
    $app.innerHTML = LoginTemplate(state());
  };
  render();
  $app.addEventListener("submit", handler);
};

const formTemplate = (id) => {
  return `<form id="${id}">
    <input type="text" placeholder="what your name?">
    <button type="submit">login</button>
 </form>`;
};

const LoginTemplate = (userName) => {
  return `<div>${userName ? userName : formTemplate("login-form")}</div>`;
};

App("app");
