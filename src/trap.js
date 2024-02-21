let audioContext = null
let oscillator = null
let isNotePlaying = false //default is not playing
let trapVolumeValue = 0.5 // Default volume value

export function createAudioContext() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  } catch (error) {
    console.error('Failed to create AudioContext:', error.message)
    alert(
      'To enable audio playback, please interact with the page (e.g., click a button).'
    )
  }
}

export function setOscillatorType(type) {
  if (oscillator) {
    oscillator.type = type
  }
}

export const setTrapVolume = (volume) => { //set trap volume
  trapVolumeValue = volume
  if (oscillator) {
    oscillator.gain.setValueAtTime(volume, audioContext.currentTime)
  }
}

export const playTrap = (note, selectedOscillatorType) => {
  //add oscillator type parameter
  if (isNotePlaying) return // if a note is already playing, ignore the new play request
  isNotePlaying = true // set the flag to true
  console.log('Playing note:', note)
  console.log('Selected oscillator type:', selectedOscillatorType.value)
  if (!audioContext) {
    createAudioContext()
  }
  oscillator = audioContext.createOscillator()
  oscillator.type = selectedOscillatorType.value
  
  // Create a gain node to control the volume
  const gainNode = audioContext.createGain()
  gainNode.gain.setValueAtTime(trapVolumeValue, audioContext.currentTime)

  // Connect the oscillator to the gain node, and the gain node to the destination
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.setValueAtTime(noteToFrequency(note), audioContext.currentTime)
  oscillator.start()
}

export const stopSound = () => {
  if (oscillator) {
    oscillator.stop()
    oscillator.disconnect()
    oscillator = null
    isNotePlaying = false // reset when the note stops playing
  }
}

//Map trap's key
export const trapKeyMap = {
  '1': 'C',
  '2': 'Db',
  '3': 'D',
  '4': 'Eb',
  '5': 'E',
  '6': 'F',
  '7': 'Gb',
  '8': 'G',
  '9': 'Ab',
  '0': 'A',
  '-': 'Bb',
  '=': 'B'
}

export const noteToFrequency = (note) => {
  const A4Frequency = 440 // Frequency of A4
  const TrapKeys = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ]
  const noteDistance = TrapKeys.indexOf(note) - TrapKeys.indexOf('A')
  return A4Frequency * Math.pow(2, noteDistance / 12)
}
export const getNoteColor = (note) => {
  switch (note) {
    case 'C':
      return '#F9EFDB'
    case 'C#':
      return '#EBD9B4'
    case 'D':
      return '#9DBC98'
    case 'D#':
      return '#638889'
    case 'E':
      return '#D9EDBF'
    case 'F':
      return '#FFB996'
    case 'F#':
      return '#FFCF81'
    case 'G':
      return '#FDFFAB'
    case 'G#':
      return '#FDF7E4'
    case 'A':
      return '#FAEED1'
    case 'A#':
      return '#DED0B6'
    case 'B':
      return '#BBAB8C'
  }
}
