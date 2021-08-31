'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2021-08-22T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2021-08-22T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

// 210825
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'YesterDay';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, '0');
    // const month = `${date.getMonth() + 1}`.padStart(2, '0');
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    // 210826
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

// 210826 add currency showing functionality according to the locale
const formatCurrency = function (number, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(number);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    // 210823 movement to have exactly only 2 decimal points

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatCurrency(
          mov,
          acc.locale,
          acc.currency
        )}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(out, acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurrency(
    interest,
    acc.locale,
    acc.currency
  );
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// 210826 add auto-logout feature
const startLogOutTimer = function () {
  const tick = function () {
    const minute = Math.trunc(time / 60);
    const second = time % 60;
    labelTimer.textContent = `${minute}:${second}`;
    if (time === 0) {
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
      clearInterval(timer);
    }
    time--;
  };
  // set timer to 5 minutes
  let time = 10;
  // call timer every seconds
  tick();
  const timer = setInterval(tick, 1000);
  // print time to the page

  // when timer reaches 0, then logout!

  return timer;
};

///////////////////////////////////////
// Event handlers
// 210826 add timer variable to delete duplicated timer
let currentAccount, timer;

// // 210825 fake Always Login menu

// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // 210825
    // labelDate.textContent = now; // As of Wed Aug 25 2021 14:12:48 GMT+0900 (한국 표준시)
    // but need to print day/month/year format
    // const day = `${now.getDate()}`.padStart(2, '0'); // add padding of 0 if length is 1
    // const month = `${now.getMonth() + 1}`.padStart(2, '0');
    // const year = now.getFullYear();
    // const hours = `${now.getHours()}`.padStart(2, '0');
    // const min = `${now.getMinutes()}`.padStart(2, '0');
    // labelDate.textContent = `${day}/${month}/${year}, ${hours}:${min}`;

    // 210826 Experiment of international API
    const now = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // or short, narrow, 2-digit, numeric options are available
      year: 'numeric',
      // weekday: 'long',
    };
    const locale = currentAccount.locale;
    labelDate.textContent = new Intl.DateTimeFormat(locale, option).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // check if timer exist, if so clear the timer
    if (timer) clearInterval(timer);

    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add Transfer Date! 082125
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }

  // 210826 resetting timer!
  clearInterval(timer);
  timer = startLogOutTimer();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  // 210823 this will round down the decimal part and coerce to number
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // 210826 add delaying feature to the loan function
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add Transfer Date! 082125
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';

  // 210826 resetting timer!
  clearInterval(timer);
  timer = startLogOutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//___________________________NUMBERS____________________________
// Numbers are represented as floating decimal in JS

// following is true
console.log(23 === 23.0);

// THIS will be false because of floating point expression
console.log(0.1 + 0.2 === 0.3);

// string -> number
console.log(Number('23'));
console.log(+'23');

// parsing from string to number
// string can contain extra string! it will automatically filter!
// but the string should start with number!

// The parseInt method will take second argument that is radix,
// parseInt is global Function, which means it will work without Number namespace
console.log(Number.parseInt('30px', 10));
console.log(Number.parseFloat('2.5rem'));
console.log(Number.parseInt('2.5rem'));

// isNaN function(Not a Number)
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20x'));

// isFinite is the best way to check if the value is number but not string
console.log(Number.isFinite('20'));
console.log(Number.isFinite(20));

console.log(Number.isInteger(20.0));
console.log(Number.isInteger(20));

//___________________________MATH__________________________________
console.log(Math.sqrt(25)); // = 5
// below will calculate cube!
console.log(25 ** (1 / 2)); // = 5

// max, min will support conversion but not parsing
console.log(Math.max(5, 1, 46, 2, '24', 35));
console.log(Math.min(5, 1, 46, 2, '24', 35));

// shown before, random number generation
console.log(Math.trunc(Math.random() * 6 + 1));

// rounding Integers
// trunc will remove decimal part always
console.log(Math.trunc(23.3));

// round will round to the nearest integer
// ceil will round up to the nearest integer
// floor will round udownto the nearest integer
console.log(Math.round(123.89));

// toFixed method?
console.log((2.7).toFixed(0)); // will return string!
console.log(+(2.7).toFixed(0)); // will return NUmber with simple trick

// remainder operation!(%)
// usually used to get if number is odd or even number
console.log(5 % 3);

// change color of the row
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
  });
});

// Bigint
console.log(2 ** 53 - 1); // is the MAX number JS can support before ES2020
console.log(12987316987346918275691827356012875n); // this n at the end of the number will make whole number into bigInt
console.log(BigInt(1234164513461243614513462136)); // or can use BigInt method

// BigInt Operation
console.log(1000n + 10000n);
const huge = 123412346247356856814123451541n;
const num = 23;
// console.log(huge * num); // operation of Bigint with regular number wont work!!

// but! comparison and plus with string will work
console.log(20n > 15); ///true
console.log(20n === 20); // false
console.log(20n == 20); // true
console.log(20n == '20'); // true

// Math operation wont work with BigInt
// console.log(Math.sqrt(huge))

// Dates
// Creating date, there are four ways
const date1 = new Date();
console.log(date1);
const date2 = new Date('Aug 25 2021 13:35:01');
const date3 = new Date('December 24, 2021'); // but not a good idea to make date like this
const date4 = new Date(2037, 10, 19, 15, 34, 5); // 2037-11-25 15:34:05
const date5 = new Date(1234567); // in milisecond from 1970 jen 1st

// Working with Dates,
const future = new Date(3030, 12, 2, 1, 1, 1);
console.log(future);
// there are also setter functions!
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay()); // ... etc to second,
console.log(future.getTime()); // will return total time passed in milisecond,
console.log(Date.now()); // will return total time passed in milisecond,

// Date Operation
// Assume I have date below
const dateF = new Date(2037, 10, 19, 15, 34, 5);
console.log(Number(dateF)); // this will return total passed in milisecond!
console.log(+dateF); // this will return total passed in milisecond!

//then I can do operation with the date value in milisecond
const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24); // milisecond -> (1000 milisecond)second -> (60seconds) minute -> (60mins) hour -> (24hours) days

console.log(calcDaysPassed(new Date(2037, 4, 14), new Date(2037, 4, 24)));

// 218026
// Intl namespace!
// Intl is used when we want some format on a number or dates,
const number = 12315152.24;
console.log(new Intl.NumberFormat('en-US').format(number));
console.log(new Intl.NumberFormat('de-DE').format(number));
console.log(new Intl.NumberFormat('ko-KR').format(number));
console.log(new Intl.NumberFormat('ar-SY').format(number));
const option = {
  style: 'unit', // percent, currency are the options
  unit: 'celsius', //there are tons of units available, need to check out
  //currency: 'EUR',
};

console.log(new Intl.NumberFormat('en-US', option).format(number));

// setTimeout and setInterval
// run just once  // runs forever until halted by an user

// code excution is not stop when it meets setTimeout method(non blocking)
// schedule the job after certain period of time
const timer = setTimeout(
  function (ing1, ing2) {
    console.log(`here is my pizza with ${ing1} and ${ing2}`);
  },
  3000,
  'olives',
  'spinach'
); // times in miliseconds
// this console.log will be printed out before setTimeout method
console.log('waiting');

// the timer of setTimeout can be cancled by clearTimeout method!
clearTimeout(timer);

// schedule the job after certain period of time AND REPEAT it forever till stop
const timer2 = setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);

clearTimeout(timer2);
