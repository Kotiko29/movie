/*jshint esversion: 6 */
import style from './src/assets/style/index.styl'; // импорт стилей
import Router from './router';
let currentPageIndex = 1; // счетчик для переключения страниц с фильмами
let movies = [];

//функция загрузки фильмов на страницу
function loadMovie(currentPageIndex) {
  let url = `https://api.themoviedb.org/3/discover/movie?page=${currentPageIndex}&api_key=1e8f63bdc33f52e0915fe3ddfbef6ea9&query=sort_by=top_rated_movies.desc`;

  fetch(url)
    .then(response =>{
      return response.json();
    })
    .then(data => {
      movies = data.results;
      insertData(movies);
      // console.log(movies);

      let moviesLink = document.querySelectorAll('.content-link');

      for(let i=0; i < moviesLink.length; i++){
        moviesLink[i].addEventListener('click', function(){
          let cookieId = document.cookie;// Прочитать куки
          let movieID = moviesLink[i].getAttribute("data-id");
          document.cookie = `ID=${movieID}`; 
          console.log(cookieId);
          document.location.href="post.html";
        });          
      }
   });
}

// Читаем куки на странице фильма

let cookieId = +(document.cookie).slice(3);// Прочитать куки
console.log(cookieId);

// функция загрузки информации о фильме

function loadMovieInfo(){
  let movieUrl = `https://api.themoviedb.org/3/movie/${cookieId}?api_key=1e8f63bdc33f52e0915fe3ddfbef6ea9&query&append_to_response=videos`;
  // console.log(movieUrl);
  fetch(movieUrl)
      .then(response => {
        // console.log(response);
        return response.json();
      })
      .then(data => {
        // console.log(data);
        addMovieInfo(data);
      });
}
loadMovieInfo();

 
if(document.querySelector('.index')){

  let hamb = document.querySelector('.hamb'),
    sidebar = document.querySelector('.sidebar');

      // открытие и закрытие сайдбара в мобильной версии
    hamb.addEventListener(`click`, function() { // При клике на кнопку меню сработает функция
      hamb.classList.toggle('hamb-close');
      sidebar.classList.toggle('sidebar-active');
    });

    loadMovie();

    //Подгрузка фильмов при нажатии на кнопку
  let changePageBtn = document.querySelector('.change_page');
  changePageBtn.addEventListener('click', function() {
    currentPageIndex++;
    loadMovie(currentPageIndex);
    if(currentPageIndex>4){
      changePageBtn.classList.add('hide');
    }
  });
}

//функция для добавления содержимого на страницу с фильмами
function insertData(movies) {
  let movieContainer = document.querySelector('.content-list');

  for(var i = 0; i < movies.length; i++){
    movieContainer.innerHTML += `
    <a class="content-link" data-id="${movies[i].id}">
      <div class="content-item-preview">
        <img src="https://image.tmdb.org/t/p/w500/${movies[i].poster_path}" class="img-preview">
      </div>
      <div class="content-item-info">
        <span class="content-item-rating">${movies[i].vote_average}</span>
        <span class="content-item-title">${movies[i].original_title} </span>
        <span class="content-item-year">${new Date(Date.parse(movies[i].release_date)).getFullYear()}</span>
      </div>
    </a>
    `;
  }
}

///////// Функция добавления информации о фильме на страницу//////////////

function addMovieInfo(data) {
  let movieInfo = document.querySelector('.movie-info');

// добавляем бэкдроп на страницу фильма
  movieInfo.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${data.backdrop_path}`;

  // добавляем список ссылок с тегами жанров в переменную
  let text = ``;
  console.log(typeof(text));
  for(let i =0; i<data.genres.length; i++){
    text +=`<a href="#">${data.genres[i].name}</a>`;
  }

  // формируем html описания фильма
  movieInfo.innerHTML = `
    <div class="movie-description">
      <h2>${data.original_title}</h2>
      <p>${data.overview}</p>
      <div class="movie-rating-wrap">
        <div class="movie-rating">
          <div>${data.vote_average}</div>
        </div>
        <div class="tags">${text}</div>
      </div>
    </div>
  `;
}

if(window.isPostPage){

  loadMovieInfo();

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



//////////////////////////////////////////////////////////////////////////

        // инициализируем роутер
        Router.init();
       
        // запускаем главную страницу
        Router.dispatch('/');

        // обработчик нажатий на ссылки
        let handler = event =>  {
           
            // получаем запрошенный url
            let url = new URL(event.currentTarget.href);
           
            // запускаем роутер, предавая ему path
            Router.dispatch(url.pathname);
           
            // запрещаем дальнейший переход по ссылке
            event.preventDefault();
        }

        // получаем все ссылки на странице
        let anchors = document.querySelectorAll('a');
        console.log(anchors);
       
        // вешаем на событие onclick обработчик
        for( let anchor of anchors ) anchor.onclick = handler();
       

