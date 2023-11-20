const log = console.log;
const error = console.error;

/**
 * 주어진 이벤트 유형, 선택자, 콜백 함수를 사용하여 이벤트를 추가하는 함수입니다.
 * @param {string} eventType - 이벤트 유형 (예: 'click', 'submit' 등)
 * @param {string} selector - 이벤트를 연결할 DOM 요소의 선택자
 * @param {Function} callback - 이벤트가 발생했을 때 실행할 콜백 함수
 * @throws {Error} - 유효하지 않은 선택자 또는 이벤트 유형인 경우 예외를 throw합니다.
 * @returns {void}
 */
export const addEvent = (eventType, selector, callback) => {
  if (typeof eventType === "string" && typeof selector === "string") {
    const targetElement = element(selector);
    if (targetElement) {
      targetElement.addEventListener(eventType, (event) => {
        callback(event);
      });
    } else {
      throw new Error("유효하지 않은 선택자 입니다.");
    }
  } else {
    throw new Error("이벤트 유형과 선택자는 문자열이여야합니다.");
  }
};

/**
 * 주어진 선택자로 DOM 요소를 찾아 반환하는 함수입니다.
 * @param {string} selector - DOM 요소를 찾기 위한 선택자
 * @returns {Element|null} - 주어진 선택자에 해당하는 DOM 요소, 없을 경우 null을 반환합니다.
 */
export const element = (selector) => {
  const result = document.querySelector(selector);
  return result
    ? result
    : (console.warn("유효하지 않은 selector 입니다."), null);
};

/**
 * 주어진 태그 이름으로 HTML 요소를 생성하여 반환하는 함수입니다.
 * @param {string} tagName - 생성할 HTML 요소의 태그 이름
 * @returns {HTMLElement|null} - 생성된 HTML 요소, 없을 경우 null을 반환합니다.
 */
export const createElement = (tagName) => {
  const result = document.createElement(tagName);
  return result
    ? result
    : (console.warn("유효하지 않은 tagName 입니다."), null);
};

export const iterMap = (f, iter) => {
  let result = [];
  for (const a of iter) {
    result.push(f(a));
  }
  return result;
};

/**
 * 카운터 값을 관리하는 클로저 함수를 생성하는 함수입니다.
 * @returns {Function} - 클로저 함수, 각 호출 시 카운터 값을 1씩 증가시킵니다.
 */
export const aCounter = () => {
  let counter = 0;
  return () => {
    if (counter < Number.MAX_SAFE_INTEGER) {
      return ++counter;
    } else {
      console.log(
        "카운터가 최대값에 도달했습니다. 카운터를 0으로 초기화합니다.",
      );
      counter = 0;
      return ++counter;
    }
  };
};
