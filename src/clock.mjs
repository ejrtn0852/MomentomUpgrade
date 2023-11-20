import { element, createElement } from "./util.mjs";

/**
 * 현재 시간을 표시하는 간단한 시계 기능을 수행하는 함수입니다.
 * 시, 분, 초를 가져와서 12시간 형식으로 표시하고 AM/PM을 추가하여 DOM 요소에 업데이트합니다.
 * 1초마다 시간을 갱신하여 실시간으로 표시됩니다.
 * @returns {void}
 */
const clock = () => {
  const date = new Date();
  let hours = date.getHours() % 12;
  hours = hours < 10 ? `0${hours}` : hours;
  const ampm = hours < 12 ? "am" : "pm";
  const min = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  const sc = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
  element("#clock").textContent = `${hours}:${min}:${sc}${ampm}`;
  setTimeout(clock, 1000);
};

clock();
