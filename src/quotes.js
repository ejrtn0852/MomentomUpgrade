import { aCounter, addEvent, element } from "./util.mjs";
import { getLocalStorage, setLocalStorage } from "./localStorage.mjs";

/**
 * setState 함수는 새로운 상태를 받아 로컬 스토리지에 저장하고, UI를 업데이트하는 역할을 수행합니다.
 * 새로운 상태는 "quote" 키로 로컬 스토리지에 저장되며, 해당 상태를 이용하여 render 함수를 호출하여 UI를 갱신합니다.
 *
 * @param {Object} newState - 새로운 상태 객체
 * @returns {void}
 */
const setState = (newState) => {
  let quote = [newState];
  setLocalStorage("quote", quote);
  return render();
};

/**
 * checkLocalStorage 함수는 로컬 스토리지에서 데이터를 확인하고, UI를 업데이트합니다.
 * "quote" 키로 저장된 데이터가 있는 경우, 해당 데이터를 가져와 명언 텍스트를 업데이트하며,
 * 만약 데이터가 없다면 기본 문구 "오늘의 동기부여를 작성해보세요!"를 표시합니다.
 *
 * @returns {void}
 */
const checkLocalStorage = () => {
  if (getLocalStorage("quote")) {
    element("#quoteText").textContent = getLocalStorage("quote").map(
      (item) => item.quote || "오늘의 동기부여를 작성해보세요!",
    );
  }
};

/**
 * render 함수는 화면을 렌더링하는 역할을 수행합니다.
 * #quotes 요소에 동적으로 생성된 HTML을 할당하여 화면을 갱신하고,
 * checkLocalStorage 함수를 호출하여 로컬 스토리지에서 데이터를 가져와 UI를 업데이트합니다.
 * 마지막으로 viewForm 함수를 호출하여 이벤트 핸들러를 등록하고 폼을 화면에 표시합니다.
 *
 * @returns {void}
 */
const render = () => {
  element("#quotes").innerHTML = `
   <span id="quoteText" >🫡오늘의 동기부여</span>
    <button id="addBtn"> 추가 </button>
   <form id="quoteForm"  class="hidden">
       <input id="quote" type="text" placeholder="author" maxlength="30"/>
    </form>
  `;
  checkLocalStorage();
  viewForm();
};

/**
 * viewForm 함수는 'addBtn' 버튼에 클릭 이벤트를 추가하고, 클릭할 때마다 toggleQuoteFormVisibility 함수를 호출합니다.
 * toggleQuoteFormVisibility 함수는 외부 함수의 지역변수를 참조하는 클로저 함수로,
 * 현재까지 클릭된 횟수를 저장하고, 홀수번 클릭 시 명언 폼을 표시하거나 짝수번 클릭 시 숨깁니다.
 *
 * @returns {void}
 */
const viewForm = () => {
  const counter = aCounter();
  return addEvent("click", "#addBtn", () => toggleQuoteFormVisibility(counter));
};

/**
 * toggleQuoteFormVisibility 함수는 클로저로 생성된 카운터 함수를 인자로 받아서
 * 클릭된 횟수가 홀수번인지 확인하고, 명언 폼의 가시성을 토글합니다.
 * 마지막으로 quoteFormHandler 함수를 호출하여 명언 폼에 대한 추가 로직을 수행합니다.
 *
 * @param {Function} counter - 클로저를 사용한 카운터 함수
 * @returns {void}
 */
const toggleQuoteFormVisibility = (counter) => {
  // 카운터가 홀수인지 확인하여 명언 폼을 표시할지 여부를 결정합니다
  const isOddCounter = counter() % 2 !== 0;
  const quoteForm = element("#quoteForm");
  quoteForm.classList.toggle("hidden", !isOddCounter);
  quoteFormHandler();
};

/**
 * quoteFormHandler 함수는 명언 폼(#quoteForm)이 제출(submit)될 때 호출되며,
 * 이벤트 객체를 받아 폼의 기본 동작을 막고, 새로운 상태를 생성하여 setState 함수에 전달합니다.
 *
 * @returns {void}
 */
const quoteFormHandler = () => {
  addEvent("submit", "#quoteForm", (event) => {
    event.preventDefault();
    const newState = {
      id: Date.now(),
      quote: element("#quote").value,
    };
    setState(newState);
  });
};

render();
