import { useRef, useState } from "react";
import "./App.css";

const songs = [
  {
    title: "Song 1",
    src: "/song1.mp3",
  },
  {
    title: "Song 2",
    src: "/song2.mp3",
  },
];

function App() {
  const audioRef = useRef(null);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    const next = (currentSong + 1) % songs.length;
    setCurrentSong(next);
    setIsPlaying(false);
  };

  const prevSong = () => {
    const prev =
      (currentSong - 1 + songs.length) % songs.length;
    setCurrentSong(prev);
    setIsPlaying(false);
  };

  return (
    <div className="player-container">
      <div className="player-card">
        <h1>🎵 Yuke....</h1>
        <h2 className="song-title">
          {songs[currentSong].title}
        </h2>

        <audio
          ref={audioRef}
          src={songs[currentSong].src}
        />

        <div className="controls">
          <button onClick={prevSong}>⏮</button>
          <button onClick={playPause} className="play-btn">
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>
          <button onClick={nextSong}>⏭</button>
        </div>
      </div>
    </div>
  );
}

export default App;
