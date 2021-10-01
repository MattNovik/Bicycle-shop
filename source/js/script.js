'use strict';
const pageHeader = document.querySelector('.page-header');
const menuMob = document.querySelector('.menu-mob');
const headerToggle = document.querySelector('.page-header__menu-toggle');
const pageBody = document.querySelector('.page-body');
const wrapperMainPage = document.querySelector('.wrapper-main-page');
const form = document.querySelector('.wrapper-form__form');
const smoothLinks = document.querySelectorAll('a[href^="#"]');
const nameForm = document.querySelector('.name-form');
const telForm = document.querySelector('.tel-form');
const video = document.querySelector('.wrapper-video');

pageHeader.classList.remove('page-header--nojs');
menuMob.classList.remove('menu-mob--nojs');
wrapperMainPage.classList.remove('wrapper-main-page--nojs');

headerToggle.addEventListener('click', () => {
  if (menuMob.classList.contains('menu-mob--closed')) {
    menuMob.classList.remove('menu-mob--closed');
    menuMob.classList.add('menu-mob--opened');
    headerToggle.classList.add('page-header__menu-toggle--opened')
    pageBody.classList.add('page-body--no-scroll');
    document.addEventListener('keydown', onMenuEscKeydown);
  } else {
    menuMob.classList.add('menu-mob--closed');
    menuMob.classList.remove('menu-mob--opened');
    headerToggle.classList.remove('page-header__menu-toggle--opened')
    pageBody.classList.remove('page-body--no-scroll');
    document.removeEventListener('keydown', onMenuEscKeydown);
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
  return evt.key === 'Escape' || evt.key === 'Esc';
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

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  let regexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  if (nameForm.value.length > 1 && !!telForm.value.match(regexp)) {
    form.classList.remove('wrapper-form__form--error');
    alert('Форма отправлена! Спасибо!')
  } else {
    form.classList.remove('wrapper-form__form--error');
    form.classList.add('wrapper-form__form--error');
  }
});

const createIframeVideo = () => {
  return `<iframe src='https://www.youtube.com/embed/cGzQWgOuAfg' title='YouTube video player' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>`
};

video.addEventListener('click', () => {
  video.classList.add('wrapper-video--nopic');
  video.innerHTML = createIframeVideo();
});

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

nameForm.addEventListener('input', () => {
  const valueLength = nameForm.value.length;
  if (valueLength < 2) {
    nameForm.setCustomValidity(`Eщё ${2 - valueLength} сим.`);
  } else {
    nameForm.setCustomValidity('');
  }

  nameForm.reportValidity();
});

telForm.addEventListener('input', () => {
  const valueLength = telForm.value.length;
  let regexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  if (valueLength < 10) {
    telForm.setCustomValidity(`Eщё мин.${10 - valueLength} сим.`);
  } else if (telForm.value[0] === '+' && telForm.value[1] !== '7') {
    telForm.setCustomValidity(`при наличии +, вторым числом должна быть 7`);
  } else if (!!!telForm.value.match(regexp)) {
    telForm.setCustomValidity(`только цифры`);
  } else {
    telForm.setCustomValidity('');
  }

  telForm.reportValidity();
});
