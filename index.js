/*jshint esversion: 6 */
import style from './src/assets/style/index.styl'; // импорт стилей
// Создаем массив
let movieUrls = [
  "static/HalloweenKills.mp4",
  "static/AdAstraTrailer.mp4",
  "static/Ghostbusters.mp4",
  
  "static/Koschey.mp4",
  "static/Soul.mp4",
  "static/ZvezdnyRazumTeazer.mp4"
];
// находим элементы
let btnPreview = document.querySelector('.btn-preview'),
    btnNext = document.querySelector('.btn-next'),
    sourceVideo = document.querySelector('source'),
    currentVideoIndex = movieUrls[0];

    // вызываем событие
    btnNext.addEventListener('click', function() {
      alert('Меня нажали');
    });
    btnPreview.addEventListener('click', function() {
      alert('Меня нажали');
    });

    sourceVideo.src = currentVideoIndex;