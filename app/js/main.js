// ========================== index.html ============================== //


const menu = document.querySelector('.nav__list');
const menuItems = document.querySelectorAll('.menu__item');
const galleryNav = document.querySelector('.gallery__nav');
   
// Add class "active" to manu
if (menu) {
   menu.addEventListener('click', (e) => {
      if (e.target.classList.contains('menu__item')) {
         for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.remove('active')
         };
         e.target.classList.add('active')
      };
   });
}


// Conect mixitup:
if (document.querySelector('.gallery__items')) {
   $(function () {
      const mixer = mixitup(".gallery__items");
   });
};


// Add class "active" on gallery buttons:
if (galleryNav) {
   galleryNav.addEventListener('click', (e) => {
      const target = e.target;
      e.preventDefault();
      const btnsList = galleryNav.querySelectorAll('.gallery__btn');
      const svgList = galleryNav.querySelectorAll('.gallery__svg');

      if (target.classList.contains('gallery__btn')) {
         for (let i = 0; i < btnsList.length; i++) {
            btnsList[i].classList.remove('active')
         };
         target.classList.add('active');

      } else if ((target.classList.contains('gallery__svg'))) {
         for (let i = 0; i < svgList.length; i++) {
            svgList[i].parentElement.classList.remove('active');
         };
         target.parentElement.classList.add('active');
      }
   });
};


// ----------------- header sticky --------------- //
$(window).scroll(function () {
   if ($(window).scrollTop() >= 1) {
      $('.header').addClass('header--sticky');

   } else {
      $('.header').removeClass('header--sticky');
   }
});


// ------------------- burger-menu ---------------- //
document.addEventListener('DOMContentLoaded', () => {
   const burgerOpenIndex = document.querySelector('.burger-index--open'); 
   const burgerCloseindex = document.querySelector('.burger-index--close'); 
   const mobileMenuIndex = document.querySelector('.mobile-menu-index'); 
   const bodyLock = document.querySelector('body');

   burgerOpenIndex.addEventListener('click', () => {
      mobileMenuIndex.classList.remove('menu-hidden');
      bodyLock.classList.add('lock');
   });

   burgerCloseindex.addEventListener('click', () => {
      mobileMenuIndex.classList.add('menu-hidden'); 
      bodyLock.classList.remove('lock');
   });
});


// --------------------- swiper comments ------------------ //
if (galleryNav) {
   const swiper = new Swiper('.swiper-comments', {
      loop: true,
   
     // If we need pagination
      pagination: {
         el: '.comments__dots',
         bulletClass: 'swiper-dot',
         bulletActiveClass: 'swiper-dot--active',
         clickable: true,
      },
   
     // Navigation arrows
      navigation: {
         nextEl: '.comments__arrow--next',
         prevEl: '.comments__arrow--prev',
      },
      
   });    
};

// -------------------- swiper restorants ---------------- //
if(window.innerWidth <= 576 && galleryNav) {
  const restoSlider = new Swiper('.restorants-swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    centeredSlides: true,
    centeredSlidesBounds: true,
    pagination: {
      el: ".restorants__dots",
      bulletClass: 'swiper-dot',
      bulletActiveClass: 'swiper-dot--active',
      clickable: true
    },
  });
}



// ======================================= pages.html =========================================//



const filterTop = document.querySelector('.filter-top');
const filterNews = document.querySelector('.js-news');
const galleryList = document.querySelector('.gallery__list');
const checkBoxList = document.querySelectorAll('.filter__checkbox');
const cardsList = document.querySelectorAll('.gallery__item');

if (filterTop) {
   addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('js-result')) {
         target.classList.toggle('active');
         target.nextElementSibling.classList.toggle('hidden');

      } else if (target.classList.contains('js-parameter')) {
         const parameter = target.textContent;
         target.parentElement.previousElementSibling.textContent = parameter;
         target.parentElement.classList.toggle('hidden');
         target.parentElement.previousElementSibling.classList.toggle('active');
      }
   });
};


