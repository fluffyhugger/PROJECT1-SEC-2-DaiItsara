export const checkKey = function (key) {
  if (theKey.value.length < 36) {
    theKey.value += (theKey.value.length > 0 ? ", " : "") + key;
  } else {
    theKey.value = "";
  }
};
//Toggle mode
export const toggle = () => {
  isActive.value = !isActive.value;
  theKey.value = [];
};

