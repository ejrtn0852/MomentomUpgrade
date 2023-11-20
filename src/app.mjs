import { addEvent, element } from "./util.mjs";

/**
 * 로그인 이벤트를 처리하는 함수입니다.
 * 로그인 폼이 제출될 때 사용자 이름을 로컬 스토리지에 저장하고
 * 환영 메시지를 업데이트합니다.
 */
const loginEvent = () => {
  const loginFormInput = element("#login-form > input");
  addEvent("submit", "#login-form", ({ target }) => {
    event.preventDefault();
    let userName = loginFormInput.value;
    localStorage.setItem("userName", userName);
    loginFormInput.value = "";
    updateGreeting(userName);
  });
};

/**
 * 사용자의 환영 메시지를 업데이트하는 함수입니다.
 * @param {string} userName - 사용자 이름
 */
const updateGreeting = (userName) => {
  // userName이 문자열이 아닌 경우 에러를 출력하고 함수를 종료합니다.
  if (typeof userName !== "string") {
    console.error("updateGreeting Error: 문자열이 아닙니다.");
    return;
  }
  // 사용자 이름이 문자열인 경우
  // 로그인 폼을 숨기고, 화면에 환영 메시지를 출력합니다.
  element("#login-form").classList.add("hidden");
  element("#app").textContent = `Hello ${userName}`;
};

/**
 * 페이지 초기화를 담당하는 함수입니다.
 * 로컬 스토리지에서 사용자 이름을 가져와서 존재하지 않으면 로그인 폼을 표시하고 이벤트를 연결하고,
 * 사용자 이름이 존재하면 환영 메시지를 업데이트합니다.
 */
const initializePage = () => {
  const storedUserName = localStorage.getItem("userName");
  if (!storedUserName) {
    showForm();
    loginEvent();
  } else {
    updateGreeting(storedUserName);
  }
};

/**
 * 로그인 폼을 화면에 표시하는 함수입니다.
 */
const showForm = () => {
  element("#login-form").classList.remove("hidden");
};

window.onload = initializePage;