// -------------- Conect mixitup --------------- //
if (document.querySelector('.gallery__list')) {
   $(function () {
      const mixer = mixitup(".gallery__list");
   });
}

// Conect nouislider:
const rangeSlider = document.querySelector('.filter-price__range');
const inputMin = document.querySelector('.filter-price__fild--min');
const inputMax = document.querySelector('.filter-price__fild--max');

if (rangeSlider) {
   noUiSlider.create(rangeSlider, {
      start: [100, 1000],
      connect: true,
      padding: [0, 0],
      animate: true,
      step: 10,
      range: {
         'min': 50,
         'max': 1200
      }
   });
}

if (rangeSlider) {
   rangeSlider.noUiSlider.on('update', function (values, handle) {
      let value = parseFloat(values[handle]).toFixed(0);
      if (handle) {
         inputMax.value = value;
      } else {
         inputMin.value = value;
      }
   });
};

// Оновлення значень слайдера при зміні input-ів: !!!!!!!!
// inputMin.addEventListener('change', function () {
//    rangeSlider.noUiSlider.set([this.value, null]);
// });

// inputMax.addEventListener('change', function () {
//    rangeSlider.noUiSlider.set([null, this.value]);
// });


// --------------- Event for news ------------ //
if (filterNews) {
   filterNews.addEventListener('click', (e) => {
      const target = e.target;

      if (target.id === 'new' && target.checked === true) {
         // filter('New');
         watchForCheckBox()

      } else if (target.id === 'sale' && target.checked === true) {
         // filter('Sale');
         watchForCheckBox()

      } else if (target.id === 'hit' && target.checked === true) {
         // filter('Hit');
         watchForCheckBox()
      } else if (target.checked === false) {
         watchForCheckBox()
      }
   })
}


function filter(type) {
   const filterResult = [...cardsList].filter(item => item.firstElementChild.dataset.news.toLowerCase() === `${type.toLowerCase()}`); 
   filterResult.forEach(item => galleryList.insertAdjacentElement('afterbegin', item));
}


function returnListCards() {
   galleryList.innerHTML = '';
   cardsList.forEach(item => galleryList.insertAdjacentElement('afterbegin', item));
}


function watchForCheckBox() {
   galleryList.innerHTML = '';
   const resultCheckBox = [...checkBoxList].filter(item => item.checked === true);

   if (resultCheckBox.length < 1) {
      returnListCards();

   } else { 
      resultCheckBox.forEach(item => {
         let id = item.id;
         filter(id);
      });
   }
};


// -------------- Add banner news ---------------- //
const catalog = document.querySelector('.catalog');
function addBanner() {
   const catalogItems = document.querySelectorAll('.gallery__item');
   [...catalogItems].forEach(item => {
      let type = item.firstElementChild.dataset.news;
      const banner = `<span class="new new--${type.toLowerCase()}">${type}</span>`;
      if (!type == false) {
         item.firstElementChild.firstElementChild.insertAdjacentHTML('afterbegin', banner);
      };
   });
};

if (catalog) {
   addBanner();
};

// button mobile side bar:
const sideBarClose = document.querySelector('.filters__closs-sidebar');
const sideBarOpen = document.querySelector('.catalog__mobile-sidebar');
const catalogFilters = document.querySelector('.catalog__filters');
const bodyLocked = document.querySelector('body');

if (sideBarOpen) {
   sideBarOpen.addEventListener('click', (e) => {
      catalogFilters.classList.add('show');
      bodyLocked.classList.add('lock');
   });

   sideBarClose.addEventListener('click', (e) => {
      catalogFilters.classList.remove('show');
      bodyLocked.classList.remove('lock');
   });
};



// ==================================== product.html ===================================== //



const tabsBtn = document.querySelectorAll('.tabs__link');
const tabs = document.querySelectorAll('.tab');

// Accordeon:
tabsBtn.forEach(item => {
   item.addEventListener('click', (e) => {
      const target = e.target;
      addClass(target);
      showTab(target);
   });
});

