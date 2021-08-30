'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
// 210827 for -> forEach
btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// SELECTOR
// print all html structure of the page
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// select first meeting element
document.querySelector('.header');
// select all the element and return as array of Nodes
console.log(document.querySelectorAll('.section'));

document.getElementById('section--1');
console.log(document.getElementsByTagName('button'));
console.log(document.getElementsByClassName('btn'));

// Creating and inserting Elements
// .insertAdjacentHTML method,

// create tag to the html
const message = document.createElement('div');
// add class to the tag! like <div class='cookie-message'></div>
message.classList.add('cookie-message');
// message.textcontent = 'we use cookie delicious cookie';
message.innerHTML =
  'we use cookie delicious cookie <button class="btn btn--close-cookie"> got it </button>';
document.querySelector('.header').prepend(message);
document.querySelector('.header').append(message);
// duplicate the element!!
document.querySelector('.header').append(message.cloneNode(true));

//Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    //message.remove();
    message.parentElement.removeChild(message);
  });

// Styles
// to set a style to the element, note that style name is camelCase! not hypen-connected
// and set attibuted are applied directly to the tag
message.style.backgroundColor = '#123456';

// we only can get inline property but not stylesheet property
// height will return nothing, whereas backgroundColor will return #123456
console.log(message.style.height);
console.log(message.style.backgroundColor);

// to get a applied properties list, we use following code
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// set custom property of CSS variable, Check CSS line 3 - 15
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes of HTML
const logo = document.querySelector('.nav__logo');

// we can directly access to the attributes of the element
console.log(logo.alt, logo.src, logo.className);
// if attibutes are standard according to the MDN, we wont have access to the attributes
console.log(logo.designer); // this will be undefined, even if the element has property name designer
// but there is way to read off-standard value from the element
console.log(logo.getAttribute('designer'));

// there is a way to add attributes to the elements like following
logo.setAttribute('company', 'Bankist');

console.log(logo.src); //will return absolute path
console.log(logo.getAttribute('src')); // will return relative path

// Data Attributes
// if property name start with data, html line 18, data-version-number='3.0'
console.log(logo.dataset.versionNumber);

// 210830 add smooth scroll to 'Learn More ↓' button to scroll to section 1 class
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  //
  console.log('current Scroll (X/Y)', window.pageXOffset, pageYOffset);

  // viewport = visible part of web
  console.log(
    'height/width of viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // // scrolling1 -> hard scrolling with no effect
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  // // scrolling2 -> pass the object with smooth effect,0 but it is still old way!
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // scrolling3 -> set target and set effect!, but works with only modern browser.
  section1.scrollIntoView({ behavior: 'smooth' });
});
