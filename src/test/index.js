// const queuedObservers = new Set();

// const observe = (fn) => queuedObservers.add(fn);
// const observable = (obj) => new Proxy(obj, { set });

// function set(target, key, value, receiver) {
//   const result = Reflect.set(target, key, value, receiver);
//   queuedObservers.forEach((observer) => observer());
//   return result;
// }

// const person = observable({
//   name: "张三",
//   age: 20,
// });

// function print() {
//   console.log(`${person.name}, ${person.age}`);
// }

// observe(print);
// person.name = "李四";
// person.name = "李五";
// person.age = 30;

// const xxx = new Set();

// const fn1 = () => {
//   console.log(mine.name);
// };

// const fn2 = () => {
//   console.log(mine.age);
// };

// const ob = (obj) => new Proxy(obj, { set });

// const mine = ob({
//   name: "张三aaaa",
//   age: 203,
// });

// function set(target, key, value, receiver) {
//   //   const result = Reflect.set(target, key, value, receiver);
// //   console.log(target)
// //   console.log('key:'+key)
// //   console.log('value:'+value)
// //   console.log(receiver)
//   const result = Reflect.set(target, key, value, receiver);
//   console.log(xxx)
//   xxx.forEach((observer) => observer());
//   return result;
// }

// xxx.add(fn1);
// xxx.add(fn2);
// // xxx.age = 18;
// // xxx.fn1()
// // console.log(xxx);
// mine.name = "qqqqq";
// mine.age = 1111;