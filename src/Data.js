import { v4 as uuidv4 } from "uuid";

function Music() {
    return [
        {
            name: "video",
            cover: 'https://picsum.photos/200',
            audio: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            color: ["#205950", "#2ab3bf"],
            id: uuidv4(),
            active: false,
            type: "video",
            resumetime: 0,
            endTime: 183,
            multipleLanguages: {
                eng: {
                    low: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
                    high: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4",
                    medium: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
                    //   "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
                    // audio:
                    //   "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                },
                // Spanish: {
                //   low: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
                //   high: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
                //   // audio: "https://mp3.chillhop.com/serve.php/?mp3=9272",
                // },
                lanList: {
                    eng: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
                    Spanish: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
                },
                captions: {
                    english: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt",
                    French: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
                }
            },
        },
        {
            name: "video 1",
            cover: 'https://picsum.photos/300',
            audio: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            color: ["#CD607D", "#c94043"],
            id: uuidv4(),
            active: false,
            type: "video",
            resumetime: 0,
            endTime: 653,
            multipleLanguages: {
                eng: {
                    medium: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
                    low: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                    high: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                },
                lanList: {
                    eng: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
                    Spanish: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
                },

                captions: {
                    english: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt",
                    French: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
                }
            },
        },
        // {
        //   name: "audio",
        //   cover: 'https://picsum.photos/200',
        //   audio: "https://mp3.chillhop.com/serve.php/?mp3=9148",
        //   color: ["#EF8EA9", "#ab417f"],
        //   id: uuidv4(),
        //   active: false,
        //   type: "audio",
        // },
        // {
        //   name: "audio",
        //   cover: 'https://picsum.photos/200',
        //   audio: "https://mp3.chillhop.com/serve.php/?mp3=9228",
        //   color: ["#CD607D", "#c94043"],
        //   id: uuidv4(),
        //   active: false,
        //   type: "audio",
        // },
        // {
        //   name: "audio",
        //   cover: 'https://picsum.photos/200',
        //   audio: "https://mp3.chillhop.com/serve.php/?mp3=10074",
        //   color: ["#205950", "#2ab3bf"],
        //   id: uuidv4(),
        //   active: false,
        //   type: "audio",
        // },
    ];
}

export default Music;
