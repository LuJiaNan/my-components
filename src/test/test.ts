// import "reflect-metadata";

// @Reflect.metadata('role', 'admin')
// class Post {}

// const metadata = Reflect.getMetadata('role', Post);

// console.log(metadata);  // admin

// @Reflect.metadata('name', 'A')
// class A {}

// Object.getOwnPropertySymbols(A) // []

// interface Thing { /* nothing here */ }
// function doSomething(a: Thing) {
//   // mysterious implementation here
// }
// // Expected some or all of these to be errors
// doSomething(window);
// doSomething(42);
// doSomething('huh?');

// type SomeUrl = string;
// type FirstName = string;
// let x: SomeUrl = "http://www.typescriptlang.org/";
// let y: FirstName = "Bob";
// x = y; // Expected error

// type SomeUrl = string & {'this is a url': {}};
// type FirstName = string & {'person name': {}};

// // Add type assertions
// let x = '' as SomeUrl;
// let y = 'bob' as FirstName;
// // x = y; // Error

// // OK
// let xs: string = x;
// let ys: string = y;
// xs = ys;
// console.log(xs)

// interface ScreenCoordinate {
//     a:any;
//   x: number;
//   y: number;
// }
// interface PrintCoordinate {
//     b:any
//   x: number;
//   y: number;
// }
// function sendToPrinter(pt: PrintCoordinate) {
//   // ...
// }
// function getCursorPos(): ScreenCoordinate {
//   // Not a real implementation
//   return { x: 0, y: 0 } as ScreenCoordinate;
// }
// // This should be an error
// sendToPrinter(getCursorPos());

// // Define FooTable and FooIndex
// type FooIndex = string;  // Proposed new kind of nominal declaration.
// interface FooTable {
//   [i: string]: { foo: number };
// }
// let s1: FooIndex;
// let t1: FooTable;

// // Define BarTable and BarIndex
// type BarIndex = string; // Proposed new kind of nominal declaration.
// interface BarTable {
//   [i: string]: { bar: string };
// }
// let s2: BarIndex;
// let t2: BarTable;

// // For assignment from base-types and basic structures: no type-overloading is needed.
// s1 = 'foo1';
// t1 = {};
// t1[s1] = { foo: 1 };

// s2 = 'bar1';
// t2 = { 'bar1': { bar: 'barbar' }};

// console.log(s2 = s1); // Proposed to be type error.
// console.log(s2 == s1); // Proposed to be type error.
// console.log(s2 === s1); // Proposed to be type error.

// t1[s2].foo = 100; // Gives a runtime error. Proposed to be type error.
// t1[s1].foo = 100;

// function BadFooTest(t: FooTable) {
//   if (s2 in t) {  // Proposed to be type error.
//     console.log('cool');
//     console.log(t[s2].foo); // Proposed to be type error.
//   }
// }

// function GoodBarTest(t: BarTable) {
//   if (s2 in t) {
//     console.log('cool');
//     console.log(t[s2].bar);
//   }
// }

// BadFooTest(t1); // Gives runtime error;
// BadFooTest(t2); // No runtime error, Proposed to be type error.
// GoodBarTest(t1); // Gives runtime error; Proposed to be type error.
// GoodBarTest(t2);

// let x: any = true;
// let y = x as string; // Expected: runtime error (can't convert boolean to string)

// let a: any = 'hmm';
// let b = a as HTMLElement; // expected b === null

// console.log(y)
// console.log(b)

// let myFunc: (number) => string = (n) => 'The number in hex is ' + n.toString(16);
// // Expected error because boolean is not number
// console.log(myFunc(true));

// interface Car{
//     name: string
// }
// interface Animal{
//     name: string
// }
// // let x: { [n: string]: Car; };
// // let y: { [n: string]: Animal; };
// // x = y; // Error

// let c: Car = {
//     name:'aaa'
// };
// // Error, or not?
// let x: { [n: string]: Car } = { 'mine': c };

// function createLog(message:string): number;
// function createLog(source:string, message:string): number
// function createLog(source:string, message?:string): number {
//   return 0;
// }

// let a = createLog("message"); // OK
// let b = createLog("source", "message");

// console.log(a)
// console.log(b)

// function compare(a: string, b: string): void;
// function compare(a: number, b: number): void;
// function compare(a: string|number, b: string|number): void {
//   // Just an implementation and not visible to callers
// }

// compare(1,2) // OK
// compare("s", "l") // OK
// compare (1, "l") // Error.

// class Base {
//     important: number;
//     properties: number;
// }
// class Alpha extends Base { }
// class Bravo extends Base { }

