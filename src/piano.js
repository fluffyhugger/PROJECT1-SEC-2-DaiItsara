export const keyBindings = {
  Z: "C2",
  X: "Db2",
  C: "D2",
  V: "Eb2",
  B: "E2",
  N: "F2",
  M: "Gb2",
  ",": "G2",
  ".": "Ab2",
  "/": "A2",
  Q: "Bb2",
  W: "B2",
  E: "C3",
  R: "Db3",
  T: "D3",
  Y: "Eb3",
  U: "E3",
  I: "F3",
  O: "Gb3",
  P: "G3",
  "[": "Ab3",
  "]": "A3",
  A: "Bb3",
  S: "B3",
  D: "C4",
};

export const isBlackKey = (note) => {
  const blackKeys = ["Db", "Eb", "Gb", "Ab", "Bb"];
  return blackKeys.includes(note.substring(0, 2));
};

export const getAudioPath = (note) => {
  const path = `./src/piano-mp3/${note}.mp3`;
  console.log("Audio Path:", path);
  return path;
};

export const playSound = (note, duration = 550) => {
  const audioPath = getAudioPath(note);
  try {
    const audio = new Audio(audioPath);
    audio.play();
    console.log("Audio played successfully");
    
    // Stop the sound after the specified duration
    setTimeout(() => {
      audio.pause();
    }, duration);
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
