const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const likeButton = document.getElementById('like');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

const linkin_park_lost = {
    songName : 'Lost',
    artist : 'Linkin Park',
    file :'linkin_park_lost',
    liked: false,
};

const greenday21 = {
    songName : '21 Guns',
    artist : 'Green Day',
    file :'greenday21',
    liked: false,
};



const imagine_dragons = {
    songName : 'Believer',
    artist : 'Imagine Dragons',
    file :'imagine-dragons',
    liked: false,
};


const RUmine = {
    songName : 'R U Mine',
    artist : 'Arctic Monkeys',
    file :'ru_mine_1',
    liked: false,
};

const panic_at_the_disco = {
    songName : 'I Write Sins Not Tragedies',
    artist : 'Panic At The Disco',
    file :'panic_at_the_disco',
    liked: false,
};

const muse_uprising = {
    songName : 'Uprising',
    artist : 'Muse',
    file :'muse_uprising',
    liked: false,
};


const theStrokes = {
    songName : 'You Only Live Once',
    artist : 'The Strokes',
    file :'the_strokes',
    liked: false,
};

const blink_182 = {
    songName : 'All The Small Things',
    artist : 'Blink 182',
    file :'blink_182',
    liked: false,
};

const fall_out_boy = {
    songName : "This Ain't A Scene",
    artist : 'Fall Out Boy',
    file :'fall_out_boy',
    liked: false,
};

const AskingAlexandria = {
    songName : 'The Death of Me',
    artist : 'Asking Alexandria',
    file :'Asking_Alexandria',
    liked: false,
};

const AmericanIdiot = {
    songName : 'American Idiot',
    artist : 'Green Day',
    file :'green_day_american_idiot',
    liked: false,
};

const NirvanaComeAsYouAre = {
    songName : 'Come As You Are',
    artist : 'Nirvana',
    file :'Nirvana_Come_As_You_Are',
    liked: false,
};

const LinkinPark_Papercut = {
    songName : 'Papercut',
    artist : 'Linkin Park',
    file :'linkinpark_papercut',
    liked: false,
};

const coldplay_paradise = {
    songName : 'Paradise',
    artist : 'Coldplay',
    file :'coldplay_paradise',
    liked: false,
};

const Amy_Winehouse_Back_To_Black = {
    songName : 'Back To Black',
    artist : 'Amy Winehouse',
    file :'Amy_Winehouse_Back_To_Black',
    liked: false,
};

const A7X_CriticalAcclaim = {
    songName : 'Critical Acclaim',
    artist : 'Avenged Sevenfold',
    file :'A7X_CriticalAcclaim',
    liked: false,
};

const Red_Hot_DarkNecessities = {
    songName : 'Dark Necessities',
    artist : 'Red Hot Chili Peppers',
    file :'Red_Hot_DarkNecessities',
    liked: false,
};




let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originalPlaylist = JSON.parse(localStorage.getItem('playrock')) ?? [linkin_park_lost, imagine_dragons, greenday21, RUmine, AmericanIdiot,
    NirvanaComeAsYouAre, LinkinPark_Papercut, 
    coldplay_paradise, Amy_Winehouse_Back_To_Black, 
    A7X_CriticalAcclaim, Red_Hot_DarkNecessities, AskingAlexandria, theStrokes,
    blink_182, fall_out_boy, muse_uprising, panic_at_the_disco

];

let sortedPlaylist = [...originalPlaylist];

let index = 0; 



function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}


function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    }
    else{
        playSong();
    }
}

function likeButtonRender(){
    if (sortedPlaylist[index].liked === true){
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active');
    }
    else{
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.classList.add('button-active');

    }


}

function loadSong() {
    cover.src = `imagens/${sortedPlaylist[index].file}.jpg`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
    likeButtonRender();
}

function previousSong(){
    if(index === 0){
        index = sortedPlaylist.length - 1;
    }
    else{
        index -= 1;
    }
    loadSong();
    playSong();
}

function nextSong(){
    if(index === sortedPlaylist.length - 1){
        index = 0;
    }
    else{
        index += 1;
    }
    loadSong();
    playSong();
}


function updateProgress() {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition / width) * song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while (currentIndex > 0) {
      let randomIndex = Math.floor(Math.random() * size);
      let aux = preShuffleArray[currentIndex];
      preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
      preShuffleArray[randomIndex] = aux;
      currentIndex -= 1;
    }
}


function shuffleButtonClicked() {
    if (isShuffled === false) {
      isShuffled = true;
      shuffleArray(sortedPlaylist);
      shuffleButton.classList.add('button-active');
    } else {
      isShuffled = false;
      sortedPlaylist = [...originalPlaylist];
      shuffleButton.classList.remove('button-active');
    }
}

function repeatButtonClicked() {
    if (repeatOn === false) {
      repeatOn = true;
      repeatButton.classList.add('button-active');
    } else {
      repeatOn = false;
      repeatButton.classList.remove('button-active');
    }
}

function nextOrRepeat() {
    if (repeatOn === false){
        nextSong();

    }
    else {
        playSong
    }

}

function toHHMMSS(originalNumber) {
    let hours = Math.floor(originalNumber / 3600);
    let min = Math.floor((originalNumber - hours * 3600) / 60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);
  
    return `${hours.toString().padStart(2, '0')}:${min
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }


function updateTotaltTime(){
    totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonClicked() {
    if (sortedPlaylist[index].liked === false) {
      sortedPlaylist[index].liked = true;
    } else {
      sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playrock', JSON.stringify(originalPlaylist));
  }
  


loadSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotaltTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonClicked);


