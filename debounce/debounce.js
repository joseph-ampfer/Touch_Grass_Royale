const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }

  export default debounce;