function addClass(e) {
   tabsBtn.forEach(item => {
      item.classList.remove('active');
      e.classList.add('active');
   });
};

function showTab(e) {
   tabs.forEach(item => item.classList.add('hidden'));

   if (e.id === 'tab[1]') {
      tabs[0].classList.remove('hidden');
   } else if (e.id === 'tab[2]') {
      tabs[1].classList.remove('hidden');
   } else if (e.id === 'tab[3]') {
      tabs[2].classList.remove('hidden');
   }
};


// --------------swiper product----------------- //
if (tabs) {
   const swiper = new Swiper('.swiper--product', {
      loop: true,
   
     // If we need pagination
      pagination: {
         el: '.comments__dots',
         clickable: true,
      },
   
     // Navigation arrows
      navigation: {
         nextEl: '.product--prev',
         prevEl: '.product--next',
      },
   });    
}


// ---------------- swiper liked ----------------- //
if (tabs) {
   const swiper = new Swiper('.liked__slider', {
     // Navigation arrows
      navigation: {
         nextEl: '.liked__prev',
         prevEl: '.liked__next',
      },
      breakpoints: {
         1200: {
            slidesPerView: 5,
            spaceBetween: 30,
         },
      },
   });    
};


// button of quantity products:
const orderInner = document.querySelector('.order__inner');
const orderInput = document.querySelector('.order__input');

if (orderInput) {
   orderInner.addEventListener('click', (e) => {
      if (e.target.id === 'btn-less') {
         let targetValue = e.target.nextElementSibling.value;
   
         if (targetValue <= 1) {
            targetValue = 1;
         } else {
            e.target.nextElementSibling.value--;
         }
      } else if (e.target.id === 'btn-more') {
         e.target.previousElementSibling.previousElementSibling.value++;
      }
   });
};


// static stars rating:
const staticStars = document.querySelectorAll('.static-stars'); // знаходимо всі блоки з класом static-stars

if (staticStars) {
   staticStars.forEach((itemStars, index) => {
      let stars = itemStars.dataset.stars; // шукаємо data атребут
      // const starRating = new Starry(starRatingEl);
   
      new Starry(itemStars, {
         name: `stars-${index}`, // ім'я кожного блока з статичним рейтингом
         readOnly: true, // тільки для демонстрації рейтингу (без можливості голосування)
         beginWith: 20 * stars, // задається у % (Всего 100%). Тобто 20% * на 4 зірки(залежно скільки в data-stars="4") = 80% -це 4 зірки відповідно
         icons: { // перестилізовуємо ісонки
            blank: '../images/sprite.svg#icon-star-blank',
            hover: '../images/sprite.svg#icon-star-fill',
            active: '../images/sprite.svg#icon-star-fill'
         }
      });
   });
};


// Rating stars:
const ratingStars = document.querySelectorAll('.rating-stars');

if (ratingStars) {
   ratingStars.forEach(itemStars => {
      new Starry(itemStars, {
         name: `formStars`,
         readOnly: false, 
         icons: { // перестилізовуємо ісонки
            blank: '../images/sprite.svg#icon-star-blank',
            hover: '../images/sprite.svg#icon-star-fill',
            active: '../images/sprite.svg#icon-star-fill'
         }
      })
   })
}


// Light Gallery:
const lightBox = document.querySelector('.product-slider__items');

if (lightBox) {
   lightGallery(lightBox, {
      plugins: [lgPager], // Підключаемо плагін lgPager (підключали разом з lightGallery)
      speeed: 500, // швидкість
      addClass: 'product-light-box', // додаємо клас для додаткової стилізації (якщо потрібно)
      counter: false, // відключаемо каунтер
      download: false, // відключаємо "зберегти зображення"
      // closeOnTap: false, // можливість закрити при клікові на саме вікно
      getCaptionFromTitleOrAlt: false // підпис до залереї
   })
};
























