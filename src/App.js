import { useState, useRef, useEffect } from "react";
import Player from "./components/mediaPlayer/Player";
import Song from "./components/mediaPlayer//Song";
import Audio from "./components/mediaPlayer/Audio";
import MusicPlayer from "./components/mediaPlayer/MusicPlayer";
import data from "./Data";
import "./App.css";
import PlayerControl from "./components/mediaPlayer/PlayerControl";
//import Cookies from 'js-cookie';
import Plyr from "plyr";
import PlayerVideo from "./components/mediaPlayer/PlayerVideo";
// import ReactPlayer from 'react-player';

function App() {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  console.log(songs, "Songs from data")
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [alignment, setAlignment] = useState("Spanish");
  const [currentTime, setCurrentTime] = useState(currentSong.resumetime || 0);
  const [quality, setQuality] = useState("low");
  const [language, setLanguage] = useState("Spanish");
  const [time, setTime] = useState(localStorage.getItem('time') || 0);
  const [srcCheck, setSrcCheck] = useState(currentSong)

  useEffect(() => {
    setSrcCheck(currentSong)
  }, [currentSong])
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
  }, [currentTime, audioRef]);
  // useEffect(() => {
  //   console.log("==========> update this mount")
  //   const savedTime = parseFloat(localStorage.getItem('video-time')) //parseFloat(Cookies.get('video-time'));
  //   const VideoName = localStorage.getItem('video-name')//Cookies.get('video-name');
  //   // console.log(" 'VideoName' ", VideoName)
  //   // console.log(" 'savedTime' ", savedTime)
  //   if (savedTime) {
  //     setCurrentTime(currentSong.resumetime != null ? currentSong.resumetime : 0);
  //   }
  //   if (VideoName !== '' && VideoName) {
  //     const filterData = songs.filter((song) => song.name === VideoName)[0]
  //     setCurrentSong({ ...filterData, active: true } || songs[0])
  //   }

  //   // return () => {
  //   //   Cookies.set('video-time', (audioRef?.current?.currentTime || null));

  //   // }
  // }, []);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  // const videoRef = useRef(null);
  const handleKeyDown = (event) => {
    console.log('event.key', event.key)
    if (event.key === 'F') {
      event.target.requestFullscreen();
    }
  };

  const timeUpdateHandler1 = () => {
    setTime(audioRef.current.currentTime);
    localStorage.setItem('time', audioRef.current.currentTime);

  };
  const songEndHandler1 = () => {
    setTime(0);
  }
  function handleLanguageChange(newLanguage) {
    // let srcPath = (newLanguage === "eng") ? (quality === 'low') ? currentSong.multipleLanguages.eng.low : currentSong.multipleLanguages.eng.high
    //   : (quality === 'low') ? currentSong.multipleLanguages.Spanish.low : currentSong.multipleLanguages.Spanish.high
    setLanguage(newLanguage);
    if (newLanguage === "eng") {
      setSrcCheck(currentSong)
    } else {
      setSrcCheck(currentSong)
    }
  }

  function handleQualityChange(newQuality) {
    let srcPath = (newQuality === "low") ? (language === 'eng') ? currentSong.multipleLanguages.eng.low : currentSong.multipleLanguages.Spanish.low
      : (language === 'eng') ? currentSong.multipleLanguages.eng.high : currentSong.multipleLanguages.Spanish.high
    setQuality(newQuality);
    setSrcCheck(srcPath)
  }



  const handlePause = (e) => {
    // Cookies.set('video-time', e.currentTarget.currentTime);
    // setState value

    console.log("current songs check", currentSong)
    for (let v of songs) if (v.name == currentSong.name) v.resumetime = e.currentTarget.currentTime;
    localStorage.setItem('video-time', e.currentTarget.currentTime)
    console.log("After Update values", songs)
  }

  useEffect(() => {
    //const player = new Plyr('#player', {});

    const player = new Plyr('video', {
      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
      autoplay: true,
    });
    window.player = player;

  }, []);
  //const player = new Plyr('video', { captions: { active: true } });

  // Expose player so it can be used from the console
  //window.player = player;
  // const player = new Plyr('video', {
  //   controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
  //   autoplay: true,
  // });

  return (
    <>
      {/* {currentSong.type !== "video" ? (
        <div className={`App ${libraryStatus ? "library-active" : ""}`}>
          <MusicPlayer
            libraryStatus={libraryStatus}
            setLibraryStatus={setLibraryStatus}
          />
          <Song currentSong={currentSong} />
          <Player
            audioRef={audioRef}
            currentSong={currentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setSongInfo={setSongInfo}
            songInfo={songInfo}
            songs={songs}
            setCurrentSong={setCurrentSong}
            setSongs={setSongs}
          />
          <Audio
            songs={songs}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
            libraryStatus={libraryStatus}
          />
          <audio
            ref={audioRef}
            onTimeUpdate={timeUpdateHandler}
            onLoadedMetadata={timeUpdateHandler}
            src={currentSong.audio}
            onEnded={songEndHandler}
          />
        </div>
      ) : ( */}
      <div className={`App ${libraryStatus ? "library-active" : ""}`}>

        <MusicPlayer
          libraryStatus={libraryStatus}
          setLibraryStatus={setLibraryStatus}
        />
        <Audio
          songs={songs}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setSongs={setSongs}
          libraryStatus={libraryStatus}
          currentSong={currentSong}
        />

        {srcCheck && <PlayerVideo
          // srcCheck={srcCheck}
          currentSong={srcCheck}
          audioRef={audioRef}
          currentTime={currentSong.resumetime}
          endTime={currentSong.endTime}
          // onTimeUpdate={timeUpdateHandler1}
          // onLoadedMetadata={timeUpdateHandler1}
          // poster={srcCheck}
          handlePause={handlePause}
          onEnded={songEndHandler}
          onKeyDown={handleKeyDown}

        />}
        {/* <video
              controls
              crossorigin
              playsinline
              // width={900}
              ref={audioRef}
              currentTime={currentTime}
              onTimeUpdate={timeUpdateHandler1}
              onLoadedMetadata={timeUpdateHandler1}
              // src={srcCheck}
              poster={srcCheck}
              onPause={handlePause}
              onEnded={songEndHandler}
              onKeyDown={handleKeyDown}
            /> */}

        {/* <center>
          <button style={language === 'eng' ? { backgroundColor: "blue" } : null} onClick={() => handleLanguageChange("eng")}>English</button>
          <button style={language === 'Spanish' ? { backgroundColor: "blue" } : null} onClick={() => handleLanguageChange("Spanish")}>
            Spanish
          </button> */}
        {/* <button style={quality === 'low' ? { backgroundColor: "blue" } : null} onClick={() => handleQualityChange("low")}>
            Low Quality
          </button>
          <button style={quality === 'high' ? { backgroundColor: "blue" } : null} onClick={() => handleQualityChange("high")}>
            High Quality
          </button> */}
        {/* </center> */}
        <PlayerControl
          audioRef={audioRef}
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setSongInfo={setSongInfo}
          songInfo={songInfo}
          songs={songs}
          setCurrentSong={setCurrentSong}
          setSongs={setSongs}
          alignment={alignment}
          setAlignment={setAlignment}
        />
      </div>
      {/* )} */}
    </>
  );
}

export default App;
