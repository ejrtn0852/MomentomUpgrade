import { getLocalStorage, setLocalStorage } from "../localStorage.mjs";
import { addEvent, element } from "../util.mjs";

const useState = () => {
  const getState = (key) => {
    return getLocalStorage(key);
  };
  const setState = (key, value, f) => {
    setLocalStorage(key, value);
    f();
  };
  return { getState, setState };
};

const App = (selector) => {
  const { getState, setState } = useState();
  const $app = element(`#${selector}`);
  const handler = ({ target }) => {
    event.preventDefault();
    const [input] = target.children;
    setState("userName", input.value, () => render());
  };
  const render = () => {
    $app.innerHTML = LoginTemplate(getState("userName"));
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
