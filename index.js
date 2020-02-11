/*jshint esversion: 6 */
import style from './src/assets/style/index.styl'; // импорт стилей

if(document.querySelector('.index')){
  let hamb = document.querySelector('.hamb'),
    sidebar = document.querySelector('.sidebar');

      // открытие и закрытие сайдбара в мобильной версии
    hamb.addEventListener(`click`, function() { // При клике на кнопку меню сработает функция
      hamb.classList.toggle('hamb-close');
      sidebar.classList.toggle('sidebar-active');
    });

}


if(window.isPostPage){
  // Создаем массив
  let  movieUrls = [
    "static/video/AdAstraTrailer.mp4",
    "static/video/Ghostbusters.mp4",
    "static/video/HalloweenKills.mp4",
    "static/video/Koschey.mp4",
    "static/video/Soul.mp4",
    "static/video/ZvezdnyRazumTeazer.mp4"
  ],
  // находим элементы
      btnPreview = document.querySelector('.btn-preview'),
      btnNext = document.querySelector('.btn-next'),
      sourceVideo = document.querySelector('video'),
      currentVideoIndex = 0;

// Переключение видео в плеере

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

}
  