import { TestModule } from './util';
import { Injectable } from '../src';
import { expect } from 'chai';

@Injectable()
class A {}

describe('module', function () {
  it('#get', function () {
    const testModule = TestModule.createTestModule({
      provider: [A],
    });

    const aInstance = testModule.get(A);
    expect(aInstance).to.be.instanceOf(A);
  });
});
