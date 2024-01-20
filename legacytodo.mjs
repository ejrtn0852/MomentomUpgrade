import { addEvent, createElement, element } from "./src/util.mjs";

const array = [];

const removeTodo = () => {
  addEvent("click", ".removeBtn", ({ target }) => {
    const {
      dataset: { todoId },
      parentElement,
    } = target;
    if (todoId) {
      const todoElement = element(`[data-todo-id="${todoId}"]`);
      if (todoElement) {
        parentElement.remove();
      }
    }
  });
};
const elementActive = (item, index) => {
  const li = createElement("li");
  li.textContent = item;
  const btn = createElement("button");
  btn.classList.add("removeBtn");
  btn.dataset.todoId = index;
  li.appendChild(btn);
  btn.textContent = `🤛`;
  element("#todo_list").appendChild(li);
};
// 보기 불편한 단점이있었다. innerHTML이 뭔가 더 보기 좋아보였다 사람마다 차이는 있겠지만 여기 코드는
// 상태관리가 좀 보기 힘들었다. 그래서 다시 짜본다.
// 로직을 많이 나눴는데도 좀 보기 힘들다.
const paintTodo = () => {
  element("#todo_list").innerHTML = "";
  getLocalStorage().forEach((item, index) => {
    elementActive(item, index);
  });
  removeTodo();
};
const setLocalStorage = () => {
  localStorage.setItem("todoList", JSON.stringify(array));
};
const getLocalStorage = () => {
  const getItem = localStorage.getItem("todoList");
  return JSON.parse(getItem);
};

addEvent("submit", "#todo-form", ({ target }) => {
  event.preventDefault();
  const todoValue = element("#todo-input").value;
  array.push(todoValue);
  element("#todo-input").value = "";
  setLocalStorage();
  paintTodo();
});
