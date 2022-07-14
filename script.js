let flag = false;
let songIndex = 0;
let audioElement = new Audio('1.mp3')
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let songItem = Array.from(document.getElementsByClassName('songItem'))
let masterSongName = document.getElementById('masterSongName')
let songs = [
    { songName: "On And On-Cartoon", filePath: "1.mp3", coverPath: "cover1.jpg" },
    { songName: "Spektrum", filePath: "2.mp3", coverPath: "cover2.jpg" },
    { songName: "Warriyo Mortal", filePath: "3.mp3", coverPath: "cover3.jpg" },
    { songName: "Unknown Brain-Superhero", filePath: "4.mp3", coverPath: "cover4.jpg" },
    { songName: "Assassin's Creed 2 Earth", filePath: "5.mp3", coverPath: "cover5.jpg" },
    { songName: "Assassin's Creed Valhalla Soundtrack", filePath: "6.mp3", coverPath: "cover6.png" }
]
songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName
})

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime == 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = 1
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity = 0;
        flag = true
    }
})
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {

        if (audioElement.paused || audioElement.currentTime == 0) {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            audioElement.currentTime = 0;
            masterSongName.innerText = songs[songIndex].songName;
            e.target.classList.remove('fa-circle-play')
            e.target.classList.add('fa-circle-stop')
            audioElement.src = songIndex + 1 + '.mp3'
            gif.style.opacity = 1
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')
            gif.style.opacity = 1
        }
        else {
            audioElement.pause();
            e.target.classList.remove('fa-circle-stop')
            e.target.classList.add('fa-circle-play')
            masterPlay.classList.remove('fa-circle-pause')
            masterPlay.classList.add('fa-circle-play')
            audioElement.src = songIndex + 1 + '.mp3'
            gif.style.opacity = 0;
        }
    })
})
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 5) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = songIndex + 1 + '.mp3'
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = songIndex - 1 + '.mp3'
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})
