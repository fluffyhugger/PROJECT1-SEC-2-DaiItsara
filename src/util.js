export const theKey = ref([]);
export const checkKey = function (key) {
  if (theKey.value.length < 36) {
    theKey.value += (theKey.value.length > 0 ? ", " : "") + key;
  } else {
    theKey.value = "";
  }
};
//Toggle mode
export const isActive = ref(false);
export const toggle = () => {
  isActive.value = !isActive.value;
  theKey.value = [];
};

//theme

export const popupOpen = ref(false);
export const selectedTheme = ref(localStorage.getItem("background"));
export const videoSource = computed(() => {
  return `./theme/theme-${selectedTheme.value}.mp4`;
});

export const togglePopup = () => {
  popupOpen.value = !popupOpen.value;
};

export const closePopup = () => {
  popupOpen.value = false;
};

export const selectTheme = (themeNumber) => {
  try {
    selectedTheme.value = themeNumber;
    localStorage.setItem("background", themeNumber);
    location.reload();
    console.log(videoSource.value);
    console.log("Theme change successful:", `./theme/theme-${themeNumber}.mp4`);
  } catch (error) {
    console.error("Theme change failed:", error.message);
  } finally {
    closePopup();
  }
};



