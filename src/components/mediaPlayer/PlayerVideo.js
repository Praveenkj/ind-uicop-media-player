import React, { useEffect, useState } from 'react';
import Plyr from "plyr";
//import Plyr from "plyr-react";
// import "plyr-react/dist/plyr.css";
let player;
//= new Plyr('video', {
//     controls: ['play-large', 'play', 'progress', 'current-time', 'volume', 'settings', 'pip', 'airplay', 'fullscreen'],
//     autoplay: true,
// });
const PlayerVideo = ({ srcCheck, currentSong, handleKeyDown, handlePause, audioRef, currentTime, endTime }) => {
    console.log("currentTime", currentTime)
    console.log(currentSong, 'currentSong')
    useEffect(() => {
        player = new Plyr('video', {
            controls: ['play-large', 'play', 'progress', 'current-time', 'volume', 'settings', 'pip', 'airplay', 'fullscreen'],
            // autoplay: true,
        });
        // player.volume = 0.5; // works
        player.on("play", function () {
            player.currentTime = currentTime;
        })
    }, [currentSong, currentTime]);

    // player.restart(currentTime);
    // player.once('canplay', event => {
    //     player.currentTime = currentTime;
    // });
    // 
    return (
        // <Plyr source={videoSrc} />
        <div className="container" id={`videoId${currentSong?.name}`} key={currentSong?.name} style={{ margin: 'auto' ,width:'70%'}}>
            {currentSong && <video ref={audioRef} autoplay id="video"  playsinline crossorigin controls currentTime={currentTime} onKeyDown={handleKeyDown} width='90%'>
                {/* <source src={currentSong.multipleLanguages.eng.low + "#t=" + currentTime + "," + endTime} type="video/mp4" size="576" />
                <source src={currentSong.multipleLanguages.eng.medium + "#t=" + currentTime + "," + endTime} type="video/mp4" size="720" />
                <source src={currentSong.multipleLanguages.eng.high + "#t=" + "#t=" + currentTime + "," + endTime} type="video/mp4" size="1080" /> */}
                <source src={currentSong.multipleLanguages.eng.low} type="video/mp4" size="576" />
                <source src={currentSong.multipleLanguages.eng.medium} type="video/mp4" size="720" />
                <source src={currentSong.multipleLanguages.eng.high} type="video/mp4" size="1080" />
                {/* <!-- Caption files --> */}
                <track kind="captions" label="English" src={require("../../captionPath/captions.vtt")} srclang="en" default />
                <track kind="captions" label="Français" src={require("../../captionPath/frenchCaptions.vtt")} srclang="fr"  />
                {/* <!-- Fallback for browsers that don't support the <video> element --> */}
                {/* <a href="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" download>Download</a> */}
            </video>}
        </div>
    );
}

export default PlayerVideo;
