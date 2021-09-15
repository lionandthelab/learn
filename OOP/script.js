'use strict';

// 210909 OOP is Paradigm of the programming
// Abstraction, Encapsulation, Inheritance, Polimorphism are 4 key feature of OOP
// CLASS - Instance -> Copy all the method , Prototype - Instance -> Prototype keeps Object

// 210910 - Constructor and New Keyword

// Constructor start with the capital letter! KEEP IN MIND
// Arrow function constroctor wont work because it doesnt have its 'this' keyword
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create method inside the object! for sake of performance!
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);
// 1. New empty Object is create
// 2. Function is called then this = new Empty Object
// 3. New object is linked to prototype
// 4. Object created automattically return empty Object

const matilda = new Person('Matilda', 2017); // ...etc

console.log(jonas instanceof Person);

// Prototype
// add a method to the prototype of Person not in individual instances
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
jonas.calcAge();

console.log(jonas.__proto__ === Person.prototype); //true
console.log(Person.prototype.isPrototypeOf(jonas)); //true
console.log(Person.prototype.isPrototypeOf(Person)); //false

Person.prototype.species = 'Homo Sapiens';
console.log(jonas);
console.log(jonas.hasOwnProperty('firstname')); //true

console.log(jonas.hasOwnProperty('species')); //false -> because it just has access to prototype not in object

// 210913 Prototype Inheritance and Chain
/* 
  Prototype Inehritance(delegation) -> Any properties that saved on __proto__ will be accessible throughout object Scope even though it is not defined in the object itself
  In other word, if property is set to __proto__, then every Object made out of that prototype will have that property
*/
/*
  Prototype has its parent Prototype, the Object Prototype
  End of prototype chain is Null
*/
console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

const arr = [1, 2, 33, 3, 3, 3, 3, 3, 3];

console.log(arr.__proto__ === Array.prototype);

// below will add functionality to all arr object
// but DON DO IT for several reason
//    1. MDN might will add same code
//    2. Code will get messy in team project
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

// 210914 ES6 Class
/* 
  Class in JS is not working like Class in other language, it is just synthetic sugar, 
*/

// Class Expression
// const PersonCl = class{

// }

// Class Decleration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  // functions are prototypal inheritance, will not be in each object but in prototype
  get age() {
    return 2037 - this.birthYear;
  }
  calcAge() {
    console.log(2016 - this.birthYear);
  }
  // 210915 Instance methods
  static hey() {
    console.log('hello');
  }
}

const jessica = new PersonCl('Jessica', 1414);
jessica.calcAge();

// 1. classes are not hoisted
// 2. classes are first class citizens
// 3. body of class is executed in strict mode

// getter and setter
// getter and setter is useful to do data validation
const account = {
  owner: 'jonas',
  movement: [200, 500, 400, -2300],

  get latest() {
    return this.movement.slice(-1).pop();
  },
  // setter will take exactly one parameter
  set latest(movement) {
    this.movement.push(movement);
  },
};
// use getter as property but not as function call
console.log(account.latest);
console.log((account.latest = 50));

// 210915 - Static Method
/*
  Array.from method will convert arraylike structure to real array
  Array.from(document.querySelectorAll('h1'))
  but cant do 
  [1].from()
  because it is built in Array constructor

  we call from like method 'static'
*/
Person.hey = function () {
  console.log('hi');
};

Person.hey();
//jonas.hey(); this wont work!

// Object.create - third way to implement prototype

// below object will the prototype of Every PersonObject
const PersonProto = {
  calcAge() {
    console.log(2016 - this.birthYear);
  },
  // setting the property
  init(name, birthYear) {
    this.firstname = name;
    this.birthYear = birthYear;
  },
};

// this is explicit way to set certain prototype to Object
const steven = Object.create(PersonProto);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 2020);

// Inheritance between Class: Assume Person Class is existing already

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear); // is inheriting Person Class
  this.course = course;
};
Student.prototype = Object.create(Person.prototype);
//function should be added after inheritance of prototype
Student.prototype.introduce = function () {
  console.log(`Mynameis ${this.firstName}, and I stydu ${this.course}`);
};
const mike = new Student('Mike', 2020, 'CS');
console.log(mike);
mike.introduce();
