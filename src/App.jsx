import { useRef, useState, useEffect } from "react";
import "./App.css";

const songs =[
  { title: "Karuvatu kara pulla 1", src: "/song1.mp3" },
  { title: "nee ena pakra mari", src: "/song2.mp3" },
  { title: "kokku saiva kokku", src: "/song3.mp3" },
  { title: "mankuyile", src: "/song4.mp3" },
  { title: "Sonthathil ena..", src: "/song5.mp3" },
  { title: "aathadi aathadi ", src: "/song6.mp3" },
  { title: "high on love", src: "/song7.mp3" },
  { title: "velicha pove vaa", src: "/song8.mp3" },
  { title: "Singari", src: "/song9.mp3" },
  { title: "muttu muttu", src: "/song10.mp3" },
  { title: "Sonthathil", src: "/song11.mp3" },
  { title: "mankuyile", src: "/song12.mp3" },
  { title: "pudichuruka illa", src: "/song13.mp3" },
  { title: "latha pandi :)", src: "/song14.mp3" },
  { title: "don u don u", src: "/song15.mp3" },
  { title: "adukalam", src: "/song16.mp3" },
  { title: "en suzhalai", src: "/song17.mp3" },
  { title: "beez in the trap!!!", src: "/song18.mp3" },
  { title: "kannu muzhiiii", src: "/song19.mp3" },
  { title: "neelothiii", src: "/song20.mp3" },
];

function App() {
  const audioRef = useRef(null);
  const[currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const[progress, setProgress] = useState(0);

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
  };

  // Play a specific song clicked from the playlist
  const selectSong = (index) => {
    setCurrentSong(index);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log(err));
    }
  }, [currentSong, isPlaying]);

  const handleTimeUpdate = () => {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;
    if (duration) {
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  return (
    <div className="player-container">
      <div className="player-card">
        <h1>🎵 yuke's Player</h1>
        <h2 className="song-title">{songs[currentSong].title}</h2>

        <audio
          ref={audioRef}
          src={songs[currentSong].src}
          onTimeUpdate={handleTimeUpdate}
          onEnded={nextSong}
        />

        <div className="progress-container">
          <input
            type="range"
            className="progress-bar"
            value={progress || 0}
            onChange={handleSeek}
          />
        </div>

        <div className="controls">
          <button onClick={prevSong}>⏮</button>
          <button onClick={playPause} className="play-btn">
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>
          <button onClick={nextSong}>⏭</button>
        </div>

        {/* --- NEW PLAYLIST SECTION --- */}
        <div className="playlist">
          <h3>Playlist</h3>
          <ul>
            {songs.map((song, index) => (
              <li
                key={index}
                // Apply 'active' class to highlight the currently playing song
                className={`playlist-item ${currentSong === index ? "active" : ""}`}
                onClick={() => selectSong(index)}
              >
                <div className="song-info">
                  <span className="song-number">{index + 1}.</span>
                  <span className="song-name">{song.title}</span>
                </div>
                {/* Show a little animated equalizer/icon if it's the playing song */}
                {currentSong === index && isPlaying && (
                  <span className="playing-icon">🎶</span>
                )}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default App;