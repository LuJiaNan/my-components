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

// proxy
//1
// let validator = {
//   set: function (obj, prop, value) {
//     if (prop === "age") {
//       if (!Number.isInteger(value)) {
//         throw new TypeError("The age is not an integer");
//       }
//       if (value > 200) {
//         throw new RangeError("The age seems invalid");
//       }
//     }

//     // The default behavior to store the value
//     obj[prop] = value;

//     // 表示成功
//     return true;
//   },
//   get: function(obj, prop) {
//       return 1
//   }
// };

//2
// let person = new Proxy({}, validator);

// person.age = 100;

// console.log(person.age);
// // 100

// person.age = "young";
// // 抛出异常: Uncaught TypeError: The age is not an integer

// person.age = 300;
// // 抛出异常: Uncaught RangeError: The age seems invalid

// let proto = new Proxy(
//   {},
//   {
//     get(target, propertyKey, receiver) {
//       console.log("GET " + propertyKey);
//       return target[propertyKey];
//     },
//   }
// );

// let obj = Object.create(proto);
// proto.foo; // "GET foo"
// console.log(proto.foo === obj.foo);

// var twice = {
//   apply(target, ctx, args) {
//     return Reflect.apply(...arguments) * 2;
//   },
// };
// function sum(left, right) {
//   return left + right;
// }
// var proxy = new Proxy(sum, twice);
// console.log(proxy(1, 2)); // 6
// console.log(proxy.call(null, 5, 6)); // 22
// console.log(proxy.apply(null, [7, 8])); // 30

// var obj = { a: 10 };
// Object.preventExtensions(obj);

// var p = new Proxy(obj, {
//   has: function (target, prop) {
//     return false;
//   },
// });

// console.log("a" in p);

// var handler = {
//   defineProperty(target, key, descriptor) {
//     return false;
//   },
// //   set(obj, prop, value){
// //     obj[prop] = value;
// //   }
// };
// var target = {};
// var proxy = new Proxy(target, handler);
// proxy.foo = "bar"; // 不会生效
// console.log(proxy.foo)

// var p = new Proxy(
//   {},
//   {
//     isExtensible: function (target) {
//       console.log("called");
//     //   return true;
//       return false;
//     },
//   }
// );

// Object.isExtensible(p);
// // "called"
// // true



//this 指向
// const target = new Date();
// const handler = {};
// const proxy = new Proxy(target, handler);

// proxy.getDate();
// // TypeError: this is not a Date object.


// const target = new Date('2015-01-01');
// const handler = {
//   get(target, prop) {
//     if (prop === 'getDate') {
//       return target.getDate.bind(target);
//     }
//     return Reflect.get(target, prop);
//   }
// };
// const proxy = new Proxy(target, handler);

// proxy.getDate() // 1


// 只包含0和1的所有带1子字符串个数
// var numSub = function(s) {
//     let arr = s.split('0').filter(item => item.indexOf('1') > -1);

//     let count = 0;
//     for(let i = 0; i<arr.length;i++){
//         if(arr[i].length === 1){
//             count++;
//             continue;
//         }
//         count += (arr[i].length*(arr[i].length+1)) / 2
//     }
//     return count % (Math.pow(10,9) + 7)
//     // for(let i = 0;i < s.length; i++){
//     //     if(s[i] == '1'){
//     //         count++;
//     //         let j = i+1;
//     //         while(s[j] == '1'){
//     //             count++;
//     //             j++;
//     //         }
//     //     }
//     // }
//     // return count
// };

// console.log(numSub('101010101010111'))



// 求峰值
// var findPeakElement = function(nums) {
//     //1
//     for (let i = 0; i < nums.length - 1; i++) {
//         if (nums[i] > nums[i + 1])
//             return i;
//     }
//     return nums.length - 1;
// };

// console.log(findPeakElement([1,2,3,1]))

//求交集
// var intersect = function(nums1, nums2) {
//     let s = [];
//     nums1.forEach(item => {
//         if(nums2.indexOf(item) > -1){
//             s.push(item);
//             let index = nums2.indexOf(item)
//             nums2 = nums2.filter((i,position) => position!==index)
//         }
//     })
//     return s
// };

// console.log(intersect([1,2,2,1],[2,2]))


// 颜色分类

// var sortColors = function(nums) {
//     let arr = [];
//     nums.forEach(item => {
//         if(item === 0){
//             arr.unshift(0)
//         }else if(item === 2){
//             arr.push(2)
//         }else{
//             arr.splice(arr.lastIndexOf(0)+1,0,1)
//         }
//     })

//     return arr
// };

// let nums = [2,0,2,1,1,0]
// console.log(sortColors(nums))
