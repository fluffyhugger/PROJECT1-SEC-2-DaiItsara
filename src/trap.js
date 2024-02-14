export let audioContext = null;

export let oscillator = null;


export function createAudioContext() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  } catch (error) {
    console.error("Failed to create AudioContext:", error.message);
    alert(
      "To enable audio playback, please interact with the page (e.g., click a button)."
    );
  }
}

export function setOscillatorType(type) {
  if (oscillator) {
    oscillator.type = type;
  }
}

export const playTrap = (note, selectedOscillatorType) => { //ad oscillator type parameter
    console.log("Playing note:", note);
    console.log("Selected oscillator type:", selectedOscillatorType.value);
    if (!audioContext) {
      // If AudioContext is not initialized, create it
      createAudioContext();
    }
    // Check if AudioContext is suspended and resume it if needed
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }


  oscillator = audioContext.createOscillator();
  oscillator.type = selectedOscillatorType.value;
  oscillator.frequency.setValueAtTime(
    noteToFrequency(note),
    audioContext.currentTime
  );
  oscillator.connect(audioContext.destination);
  oscillator.start();
};
export const stopSound = () => {
  if (oscillator) {
    oscillator.stop(audioContext.currentTime);
    oscillator.disconnect();
  }
};
export const noteToFrequency = (note) => {
  const A4Frequency = 440; // Frequency of A4
  const TrapKeys = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const noteDistance = TrapKeys.indexOf(note) - TrapKeys.indexOf("A");
  return A4Frequency * Math.pow(2, noteDistance / 12);
};
export const getNoteColor = (note) => {
  switch (note) {
    case "C":
      return "#F9EFDB";
    case "C#":
      return "#EBD9B4";
    case "D":
      return "#9DBC98";
    case "D#":
      return "#638889";
    case "E":
      return "#D9EDBF";
    case "F":
      return "#FFB996";
    case "F#":
      return "#FFCF81";
    case "G":
      return "#FDFFAB";
    case "G#":
      return "#FDF7E4";
    case "A":
      return "#FAEED1";
    case "A#":
      return "#DED0B6";
    case "B":
      return "#BBAB8C";
  }
};