// const a = new Alpha()
// const b = new Bravo()
// console.log(a)
// console.log(b)

// a.important = 1

// console.log(a)
// console.log(b)

// class Alpha { x: number }
// class Bravo { x: number }
// class Charlie {
//   protected x: number
//   add(){
//     console.log(this.x)
//   }
// }
// class Delta {
//   protected x: number
//   add(){
//     console.log(this.x)
//   }
// }

// // tslint:disable-next-line: one-variable-per-declaration
// let a = new Alpha(), b = new Bravo(), c = new Charlie(), d = new Delta();

// a = b; // OK
// c = d; // Error

// class MyClass {
//   x = 10;
//   someCallback() {
//     console.log(this.x); // Prints 'undefined', not 10
//     this.someMethod(); // Throws error "this.method is not a function"
//   }
//   someMethod() {

//   }
// }

// let obj = new MyClass();
// // global.setTimeout(obj.someCallback, 10);
// global.setTimeout(obj.someCallback.bind(obj), 10);

// class MyClass {
//   x = 10;
//   someCallback() {
//     console.log(this.x); // Prints 'undefined', not 10
//     this.someMethod(); // Throws error "this.method is not a function"
//   }
//   time(){
//     global.setTimeout(this.someCallback.bind(this), 1000);
//   }
//   someMethod() {

//   }
// }

// let obj = new MyClass();
// obj.time()

// class Base {

//   myVar:string = 'Base';

//   constructor() {
//       console.log(this.myVar);
//   }

// }

// class Child extends Base {

//   myVar:string = 'Child';

// }

// let base:Base = new Base(); // 'Base' - As expected
// let child:Child = new Child(); // 'Base' - I would've expected this to be 'Child'

// console.log(base.myVar); // 'Base' - As expected
// console.log(child.myVar); // 'Child' - As expected

// class Base {

//   myVar:string = 'Base';

//   constructor() {
//       this.setup();
//   }

//   protected setup() {
//       console.log(this.myVar);
//   }

// }

// class Child extends Base {

//   myVar:string = 'Child';

//   constructor() {
//       super();
//       this.setup();
//   }

// }

// // let base:Base = new Base(); // 'Base'
// let child:Child = new Child(); // 'Child' - Now as expected

// // console.log(base.myVar); // 'Base'
// // console.log(child.myVar); // 'Child'

// class FooError extends Error {
//   constructor(m: string) {
//       super(m);
//   }
//   sayHello() {
//       return "hello " + this.message;
//   }
// }

// class FooError extends Error {
//   constructor(m: string) {
//       super();

//       // Set the prototype explicitly.
//       Object.setPrototypeOf(this, FooError.prototype);
//   }

//   sayHello() {
//       return "hello " + this.message;
//   }
// }

// console.log(new FooError('error'))

// interface Something<T> {
//   name: string;
// }
// let x: Something<number> = {
//   name: '1'
// };
// let y: Something<string> = {
//   name: '1'
// };
// // Expected error: Can't convert Something<number> to Something<string>!
// x = y;

// interface Named<T> {
//   name: string;
// }
// class MyNamed<T> implements Named<T> {
//   name: 'mine';
// }
// function findByName<T>(x: Named<T>): T {
//   // TODO: Implement
//   return undefined;
// }

// let x: MyNamed<string>;
// let y = findByName(x); // expected y: string, got y: {}

// interface Named<T> {
//   name: string;
//   value: T; // <-- added
// }
// class MyNamed<T> implements Named<T> {
//   name: 'mine';
//   value: T; // <-- added
// }
// function findByName<T>(x: Named<T>): T {
//   // TODO: Implement
//   return T;
// }

// let x: MyNamed<string> = {
//   name:'mine',
//   value: 'aaa'
// };
// console.log(x)
// let y = findByName(x); // got y: string;

// function doSomething<T>(x: T) {
//   // Can't find name T?
//   let xType = typeof T;
//   let y = new xType();
//   // Same here?
//   if(someVar instanceof typeof T) {

//   }
//   // How do I instantiate?
//   let z = new T();

// class MyClass {}

// function create<T>(ctor: new() => T ) {
//   return new ctor();
// }
// let c = create(MyClass); // c: MyClass

// function isReallyInstanceOf<T>(ctor: new(...args: any[]) => T , obj: T) {
//   return obj instanceof ctor;
// }

// enum Alpha { X, Y, Z }
// const enum Beta { X, Y, Z }
// declare enum Gamma { X, Y, Z, O }
// declare const enum Delta { X, Y, Z }

