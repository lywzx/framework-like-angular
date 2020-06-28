import 'reflect-metadata';
import {INJECT_KEY} from "./decorator-constant";
import {isNumber} from 'lodash';

export function Inject(token?: string | ObjectConstructor | Symbol) {
    return function (target: ObjectConstructor | object, name: string, index?: number) {
        // 参数装饰器
        if (isNumber(index)) {
            const old = Reflect.getMetadata(INJECT_KEY, target, name) || [];
            Reflect.defineMetadata(INJECT_KEY, [...old, {
                use: token,
                index,
            }], target, name);
        } else if (index === undefined) {
            Reflect.defineMetadata(INJECT_KEY, {
                use: token,
            }, target.constructor, name);
            /*if (target.hasOwnProperty(name) && Reflect.deleteProperty(target, name)) {
                Object.defineProperty(target, name, description);
            }*/
        }
    }
}
