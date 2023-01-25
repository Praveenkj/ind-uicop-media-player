import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Player.css";
const PlayerControl = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  setSongInfo,
  songInfo,
  songs,
  setCurrentSong,
  setSongs,
  alignment,
  setAlignment,
}) => {
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
  const playSongHandler = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const fastForward = () => {
    audioRef.current.currentTime += 10;
  };
  const fastBackward = () => {
    audioRef.current.currentTime -= 10;
  };
  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    } else if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <div className="player">
      {/* <div className="time-control">
        <span>{getTime(songInfo.currentTime)}</span>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
        >
          <input
            min={0}
            max={songInfo.duration || 0.0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          ></input>
          <div className="animate-track" style={trackAnim}></div>
        </div>
        <span>{getTime(songInfo.duration || 0.0)}</span>
      </div> */}
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
          onClick={() => skipTrackHandler("skip-back")}
        />
        <FontAwesomeIcon
          className="fast-backward"
          icon={faBackward}
          onClick={fastBackward}
        />
        {/* <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={!isPlaying ? faPlay : faPause}
          size="2x"
        /> */}
        {/* <IconButton onClick={playSongHandler}>
                    {!isPlaying ? (
                        <PlayCircleFilledIcon
                            color="primary"
                            sx={{ fontSize: 80 }}
                        />
                    ) : (
                        <PauseCircleFilledIcon
                            color="primary"
                            sx={{ fontSize: 80 }}
                        />
                    )}
                </IconButton> */}
        <FontAwesomeIcon
          className="fast-forward"
          icon={faForward}
          onClick={fastForward}
        />
        <FontAwesomeIcon
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
      <div>
        {/* <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="eng">English</ToggleButton>
          <ToggleButton value="Spanish">Spanish</ToggleButton>
          <ToggleButton value="Hindi">Hindi</ToggleButton>
        </ToggleButtonGroup> */}
      </div>
    </div>
  );
};

export default PlayerControl;
