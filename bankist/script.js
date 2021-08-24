'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//array has some methods like
// arr.slice(2)
// arr.splice will mutate the array! etc
//08/18  adding sorting functionality
// add sort parameter and set it to false, then activate when sort button is clicked
const displayMovements = function (movement, sort = false) {
  containerMovements.innerHTML = '';

  //slice method will make copy of original array!
  const movs = sort ? movement.slice().sort((a, b) => a - b) : movement;

  movs.forEach(function (mov, i, _) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i} ${type}</div>
      <div class="movements__value">${mov}$</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// //acc is like a snowball
// //second argment of reduce is init value for acc;
// const balance = movements.reduce(function (acc, cur) {
//   return acc + cur;
// }, 0);
// console.log(balance);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acco, mov) => acco + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = incomes;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(mov => mov > 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = interest;
};

// return username for each user in account arr
const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(val => val[0])
      .join('');
  });
};

createUsername(accounts);
console.log(accounts);

//refactoring UI refresh
const updateUI = function (account) {
  //display movement
  displayMovements(account.movements);
  //display balance
  calcDisplayBalance(account);
  //display summary
  calcDisplaySummary(account);
};

//EventHander for login function
let curAccount;
btnLogin.addEventListener('click', function (e) {
  // following method will prevent form to stop submitting
  e.preventDefault();
  curAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (curAccount?.pin === Number(inputLoginPin.value)) {
    //displayUI and welcome Message
    labelWelcome.textContent = `Welcome Back! ${curAccount.owner.split(' ')[0]
      }`;
    containerApp.style.opacity = 100;
    //clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    //to release focus on this object
    inputLoginPin.blur();

    updateUI(curAccount);
  }
});

// implementing transfer function
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferTo.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    curAccount.balance >= amount &&
    receiverAcc?.username !== curAccount.username &&
    receiverAcc
  ) {
    //add negative movement to sending user
    curAccount.movements.push(-amount);
    //add positive movement to receiving user
    receiverAcc.movements.push(amount);

    updateUI(curAccount);
  }
});

// //find method only return first condition-met value as a value! not an array!
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && curAccount.movements.some(mov => mov > amount / 10)) {
    // add the movement to the curAccount
    curAccount.movements.push(amount);
    updateUI(curAccount);
  }
  inputLoanAmount.value = '';
});

// findIndex method will return index of first matching element!
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === curAccount.username &&
    Number(inputClosePin.value) === curAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === curAccount.username
    );
    //Delete Account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

// this variable will keep track of sorted state
// if button is clicked the value is fliped!
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(curAccount.movements, !sorted);
  sorted = !sorted;
});
