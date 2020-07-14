import { TestModule } from './util';
import { Injectable, ModuleInterface } from '../src';
import { expect } from 'chai';

@Injectable()
class A {}

@Injectable()
class B {}

@Injectable()
class C {
  constructor(public a: A) {}
}
@Injectable()
class D {
  constructor(public b: B, public c: any) {}
}

describe('module test', function () {
  let testModule: ModuleInterface;

  before(() => {
    testModule = TestModule.createTestModule({
      providers: [A, C],
    });
  });

  it('#get', function () {
    const aInstance = testModule.get(A);
    expect(aInstance).to.be.instanceOf(A);
  });

  it('#get with exception', function () {
    expect(function () {
      return testModule.get(B);
    }).to.be.throw;
  });

  it('#get with child dependence', function () {
    const cInstance = testModule.get(C);

    expect(cInstance).to.be.instanceOf(C);

    expect(cInstance.a).to.be.instanceOf(A);

    expect(cInstance.a).to.be.eq(testModule.get(A));
  });

  it('#get with undefined exception', function () {
    expect(function () {
      return testModule.get(D);
    }).to.be.throw();
  });
});
