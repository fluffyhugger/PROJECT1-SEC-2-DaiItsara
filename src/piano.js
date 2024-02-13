export const keyBindings = {
  A: "A3",
  S: "Bb3",
  D: "B3",
  F: "C4",
  G: "Db4",
  H: "D4",
  J: "Eb4",
  K: "E4",
  L: "F4",
  ";": "Gb4",
  "'": "G4",
  Z: "Ab4",
  X: "A4",
  C: "Bb4",
  V: "B4",
  B: "C5",
  N: "Db5",
  M: "D5",
  ",": "Eb5",
  ".": "E5",
  "/": "F5",
  Q: "Gb5",
  W: "G5",
  E: "Ab5",
  R: "A5",
};
export const isBlackKey = (note) => {
  const blackKeys = ["Bb", "Db", "Eb", "Gb", "Ab"];
  return blackKeys.includes(note.substring(0, 2));
};

export const getAudioPath = (note) => {
  const path = `./src/piano-mp3/${note}.mp3`;
  console.log("Audio Path:", path);
  return path;
};

export const playSound = (note) => {
  const audioPath = getAudioPath(note);
  try {
    const audio = new Audio(audioPath);

    audio.play();
    console.log("Audio played successfully");
  } catch (error) {
    console.error("Error playing audio:", error);
  }
};



export const handleKeyUp = (event) => {
  const key = event.key.toUpperCase();
  if (keyBindings[key]) {
    playSound(keyBindings[key]);
  }
};
export const handleClick = (note) => {
  playSound(note);
};
