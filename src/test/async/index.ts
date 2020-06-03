const param = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let fn = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      // @ts-ignore
      let type = `${this.__proto__.constructor.name}/${propertyKey}`;
      fn.constructor.prototype.toString = () => "fn1";
      console.info(fn)
    fn.toString = () => "fn";
    this.toString = () => "this";
    target.toString = () => "target";
      console.log(fn)
      await fn.apply(this, args);
    };
  };
};

class A {
  @param()
  async testFN() {
    console.log("111");
  }
}

const a = new A();
a.testFN()
console.log(a.testFN.toString());
