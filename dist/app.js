!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(0);var o={routes:{"/":"index","/post/:id/:post":"post"},init:function(){this._routes=[];for(let e in this.routes){let t=this.routes[e];this._routes.push({pattern:new RegExp("^"+e.replace(/:\w+/g,"(\\w+)")+"$"),callback:this[t]})}},dispatch:function(e){for(var t=this._routes.length;t--;){var n=e.match(this._routes[t].pattern);n&&this._routes[t].callback.apply(this,n.slice(1))}},index:function(){console.log("Main page")},post:function(e){console.log(`Post #${cookieId}`)}};let i=1,s=[];function r(e){fetch(`https://api.themoviedb.org/3/discover/movie?page=${e}&api_key=1e8f63bdc33f52e0915fe3ddfbef6ea9&query=sort_by=top_rated_movies.desc`).then(e=>e.json()).then(e=>{!function(e){let t=document.querySelector(".content-list");for(var n=0;n<e.length;n++)t.innerHTML+=`\n    <a class="content-link" data-id="${e[n].id}">\n      <div class="content-item-preview">\n        <img src="https://image.tmdb.org/t/p/w500/${e[n].poster_path}" class="img-preview">\n      </div>\n      <div class="content-item-info">\n        <span class="content-item-rating">${e[n].vote_average}</span>\n        <span class="content-item-title">${e[n].original_title} </span>\n        <span class="content-item-year">${new Date(Date.parse(e[n].release_date)).getFullYear()}</span>\n      </div>\n    </a>\n    `}(s=e.results);let t=document.querySelectorAll(".content-link");for(let e=0;e<t.length;e++)t[e].addEventListener("click",function(){let n=document.cookie,o=t[e].getAttribute("data-id");document.cookie=`ID=${o}`,console.log(n),document.location.href="post.html"})})}let c=+document.cookie.slice(3);function a(){fetch(`https://api.themoviedb.org/3/movie/${c}?api_key=1e8f63bdc33f52e0915fe3ddfbef6ea9&query&append_to_response=videos`).then(e=>e.json()).then(e=>{!function(e){let t=document.querySelector(".movie-info");t.style.backgroundImage=`url(https://image.tmdb.org/t/p/w500/${e.backdrop_path}`;let n="";console.log(typeof n);for(let t=0;t<e.genres.length;t++)n+=`<a href="#">${e.genres[t].name}</a>`;t.innerHTML=`\n    <div class="movie-description">\n      <h2>${e.original_title}</h2>\n      <p>${e.overview}</p>\n      <div class="movie-rating-wrap">\n        <div class="movie-rating">\n          <div>${e.vote_average}</div>\n        </div>\n        <div class="tags">${n}</div>\n      </div>\n    </div>\n  `}(e)})}if(console.log(c),a(),document.querySelector(".index")){let e=document.querySelector(".hamb"),t=document.querySelector(".sidebar");e.addEventListener("click",function(){e.classList.toggle("hamb-close"),t.classList.toggle("sidebar-active")}),r();let n=document.querySelector(".change_page");n.addEventListener("click",function(){r(++i),i>4&&n.classList.add("hide")})}if(window.isPostPage){a();let e=["static/video/AdAstraTrailer.mp4","static/video/Ghostbusters.mp4","static/video/HalloweenKills.mp4","static/video/Koschey.mp4","static/video/Soul.mp4","static/video/ZvezdnyRazumTeazer.mp4"],t=document.querySelector(".btn-preview"),n=document.querySelector(".btn-next"),o=0;t.disabled=!0;videojs("videoPlayer",{controls:!0,poster:"../../../static/pictures/silverscreen.jpg",autoplay:!1,sources:[{type:"video/mp4",src:"static/video/AdAstraTrailer.mp4"}]},function(){n.addEventListener("click",()=>{o++,console.log(e[o]),this.src({type:"video/mp4",src:e[o]}),t.disabled=!1,o===e.length-1&&(n.disabled=!0),this.play()}),t.addEventListener("click",()=>{o--,console.log(e[o]),this.src({type:"video/mp4",src:e[o]}),n.disabled=!1,0===o&&(t.disabled=!0),this.play()})});let i,s=["../../../static/screenshots/212154.jpg","../../../static/screenshots/212155.jpg","../../../static/screenshots/212156.jpg","../../../static/screenshots/212157.jpg","../../../static/screenshots/212158.jpg","../../../static/screenshots/212159.jpg"],r=document.querySelector(".movie-info"),c=0;r.style.backgroundImage="url("+s[0]+")",r.addEventListener("mouseover",function e(){i=setTimeout(function(){r.style.backgroundImage="url("+s[c]+")",++c===s.length&&(c=0),e()},2e3)}),r.addEventListener("mouseout",function(){clearTimeout(i)})}o.init(),o.dispatch("/");let l=e=>{let t=new URL(e.currentTarget.href);o.dispatch(t.pathname),e.preventDefault()},d=document.querySelectorAll("a");console.log(d);for(let e of d)e.onclick=l()}]);