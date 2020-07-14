import { Injector } from '../../src';
import { expect } from 'chai';

describe('injector test', function () {
  it('constructor', function () {
    const injector = new Injector();

    expect(injector).to.be.instanceOf(Injector);
  });

  it('#provides', function () {
    const injector = new Injector();

    injector.provide(
      ...[
        {
          provide: 'A',
          useValue: 'a',
        },
      ]
    );
  });
});
