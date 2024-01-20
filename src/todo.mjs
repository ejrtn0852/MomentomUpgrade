import { addEvent, element, iterMap } from "./util.mjs";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "./localStorage.mjs";

let state = [];

/**
 * remove 함수는 할 일 목록에서 항목을 제거하는 역할을 수행합니다.
 * '#todo_list' 요소에 클릭 이벤트를 추가하고, 클릭된 요소의 태그 이름을 확인한 후,
 * 해당 요소의 가장 가까운 조상인 'li' 요소를 찾아 제거합니다.
 * 동시에 로컬 스토리지에서도 해당 항목을 제거하고, 이벤트 전파를 중지합니다.
 *
 * @returns {void}
 */
const remove = () => {
  addEvent("click", "#todo_list", ({ target }) => {
    const { tagName } = target;
    // closest 특정 요소를 기준으로 가장 가까운 조상 요소를 찾아 반환하는 메서드.
    if (tagName === "BUTTON") {
      if (target.closest("li")) {
        removeLocalStorage("todoList", target.closest("li"));
        target.closest("li").remove();
        event.stopPropagation();
      }
    }
    // 이벤트 버블링을 활용한 target.parentElement,remove();
  });
};

/**
 * render 함수는 할 일 목록을 화면에 렌더링하는 역할을 수행합니다.
 * '#todo_list' 요소에 동적으로 생성된 HTML을 할당하여 할 일 목록을 갱신하고,
 * 각 항목에는 삭제 버튼이 포함되어 있어 삭제 기능을 수행할 수 있도록 remove 함수를 호출합니다.
 *
 * @returns {void}
 */
const render = () => {
  element("#todo_list").innerHTML = `
      ${
        getLocalStorage("todoList")
          ? getLocalStorage("todoList")
              .map(
                (item) => `<li id=${item.id}>
         ${item.value} <button>삭제</button> </li>`,
              )
              .join("")
          : ""
      }
  `;
  remove();
};

/**
 * setState 함수는 새로운 상태를 받아 할 일 목록 상태(state)를 갱신하고,
 * 갱신된 상태를 로컬 스토리지에 저장한 후 UI를 업데이트하는 역할을 수행합니다.
 *
 * @param {Object} newState - 새로운 할 일 목록 항목 상태 객체
 * @returns {void}
 */
const setState = (newState) => {
  state = [...state, newState];
  setLocalStorage("todoList", state);
  return render();
};

/**
 * 'todo-form' 폼에 제출(submit) 이벤트를 추가하고, 이벤트 핸들러에서 새로운 할 일 목록 항목을 추가합니다.
 * 폼 제출 기본 동작을 막고, 입력된 값으로 새로운 상태를 생성하여 setState 함수를 호출하여 목록을 갱신하고,
 * 입력 필드를 비워 UI를 업데이트합니다.
 *
 * @param {Event} event - submit 이벤트 객체
 * @returns {void}
 */
addEvent("submit", "#todo-form", (event) => {
  event.preventDefault();
  const newState = {
    id: Date.now(),
    value: element("#todo-input").value,
  };
  element("#todo-input").value = "";
  setState(newState);
});

render();
