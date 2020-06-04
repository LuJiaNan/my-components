import 'reflect-metadata'
import { inject, injectable, Container } from 'inversify'

const container = new Container()

@injectable()
class A {
  getName() {
    return 'A'
  }
}
container.bind('request1').to(A)

@injectable()
class B {
  getName() {
    return 'B'
  }
}
container.bind('request2').to(B)

@injectable()
class AB {
  pm: any
  cm: any
  constructor(
    @inject('request1') a: any,
    @inject('request2') b: any) {
    this.pm = a
    this.cm = b
  }

  getName() {
    const result = this.pm.getName() + this.cm.getName()
    return result
  }
}
container.bind('Plan').to(AB)

const ab: any = container.get('Plan')
console.log(ab.getName()) // AB