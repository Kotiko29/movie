/*jshint esversion: 6 */
import style from './src/assets/style/index.styl'; // импорт стилей

let hamb = document.querySelector('.hamb'),
    sidebar = document.querySelector('.sidebar');
  hamb.addEventListener(`click`, function() { // При клике на кнопку меню сработает функция
    // mainHeaderNavigation.classList.toggle('show'); // у класса .main-header-navigation переключаем класс show
    hamb.classList.toggle('hamb-close');
    sidebar.classList.toggle('sidebar-active');
});


// Создаем массив
let movieUrls = [
  "static/video/AdAstraTrailer.mp4",
  "static/video/Ghostbusters.mp4",
  "static/video/HalloweenKills.mp4",
  "static/video/Koschey.mp4",
  "static/video/Soul.mp4",
  "static/video/ZvezdnyRazumTeazer.mp4"
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

// //создаем массив с постерами фильмов
// let picturesUrls = [
//   "static/pictures/adastra2019.jpg",
//   "static/pictures/3530.jpg",
//   "static/pictures/505841.jpg",
//   "static/pictures/678975.jpg",
//   "static/pictures/826373.jpg",
//   "static/pictures/835086.jpg",
//   "static/pictures/837737.jpg"
//   // "static/pictures/903831.jpg",
//   // "static/pictures/916498.jpg",
//   // "static/pictures/1025082.jpg",
//   // "static/pictures/1128272.jpg",
//   // "static/pictures/1188529.jpg",
//   // "static/pictures/1207299.jpg",
//   // "static/pictures/1254418.jpg",
//   // "static/pictures/8582828.jpg",
//   // "static/pictures/345345345.jpg",
//   // "static/pictures/3530.jpg",
//   // "static/pictures/3530.jpg"
// ];