// console.log(Alpha)
// console.log(Beta.X)
// // console.log(Beta["0"])
// let a = 'x'
// console.log(Gamma[a]) // Gamma is not defined
// // console.log(Delta)

// ts3.9以下版本bug
// interface Lion {

//     roar(): void

// }

// interface Seal {

//     singKissFromARose(): void

// }

// async function visitZoo(lionExhibit: Promise<Lion>, sealExhibit: Promise<Seal | undefined>) {

//     let [lion, seal] = await Promise.all([lionExhibit, sealExhibit]);

//     lion.roar(); // uh oh

// // ~~~~

// // Object is possibly 'undefined'.

// }

// interface A {

//     a: number; // notice this is 'number'

// }

// interface B {

//     b: string;

// }

// interface C {

//     a?: boolean; // notice this is 'boolean'
//     b: string;

// }

// declare let x: A & B;
// declare let y: C;

// y = x;

// declare function smushObjects<T, U>(x: T, y: U): T & U;

// interface Circle {

//     kind: "circle";
//     radius: number;

// }

// interface Square {

//     kind: "square";
//     sideLength: number;

// }

// declare let x: Circle;
// declare let y: Square;
// let z = smushObjects(x, y);

// console.log(z.kind);

// let a = [{name:'a',age:1},{name:'b',age:2}]
// a.map(item =>{item.name})

// let x = () => {10}

// function foo<T extends any>(arg: T) {
//     arg.spfjgerijghoied(); // no error!
// }

// function f() {
//     console.log("f(): evaluated");
//     return (target:any, propertyKey: string, descriptor: PropertyDescriptor) => {
//         console.log("f(): called");
//     }
// }

// function g() {
//     console.log("g(): evaluated");
//     return (target:any, propertyKey: string, descriptor: PropertyDescriptor) => {
//         console.log("g(): called");
//     }
// }

// class C {
//     @f()
//     @g()
//     method() {}
// }

// const a = new C();
// a.method()

// @sealed
// class Greeter {
//     greeting: string;
//     constructor(message: string) {
//         this.greeting = message;
//     }
//     greet() {
//         return "Hello, " + this.greeting;
//     }
// }

// function sealed(constructor: new(...args:any[]) => {}) {
//     Object.seal(constructor);
//     Object.seal(constructor.prototype);
//     console.log(constructor)
//     console.log(constructor.prototype);
// }

// function classDecorator<T extends new(...args:any[]) => {}>(constructor:T) {
//     return class extends constructor {
//         newProperty = "new property";
//         hello = 111;
//     }
// }

// // tslint:disable-next-line: max-classes-per-file
// @classDecorator
// class Greeter {
//     property = "property";
//     hello: string;
//     constructor(m: string) {
//         this.hello = m;
//     }
// }

// console.log(new Greeter("world"));

// class Greeter {
//     greeting: string;
//     constructor(message: string) {
//         this.greeting = message;
//     }
//     set(message: string){
//         this.greeting = message
//     }

//     @enumerable(false)
//     greet() {
//         return "Hello, " + this.greeting;
//     }
// }

// function enumerable(value: boolean) {
//     return  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//         descriptor.enumerable = value;
//         descriptor.configurable = false;
//         // descriptor.writable = false;
//         console.log(descriptor)
//     };
// }

// console.log(delete Greeter.prototype.greet) // false

// class Point {
//     // tslint:disable-next-line: variable-name
//     private _x: number;
//     // tslint:disable-next-line: variable-name
//     private _y: number;
//     constructor(x: number, y: number) {
//         this._x = x;
//         this._y = y;
//     }

//     @configurable(false)
//     get x() { return this._x; }

//     @configurable(false)
//     get y() { return this._y; }
// }

// function configurable(value: boolean) {
//     return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//         console.log(target)
//         console.log(propertyKey)
//         descriptor.configurable = value;
//     };
// }

// const p = new Point(1,2)

// console.log(p.x)
// p.x = '4'

// function configurable(value:boolean){
//     return (target: any,propertyKey:string,descriptor: PropertyDescriptor) => {
//         descriptor.configurable = value;
//     }
// }

// class Greeter {
//     @format("Hello, %s")
//     greeting: string;

//     constructor(message: string) {
//         this.greeting = message;
//     }
//     greet() {
//         let formatString = getFormat(this, "greeting");
//         return formatString.replace("%s", this.greeting);
//     }
// }

// const formatMetadataKey = Symbol("format");

// function format(formatString: string) {
//     return Reflect.metadata(formatMetadataKey, formatString);
// }

// function getFormat(target: any, propertyKey: string) {
//     return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
// }

// const g = new Greeter('msg')
// console.log(g)

