const isTouchDevice = () => {
  if ("ontouchstart" in window) {
    return true;
  }
  return false;
};

export default isTouchDevice;
