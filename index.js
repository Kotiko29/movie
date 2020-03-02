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
  /////////////////////////Переключение роликов в плеере////////////////////////////////
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
      btnPreview = document.querySelector('.btn-preview'),// кнопка назад
      btnNext = document.querySelector('.btn-next'),// кнопка вперед
      currentVideoIndex = 0; // счетчик
      btnPreview.disabled = true;// кнопка "назад" изначально заблокирована

// Переключение видео в плеере
let player = videojs('videoPlayer', {
  controls: true,
  poster: '../../../static/pictures/silverscreen.jpg',
  autoplay: false, //убрал автоплей - просто не удобно тестировать)
  sources: [
    { type: 'video/mp4', src: 'static/video/AdAstraTrailer.mp4'} //оставил одно видео в источниках плеера
  ]
}, function() {
  btnNext.addEventListener('click', () => {
      currentVideoIndex++;
      console.log(movieUrls[currentVideoIndex]);
      this.src({ type: 'video/mp4', src: movieUrls[currentVideoIndex]}); //меняем src у player с помощью метода src()
      btnPreview.disabled = false;//после клика на "вперед" убираем блокировку кнопки
      if(currentVideoIndex === (movieUrls.length-1)){//кгода доходим до последнего элемента, бликируем "вперед"
        btnNext.disabled = true;
      }
      this.play(); //после смены src запускаем проигрывание плеера
      });
  btnPreview.addEventListener('click', () => {
      currentVideoIndex--;
      console.log(movieUrls[currentVideoIndex]);
      this.src({ type: 'video/mp4', src: movieUrls[currentVideoIndex]});
      btnNext.disabled = false;
      if(currentVideoIndex === 0){
        btnPreview.disabled = true;
      }
      this.play(); //после смены src запускаем проигрывание плеера
  });

});

/////////////////////////Меняем скриншот при наведении////////////////////////////////
//создаем массив с картинками
let screenshotUrls = [
  "../../../static/screenshots/212154.jpg",
  "../../../static/screenshots/212155.jpg",
  "../../../static/screenshots/212156.jpg",
  "../../../static/screenshots/212157.jpg",
  "../../../static/screenshots/212158.jpg",
  "../../../static/screenshots/212159.jpg",
];

let movieScreen = document.querySelector('.movie-info'); //Находим элемент с картинкой
let ScreenIndex = 0; // счетчик
let timer;

movieScreen.style.backgroundImage = "url" + "(" +screenshotUrls[0]+")";//Картинка в начальном положении

//Запускаем слайдер при наведениии мыши
movieScreen.addEventListener('mouseover', function RunMovieScreen () {

  timer = setTimeout(function(){
    movieScreen.style.backgroundImage = "url" + "(" +screenshotUrls[ScreenIndex]+")";
    ScreenIndex++;  

   if(ScreenIndex === screenshotUrls.length) {
    ScreenIndex = 0;
    }
    RunMovieScreen();
  }, 2000);}
);
//Останавливаем слайдер, кода мышь убрали
movieScreen.addEventListener('mouseout', function() {
  clearTimeout(timer);
});

}