// 交叉类型和继承，以及ReactNode和ReactElement
// interface A {
//   name: string;
//   age: number;
// }

// interface B {
//   sex: string;
//   weight: number;
//   age: string;
// }
// const C: A & B = {
//   name: "",
//   age: 1,
//   sex: "",
//   weight: 2,
// };

// interface C {
//   name: string;
//   age: number;
// }

// interface D extends C {
//   sex: string;
//   weight: number;
//   age: string;
// }

// const E: D = {
//   name: "",
//   age: "",
//   sex: "",
//   weight: 23,
// };

// interface node {
//   a: React.ReactElement;
//   b: React.ReactNode;
// }

// const aaa: node = {
//   a: {
//     type: "",
//     props: {},
//     key: null,
//   },
//   b: "",
// };

// this 连贯接口继承
// class BasicCalculator {
//   constructor(protected value: number = 0) {}
//   currentValue(): number {
//     return this.value;
//   }
//   add(operand: number): this {
//     this.value += operand;
//     return this;
//   }
//   multiply(operand: number): this {
//     this.value *= operand;
//     return this;
//   }
//   // ... other operations go here ...
// }

// let v1 = new BasicCalculator(2).multiply(5).add(1).currentValue();
// console.log(v1);

// class ScientificCalculator extends BasicCalculator {
//   constructor(value = 0) {
//     super(value);
//   }
//   sin():this {
//     this.value = Math.sin(this.value);
//     return this;
//   }
//   // ... other operations go here ...
// }

// let v2 = new ScientificCalculator(2).multiply(5).sin().add(1).currentValue();
// console.log(v2)

// function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
//   return names.map((n) => o[n]);
// }

// interface Person {
//   name: string;
//   age: number;
//   sex: string;
// }
// let person: Person = {
//   name: "Jarid",
//   age: 35,
//   sex: 'man'
// };
// let strings: string[] = pluck(person, ["name","sex"]); // [ 'Jarid', 'man' ]

// console.log(strings)

// type petsGroup = 'dog' | 'cat' | 'fish';
// interface IPetInfo {
//     name:string,
//     age:number,
// }

// type IPets = Record<petsGroup, IPetInfo>;

// const animalsInfo:IPets = {
//     dog:{
//         name:'dogName',
//         age:2
//     },
//     cat:{
//         name:'catName',
//         age:3
//     },
//     fish:{
//         name:'fishName',
//         age:5
//     }
// }

// returnType使用
// function fn(): string {
//     return 'aaaa'
// }

// function f1(s: string) {
//     return { a: 1, b: s };
// }

// const returnType1:ReturnType<typeof fn> = 1
// const returnType2:ReturnType<typeof f1> = {
//     a:555,
//     b:'ssss'
// }

// type Unpacked<T> =
//     T extends Array<infer U> ? U :
//     T extends (...args: any[]) => infer U ? U :
//     T extends Promise<infer U> ? U :
//     T;

// type T0 = Unpacked<string>;  // string
// type T1 = Unpacked<string[]>;  // string
// type T2 = Unpacked<() => string>;  // string
// type T3 = Unpacked<Promise<string>>;  // string
// type T4 = Unpacked<Array<Promise<string>>>;  // Promise<string>
// type T5 = Unpacked<Unpacked<Array<Promise<string>>>>;  // string

// type Foo<T> = T extends { a: infer U, b: infer U } ? U : never;
// type T10 = Foo<{ a: string, b: string }>;  // string
// type T11 = Foo<{ a: string, b: number }>;  // string | number

// interface Point {
//   x: number;
//   y: number;
//   new (x: number, y: number): Point;
// }

// class Point2D implements Point {
//   readonly x: number;
//   readonly y: number;

//   constructor(x: number, y: number) {
//     this.x = x;
//     this.y = y;
//   }
// }

// const point: Point = new Point2D(1, 2);


// class ExampleOne {
//     hi() {
//         alert('Hi');
//     }
// }

// class Creator<T> {
//     constructor() {

//     }
//     getNew() {
//         return new T();
//     }
// }

// let creator = new Creator<ExampleOne>();

// let example = creator.getNew();
// example.hi();


class ExampleOne {
    hi() {
        console.log('Hi');
    }
}

// interface ParameterlessConstructor<T> {
//     new(): T;
// }
type ParameterlessConstructor<T> = new() => T;

class Creator<T> {
    constructor(private ctor: ParameterlessConstructor<T>) {

    }
    getNew() {
        return new this.ctor();
    }
}

let creator = new Creator(ExampleOne);

let example = creator.getNew();
example.hi();