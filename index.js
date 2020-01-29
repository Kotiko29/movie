/*jshint esversion: 6 */
import style from './src/assets/style/index.styl'; // импорт стилей
// Создаем массив
let movieUrls = [
  "static/AdAstraTrailer.mp4",
  "static/Ghostbusters.mp4",
  "static/HalloweenKills.mp4",
  "static/Koschey.mp4",
  "static/Soul.mp4",
  "static/ZvezdnyRazumTeazer.mp4"
];
// находим элементы
let btnPreview = document.querySelector('.btn-preview'),
    btnNext = document.querySelector('.btn-next'),
    sourceVideo = document.querySelector('video'),
    currentVideoIndex = 0;

sourceVideo.src = movieUrls[currentVideoIndex];
btnPreview.disabled = true;

// вызываем событие
btnNext.addEventListener('click', function() {
  console.log("следующий ролик");
  currentVideoIndex++;
  sourceVideo.src = movieUrls[currentVideoIndex];
  btnPreview.disabled = false;
  if(currentVideoIndex === (movieUrls.length-1)){
    btnNext.disabled = true;
  }
});
btnPreview.addEventListener('click', function() {
  console.log("предыдущий ролик");
  currentVideoIndex--;
  sourceVideo.src = movieUrls[currentVideoIndex];
  btnNext.disabled = false;
  if(currentVideoIndex === 0){
    btnPreview.disabled = true;
  }
});

    