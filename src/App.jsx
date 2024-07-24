import React, { useEffect, useState } from 'react';
import './App.css';

// Array containing data for each drum pad
const drumPads = [
  { key: 'Q', id: 'Heater-1', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', id: 'Heater-2', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', id: 'Heater-3', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', id: 'Heater-4', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'S', id: 'Clap', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'D', id: 'Open-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 'Z', id: "Kick-n'-Hat", src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', id: 'Kick', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', id: 'Closed-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
];

const App = () => {
  // State for display text
  const [display, setDisplay] = useState('');
  // State for power on/off
  const [power, setPower] = useState(true);
  // State for volume level
  const [volume, setVolume] = useState(1);
  // State for mute/unmute
  const [muted, setMuted] = useState(false);

  // Function to play a sound
  const playSound = (key, id) => {
    if (power) {
      const audio = document.getElementById(key);
      audio.currentTime = 0;
      audio.volume = volume;
      audio.play();
      setDisplay(id);
    }
  };

  // Function to handle key presses
  const handleKeyPress = (event) => {
    const key = event.key.toUpperCase();
    const drumPad = drumPads.find(pad => pad.key === key);
    if (drumPad) {
      playSound(drumPad.key, drumPad.id);
    }
  };

  // Effect to add and clean up keydown event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [volume, power]);

  // Function to toggle power on/off
  const togglePower = () => {
    setPower(!power);
    setDisplay(power ? 'Power Off' : 'Power On');
  };

  // Function to toggle mute/unmute
  const toggleMute = () => {
    setMuted(!muted);
    setVolume(muted ? 1 : 0);
    setDisplay(muted ? 'Volume On' : 'Volume Off');
  };

  return (
    <div id="drum-machine">
      <div id="controls">
        <button onClick={togglePower} className="control-button">
          {power ? 'Power On' : 'Power Off'}
        </button>
        <button onClick={toggleMute} className="control-button">
          {muted ? 'Unmute' : 'Mute'}
        </button>
      </div>
      <div id="display">{display}</div>
      <div className="pads">
        {drumPads.map(pad => (
          <div
            key={pad.key}
            id={pad.id}
            className="drum-pad"
            onClick={() => playSound(pad.key, pad.id)}
          >
            {pad.key}
            <audio className="clip" id={pad.key} src={pad.src}></audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
