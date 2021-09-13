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
console.log(Person.prototype.isPrototype(jonas)); //true
console.log(Person.prototype.isPrototype(Person)); //false

Person.prototype.species = 'Homo Sapiens';
console.log(jonas);
console.log(jonas.hasOwnProperty('firstname')); //true
console.log(jonas.hasOwnProperty('species')); //false -> because it just has access to prototype not in object
