'use strict';
var pageHeader = document.querySelector('.page-header');
var menuMob = document.querySelector('.menu-mob');
var headerToggle = document.querySelector('.page-header__menu-toggle');
var pageBody = document.querySelector('.page-body');

pageHeader.classList.remove('page-header--nojs');
menuMob.classList.remove('menu-mob--nojs');

headerToggle.addEventListener('click', () => {
  if (menuMob.classList.contains('menu-mob--closed')) {
    menuMob.classList.remove('menu-mob--closed');
    menuMob.classList.add('menu-mob--opened');
    headerToggle.classList.add('page-header__menu-toggle--opened')
    pageBody.classList.add('page-body--no-scroll');
    document.addEventListener("keydown", onMenuEscKeydown);
  } else {
    menuMob.classList.add('menu-mob--closed');
    menuMob.classList.remove('menu-mob--opened');
    headerToggle.classList.remove('page-header__menu-toggle--opened')
    pageBody.classList.remove('page-body--no-scroll');
    document.removeEventListener("keydown", onMenuEscKeydown);
  }
});

menuMob.addEventListener('click', (evt) => {
		if (evt.target.tagName === 'A') {
			menuMob.classList.add('menu-mob--closed');
      menuMob.classList.remove('menu-mob--opened');
      headerToggle.classList.remove('page-header__menu-toggle--opened')
      pageBody.classList.remove('page-body--no-scroll');
		}
});

const isEscEvent = (evt) => {
  return evt.key === "Escape" || evt.key === "Esc";
};

const onMenuEscKeydown = (evt) => {
	if (isEscEvent(evt)) {
		evt.preventDefault();
    menuMob.classList.add('menu-mob--closed');
    menuMob.classList.remove('menu-mob--opened');
    headerToggle.classList.remove('page-header__menu-toggle--opened')
    pageBody.classList.remove('page-body--no-scroll');
	}
};

//for smooth scroll js

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};
