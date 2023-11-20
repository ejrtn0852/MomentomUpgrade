import { createElement, element } from "./util.mjs";
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
  ).style.backgroundImage = `url('../img/${background[randomIndex]}')`;
};

// 페이지 로드 시 한 번 호출하여 초기 배경 이미지를 설정합니다.
getBackground();
