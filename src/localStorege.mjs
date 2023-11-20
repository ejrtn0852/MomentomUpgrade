/**
 * 로컬 스토리지에 객체 또는 배열을 저장하는 함수입니다.
 * @param {string} key - 로컬 스토리지의 키
 * @param {any} state - 저장할 데이터
 * @returns {void}
 */
export const setLocalStorage = (key, state) => {
  if ((typeof state === "object" && state !== null) || Array.isArray(state)) {
    localStorage.setItem(key, JSON.stringify(state));
    console.log(`state 타입 : ${typeof state}`);
  }
};

/**
 * 로컬 스토리지에서 특정 키에 대한 값을 가져오는 함수입니다.
 * @param {string} key - 로컬 스토리지의 키
 * @returns {Object|null} - 키에 대한 값이 있는 경우 파싱된 객체, 없는 경우 null
 */
export const getLocalStorage = (key) => {
  const getItem = localStorage.getItem(key);
  // 로컬 스토리지에 해당 키가 존재하면 파싱합니다 키가 유효하지 않을 경우 null을 리턴합니다.
  if (getItem) {
    return JSON.parse(getItem);
  }
  return null;
};

/**
 * 특정 키에 대한 로컬 스토리지에서 데이터를 제거하는 함수.
 * @param {string} key - 로컬 스토리지의 키
 * @param {Object} state - 제거할 데이터 객체
 * @returns {void}
 */
export const removeLocalStorage = (key, state) => {
  const localStorageData = getLocalStorage(key);
  if (localStorageData && localStorageData !== null) {
    const updatedData = localStorageData.filter(
      (item) => Number(item.id) !== Number(state.id),
    );
    setLocalStorage(key, updatedData);
  } else {
    console.error(
      "로컬 스토리지에서 데이터를 가져올 수 없습니다. 유효한 키를 입력하세요.",
    );
  }
};
