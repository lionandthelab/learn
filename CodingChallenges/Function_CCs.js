'use strict';
// const booking = [];

// const createBooking = function (flightNum, numPassenger = 1, price = 199) {
//   const bookingObj = {
//     flightNum,
//     numPassenger,
//     price,
//   };
//   console.log(bookingObj);
//   booking.push(bookingObj);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);
//____________________________________________

// const flight = 'LH234';
// const issac = {
//   name: 'issac Choi',
//   passport: 111,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'HF123';
//   passenger.name = 'MR.' + passenger.name;
//   if (passenger.passport === 111) {
//     alert('Checked in');
//   } else {
//     alert('wrong passport');
//   }
// };

// checkIn(flight, issac);
// console.log(flight);
// console.log(issac);

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000000);
// };

// newPassport(issac);
// checkIn(flight, issac);
// console.log(flight);
// console.log(issac);
//____________________________________________

// // CALLBACK && HIger Order Function Example
// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };
// //Higher-order Function because it takes other function as argument
// const transformer = function (str, fn) {
//   console.log(`Transformed. string : ${fn(str)}`);
//   console.log(`Transformed by ${fn.name}`);
// };

// //invoking value
// transformer('JavaScript is the best ', upperFirstWord);
// transformer('JavaScript is the best ', oneWord);
//____________________________________________

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} : ${name}`);
//   };
// };

// const greeterHey = greet('HEY');
// greet('hi')('ahdd');

// //using arrow function
// const hey = hello => name => console.log(`${hello} : ${name}`);
// hey('hwiwiwiwiw')('wueh');
//____________________________________________
// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book: function (flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push([`flight: ${this.iataCode}${flightNum}`]);
//   },
// };

// lufthansa.book(1234, 'ahriri');
// console.log(lufthansa);
// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: new Array(),
// };

// const book = lufthansa.book;

// //below will occur an error because it is pointing undefined
// //book(23, 'issac choi');
// //call apply bind!
// //call takes first target point(target this object) and rest of arguments
// book.call(eurowings, 23, 'issac choi');

// console.log(eurowings);

// //apply -> diff is apply does not take parameter but an array of paramaters

// //bind will simply set this keyword to the object
// const bookEW = book.bind(eurowings);
// bookEW(124123, 'sample');
// // this will set first argument to 23(PRESET!!!)
// const bookEWs = book.bind(eurowings, 23);
// // function call won't need first argument!!!!
// bookEWs('sample');

// //with Event listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);

//   this.planes++;
//   console.log(this.planes);
// };
// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);
// // same as-> addVat = value -> value + value * 0.23
// console.log(addVAT(100));
//____________________________________________________________________________________________________________________________________

// //CC1!
// ///////////////////////////////////////
// // Coding Challenge #1

// /*
// Let's build a simple poll app!

// A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

// Here are your tasks:

// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
//   1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
//         What is your favourite programming language?
//         0: JavaScript
//         1: Python
//         2: Rust
//         3: C++
//         (Write option number)

//   1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
// 2. Call this method whenever the user clicks the "Answer poll" button.
// 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
// 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

// HINT: Use many of the tools you learned about in this and the last section 😉

// BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

// BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

// GOOD LUCK 😀
// */
// const poll = {
//   question: 'What is your favorite programming language?;',
//   options: ['0: javascript', '1: Python', '2: Rust', '3: C++'],
//   //THIS generates [0, 0, 0, 0]. More in the next section
//   answers: new Array(4).fill(0),
//   registerNewAnswer: function () {
//     let answer = Number(
//       prompt(
//         `${this.question}\n${this.options.join('\n')}\n(Write option number)`
//       )
//     );
//     if (answer > this.answers.length || answer < 0) {
//       alert('you put wrong number');
//     } else if (typeof answer !== 'number') {
//       alert('you put string!');
//     } else {
//       this.answers[answer]++;
//     }
//     this.displayResults();
//     this.displayResults('string');
//   },
//   displayResults(type = 'array') {
//     if (type === 'array') {
//       console.log(this.answers);
//     } else if (type === 'string') {
//       // Poll results are 13, 2, 4, 1
//       console.log(`Poll results are ${this.answers.join(', ')}`);
//     }
//   },
// };
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
//____________________________________________________________________________________________________________________________________

// //IIFE - when you need to execute a function only once and never use it again
// // if wrap function in parenthesis, will recognize as expression
// (function () {
//   console.log('HIthere!');
// })();
// (() => console.log('thishtishtishtihsi'))();
// //____________________________________________________________________________________________________________________________________

//CLOSUREs!
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(passengerCount);
  };
};

const bookier = secureBooking();

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
