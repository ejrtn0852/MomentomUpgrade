import { addEvent, createElement, element } from "./util.mjs";
import { getLocalStorage, setLocalStorage } from "./localStorage.mjs";

const background = ["background1.jpeg", "background2.png"];
/**
 * 무작위로 선택된 배경 이미지를 가져와 화면의 특정 요소 배경으로 설정하는 함수입니다.
 */
const getBackground = () => {
  // background 배열에서 무작위 인덱스를 선택합니다.
  const randomIndex = Math.floor(Math.random() * background.length);
  // 선택된 배경 이미지를 #background 요소의 배경으로 설정합니다.
  element(
    "#background",
  ).style.background = `url('../img/${background[randomIndex]}')
  no-repeat center center`;
};

/**
 * 파일 선택(input type="file")의 변경 이벤트 핸들러
 * @param {Event} event - 변경 이벤트에 대한 이벤트 객체
 */
addEvent("change", "#imgDownload", async ({ target }) => {
  try {
    const { files } = target;
    getRanDom(target);
    if (!files) {
      return getBackground();
    }
    const base64String = await readFileAsBase64(files[0]);
    setStoreAndDisplay("bgImg", base64String);
  } catch (error) {
    console.error(
      `An error occurred while processing the image : ${error.message}`,
    );
  }
});

/**
 * 주어진 파일을 base64 문자열로 변환하는 함수
 * @param {File} files - 변환할 파일 객체
 * @returns {Promise<string>} - 파일을 읽어온 base64 문자열
 */
const readFileAsBase64 = (files) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) =>
      reject(new Error(`Failed to read the File: ${error.message}`));
    reader.readAsDataURL(files);
  });
};

/**
 * 주어진 키와 값을 사용하여 로컬 스토리지에 저장하고, 해당 값을 웹 페이지의 배경 이미지로 표시하는 함수
 * @param {string} key - 로컬 스토리지에 저장할 키
 * @param {string} value - 로컬 스토리지에 저장할 값 (base64 문자열)
 */
const setStoreAndDisplay = (key, value) => {
  setLocalStorage(key, value);
  element(
    "#background",
  ).style.background = `url(data:image/png;base64,${value})no-repeat center center `;
  element("#background").classList.add("bg-img");
};

const getRanDom = (target) => {
  if (target.checked) {
    getBackground();
  }

};

/**
 * 로컬 스토리지에서 배경 이미지를 가져와서 웹 페이지의 배경으로 설정하는 함수
 */
if (getLocalStorage("bgImg")) {
  element(
    "#background",
  ).style.background = `url(data:image/png;base64,${getLocalStorage(
    "bgImg",
  )})no-repeat center center`;
} else {
  getBackground();
}
