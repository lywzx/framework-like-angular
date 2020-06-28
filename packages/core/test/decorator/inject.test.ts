import "reflect-metadata";
import {INJECT_KEY} from "../../src/decorator/decorator-constant";
import { expect } from 'chai';
import {InjectDecoratorInterface} from "../../src/interfaces/decorator.interface";
import {Inject} from "../../src/decorator";
import {it} from "mocha";

describe('Inject decorator test', function () {

    class B {}

    class A {

        @Inject('test1')
        protected b2!: B;

        constructor(@Inject('test') public b1: B) {
        }
    }

    it('inject with params', function () {
        const value: InjectDecoratorInterface[] = Reflect.getMetadata(INJECT_KEY, A);

        expect(value).length(1);

        const first = value[0];

        expect(first.use).to.be.equals('test');
    });

    it('inject with attribute', function () {
        const value = Reflect.getMetadata(INJECT_KEY, A, 'b2');

        expect(value).to.be.deep.eq({
            use: 'test1'
        });
    });

});
