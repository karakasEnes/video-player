const player = document.querySelector(".player");
const video = document.querySelector(".video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const speed = document.querySelector(".player-speed");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");

// Play & Pause ----------------------------------- //
function showPlayIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    showPlayIcon();
  }
}

// Progress Bar ---------------------------------- //

function displayTime(time) {
  let seconds = Math.floor(time % 60);
  const minutes = Math.floor(time / 60);

  seconds = seconds > 9 ? seconds : `0${seconds}`;

  return `${minutes}:${seconds}`;
}

// update progress bar as video plays

function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;

  currentTime.textContent = displayTime(video.currentTime);
  duration.textContent = displayTime(video.duration);
}

//seek at progress bar
function setProggress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  currentTime.textContent = displayTime(video.currentTime);

  video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //

function setVolumeBar(e) {
  let volumeNumber = e.offsetX / volumeRange.offsetWidth;

  if (volumeNumber < 0.15) {
    volumeNumber = 0;
  } else if (volumeNumber > 0.85) {
    volumeNumber = 1;
  }

  video.volume = volumeNumber;
  volumeBar.style.width = `${video.volume * 100}% `;

  //change icon
  volumeIcon.className = "";

  if (volumeNumber > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volumeNumber < 0.7 && volumeNumber > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volumeNumber === 0) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }
}

function toggleVolume() {
  video.muted ? false : (video.volume = 0);
}

// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

//event listener

playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

// video end, show play button icon
video.addEventListener("ended", showPlayIcon);

video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);

progressRange.addEventListener("click", setProggress);

volumeRange.addEventListener("click", setVolumeBar);
// volumeIcon.addEventListener("click", toggleVolume);
