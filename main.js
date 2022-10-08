const song = document.getElementById('song');
const playBtn = document.querySelector('.play-inner');
const nextBtn = document.querySelector('.play-for');
const prevBtn = document.querySelector('.play-back');
const durationTime = document.querySelector('.duration');
const remainingTime = document.querySelector('.remaining');
let rangeBar = document.querySelector('.range');

const musicName = document.querySelector('.music-name');
const musicThumbnail = document.querySelector('.music-thumb');
const musicImg = document.querySelector('.music-thumb img');

const heart = document.querySelector('.heart-icon');

const playRepeat = document.querySelector('.play-repeat');

let isPlaying = true; //bai nhac dang phat hay khong
let indexSong = 0; //bai hat 1 idex = 0
let indexImg = 0;
let isRepeat = false;
let isfavourite = true;

// const listMusics = ['anhnhoem.mp3', 'lalung.mp3', 'nguoiay.mp3'];
const listMusics = [
    {
        id: 1,
        title: 'Unstoppable',
        file: '01.mp3',
        img: './img/01.jpg',
    },

    {
        id: 2,
        title: 'Lạ Lùng',
        file: 'lalung.mp3',
        img: './img/lalung.jpg',
    },

    {
        id: 3,
        title: 'Anh Nhớ Em',
        file: 'anhnhoem.mp3',
        img: './img/anhnhoem.jpg'
    },

    {
        id: 4,
        title: 'Đời Dạy Tôi',
        file: 'đoiaytoi.mp3',
        img: './img/doidaytoi.jpg'
    },

    {
        id: 5,
        title: 'Move Your Baby',
        file: '02.mp3',
        img: './img/02.jpg'
    },

    {
        id: 6,
        title: 'We Back Home',
        file: '03.mp3',
        img: './img/03.jpg'
    },

    {
        id: 7,
        title: 'Hậu Duệ Mặt Trời',
        file: '04.mp3',
        img: './img/04.jpg'
    }
]
/*
 * music
 * id
 * title : Anh Nhớ Em
 * file: anhnhoem.mp3
 * img: anhnhoem.img
 *
 *
 *
 *
 *
*/

displayTimes();

let timer;




playRepeat.addEventListener('click', function(){
    if(isRepeat){
        isRepeat = false;
        playRepeat.removeAttribute('style')
    } else {
        isRepeat = true;
        playRepeat.style.color = '#CCA9AF';
    }
});


nextBtn.addEventListener('click', function(){
    changSong(1)
})
prevBtn.addEventListener('click', function(){
    changSong(-1)
})

song.addEventListener('ended',handleEndedSong);
function handleEndedSong (){
    if(isRepeat) {

        isPlaying = true;
        playPause();
    } else {
        changSong(1)
    }
}

function changSong(dir){
    if(dir === 1) {
        //next song
        indexSong++;
        if(indexSong >= listMusics.length) {
            indexSong = 0;
        }
        isPlaying = true;
        isfavourite = false;
    } else if(dir === -1) {
        indexSong--;
        if(indexSong < 0) {
            indexSong = listMusics.length-1;
        }
        isPlaying = true;
        isfavourite = false;
    }

    init(indexSong);
    song.setAttribute('src', `./music/${listMusics[indexSong].file}`);
    song.setAttribute('scr', `./img/${listMusics[indexImg].file}`)
    playPause();
    favourite();
}

playBtn.addEventListener('click',playPause);
    function playPause (){
        if(isPlaying){
            musicThumbnail.classList.add('is-playing');
            song.play();
            playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`
            isPlaying = false;
            timer = setInterval(displayTimes, 1000);
        } else {
            musicThumbnail.classList.remove('is-playing');

            song.pause();
            playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`
            isPlaying = true;
            clearInterval(timer);
        } 
    }
    
heart.addEventListener('click', favourite);  //Favourite: yêu thích;
function favourite(){
    if(isfavourite) {
        heart.innerHTML = `<i class="fa-solid fa-heart heart-red"></i>`
        isfavourite = false;
    } else {
        heart.innerHTML = `<i class="fa-regular fa-heart"></i>`
        isfavourite = true;
    }
}


function displayTimes (){
    const {duration, currentTime} = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainingTime.textContent = formatTimes(currentTime);
    

    if(!duration) {
        durationTime.textContent = '00:00';
    } else {
        durationTime.textContent = formatTimes(duration);
    }
}

function formatTimes (number){
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

rangeBar.addEventListener('change', handleChangeBar);
function handleChangeBar(){
    song.currentTime = rangeBar.value;
}

function init(indexSong) {
    song.setAttribute('src', `./music/${listMusics[indexSong].file}`);
    musicImg.setAttribute('src', listMusics[indexSong].img);
    musicName.textContent = listMusics[indexSong].title;
}
displayTimes();
init(indexSong);

