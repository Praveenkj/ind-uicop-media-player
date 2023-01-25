import '../Styles/Library.css'
//import Cookies from 'js-cookie';

const Library = ({
  song,
  songs,
  setCurrentSong,
  id,
  audioRef,
  isPlaying,
  currentSong,
  setSongs,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    audioRef?.current?.play();
    setSongs(
      songs.map((targetSong) => {
        return {
          ...targetSong,
          active: targetSong.id === song.id,
        };
      })
    );
    localStorage.setItem('video-name', song.name.toString())

    //Cookies.set('video-name', song.name.toString());

  };
  if (isPlaying) audioRef.current.play();
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song-container ${(song.active || (currentSong.active && song.name === currentSong.name)) ? "selected" : ""}`}
    >
      <img src={song.cover} alt={`Song cover of ${song.name}`} />
      <div className="song-description">
        <h3>{song.name}</h3>
        {/* <span>{song.artist}</span> */}
      </div>
    </div>
  );
};

export default Library;
