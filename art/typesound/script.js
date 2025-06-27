// Inicializa o contexto de áudio
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// Notas de piano básicas (frequências em Hz)
const notes = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  349.23, // F4
  392.00, // G4
  440.00, // A4
  493.88, // B4
  523.25  // C5
];

// Mapeia teclas para notas com base no código ASCII
function getNoteFromChar(char) {
  const index = char.charCodeAt(0) % notes.length;
  return notes[index];
}

function playNote(frequency) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'sine'; // ou 'triangle', 'square', etc.
  osc.frequency.value = frequency;

  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);

  osc.connect(gain).connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 1);
}

// Adiciona listener de digitação
document.getElementById('input').addEventListener('keydown', (e) => {
  if (e.key.length === 1) { // Apenas letras, números e símbolos
    const freq = getNoteFromChar(e.key);
    playNote(freq);
  }
});
