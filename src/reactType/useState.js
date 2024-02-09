const Modul = (() => {
  let global = [];
  let count = 0;
  let listeners = [];

  const useState = (initialValue) => {
    global[count] = global[count] || initialValue;
    const setState = (newState) => {
      if (typeof newState === "function") {
        // ! 여기서 global[count]의 값은 currentState다.
        global[count] = newState(global[count]);
      } else {
        global[count] = newState;
      }
      listeners.forEach((listeners) => listeners());
    };

    const subscribe = (listener) => {
      listeners.push(listener);
      return () => listeners.delete(listener);
    };
    const getState = () => global[count];

    return [getState, setState, subscribe];
  };
  count++;
  return useState;
})();
export default Modul;
