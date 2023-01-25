import Library from "./Library";
import '../Styles/Audio.css'
const Audio = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
  currentSong
}) => {
  // const updateVideo = (index, updatedVideo) => {
  //   const updatedVideos = [...videos];
  //   updatedVideos[index] = updatedVideo;
  //   setSongs(updatedVideos);
  // };

  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <Library
            song={song}
            setCurrentSong={setCurrentSong}
            songs={songs}
            id={song.id}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            currentSong={currentSong}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Audio;
