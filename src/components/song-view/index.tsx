import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DownloadButton from "@/app/components/download.button";
import { Song } from "@/types/song";
import ShareButton from "@/app/components/ShareButton";
import Image from 'next/image';

interface SongCardProps {
  song: Song;
  style?: React.CSSProperties; 
}
const SongAI : React.FC<SongCardProps> = ({ song, style }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const audioPlayer = useRef<HTMLAudioElement | null>(null);
  const timeSlider = useRef<HTMLInputElement | null>(null);
  const currentTimeDisplay = useRef<HTMLParagraphElement | null>(null);
  const totalTimeDisplay = useRef<HTMLParagraphElement | null>(null);
  const playButton = useRef<HTMLButtonElement | null>(null);
  const playIcon = useRef<HTMLElement | null>(null);
  const musicLink = window.location.href || ""
  
  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.addEventListener("loadedmetadata", () => {
        setTotalTime(audioPlayer.current?.duration || 0);
        if (timeSlider.current) {
          timeSlider.current.max = String(audioPlayer.current?.duration);
        }
      });

      audioPlayer.current.addEventListener("timeupdate", () => {
        const current = audioPlayer.current?.currentTime || 0;
        setCurrentTime(current);
        if (currentTimeDisplay.current) {
          currentTimeDisplay.current.textContent = formatTime(current);
        }

        if (timeSlider.current) {
          timeSlider.current.value = String(current);
        }

      
      });

      audioPlayer.current.addEventListener("ended", () => {
        if (playIcon.current) {
          playIcon.current.classList.remove("fa-pause");
          playIcon.current.classList.add("fa-play");
        }

        if (timeSlider.current) {
          timeSlider.current.value = "0";
        }
        if (currentTimeDisplay.current) {
          currentTimeDisplay.current.textContent = "0:00";
        }
      });
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handlePlayPause = () => {
    if (audioPlayer.current) {
      if (audioPlayer.current.paused) {
        audioPlayer.current.play();
        setIsPlaying(true);
        if (playIcon.current) {
          playIcon.current.classList.remove("fa-play");
          playIcon.current.classList.add("fa-pause");
        }
      } else {
        audioPlayer.current.pause();
        setIsPlaying(false);
        if (playIcon.current) {
          playIcon.current.classList.remove("fa-pause");
          playIcon.current.classList.add("fa-play");
        }
      }
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (audioPlayer.current) {
      audioPlayer.current.currentTime = value;
    }
  };

  const copyLyrics = () => {
    const lyricsText = song?.lyrics || "";
    if (lyricsText) {
      navigator.clipboard
        .writeText(lyricsText)
        .then(() => {
          setTooltipVisible(true);
          setTimeout(() => {
            setTooltipVisible(false);
          }, 1000);
        })
        .catch((error) => {
          console.error("Failed to copy lyrics: ", error);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioPlayer.current) {
      const progress =
        (audioPlayer.current.currentTime / audioPlayer.current.duration) * 100;
      if (timeSlider.current) {
        timeSlider.current.style.setProperty(
          "--progress-percent",
          `${progress}%`
        );
      }
    }
  };

  return (
    <div className="container" >
      <header>
        <div className="header-left">
          <Image
            src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.2081-6/472337666_516774884715221_7739474152733304632_n.jpg?stp=c0.0.76.76a_dst-jpg_p75x75_tt6&_nc_cat=107&ccb=1-7&_nc_sid=ed3f67&_nc_ohc=LZ8-AqzSUDQQ7kNvgFgAZSm&_nc_oc=AdhwG1KUf8-FYKpRRk7wCAkSQLypjGAv8Xf702TYURrEF7x7OVChmE0DWU-Xd78nV8Y&_nc_zt=14&_nc_ht=scontent.fhan18-1.fna&_nc_gid=Ag3y31wL0nbXNIPWZxmblc9&oh=00_AYDUHMv-xy-ol-OAn24Up_5gBACUGYT5-LY22xI4kugfGA&oe=678D3EC8"
            alt="App Logo"
            width={75}
            height={75}
            priority
          />
          <div className="app-name">
            <h1>Song AI</h1>
            <p>Song AI</p>
          </div>
        </div>
        <a
          href="https://apps.apple.com/us/developer/wiin/id1778163721"
          target="_blank"
          rel="noopener noreferrer"
        >
          Try for free
        </a>
      </header>

      <main>
        <div className="song-details">
          <Image
            src={song.image_url}
            alt="Album Art"
            width={320}
            height={320}
            priority
          />
          <div className="song-info">
            <h2>{song.title}</h2>
            <ul className="tags">
              <li>{song?.song_setting?.genre}</li>
              <li>{song?.song_setting?.mood}</li>
            </ul>
          </div>

          <div className="audio-player">
            <div className="time-slider-container">
              <input
                ref={timeSlider}
                type="range"
                className="time-slider"
                min="0"
                max={totalTime}
                value={currentTime}
                step="0.1"
                onChange={handleSliderChange}
              />
            </div>
            <div className="time-display">
              <p ref={currentTimeDisplay} className="current-time">
                {formatTime(currentTime)}
              </p>
              <p ref={totalTimeDisplay} className="total-time">
                {formatTime(totalTime)}
              </p>
            </div>

            <div className="action">
              <ShareButton musicLink={musicLink} />

              <button
                ref={playButton}
                className="play-button"
                onClick={handlePlayPause}
              >
                <i
                  ref={playIcon}
                  className={`fas fa-${isPlaying ? "pause" : "play"} play-icon`}
                />
              </button>
              <DownloadButton audioUrl={song.audio_url} fileName="audiofile.mp3" />
            </div>

            {/* Lyrics Section */}
            <div className="lyrics">
              <div className="lyrics-copy">
                <h3>Lyrics</h3>
                <i className="fas fa-copy" onClick={copyLyrics}></i>
                {tooltipVisible && <div className="copy-tooltip">Copied!</div>}
              </div>

              <p style={{ color: "#ffffff99" }}>
                {song?.lyrics || "Lời bài hát chưa có"}
              </p>
            </div>
          </div>
        </div>
      </main>

      <audio
        ref={audioPlayer}
        src={song.audio_url}
        onTimeUpdate={handleTimeUpdate}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default SongAI;
