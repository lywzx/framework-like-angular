import { REDUX_SERVICE } from './redux-service.decorator';
import { JsCoreObject } from '../interfaces/types';

export const REDUCER_CONSTANT = Symbol('__reducer_constant__');

export function Reducer(type: string): MethodDecorator {
  return function (target: JsCoreObject, name: string | symbol) {
    const old = Reflect.getMetadata(REDUCER_CONSTANT, target.constructor) || [];
    Reflect.defineMetadata(REDUX_SERVICE, true, target.constructor);
    Reflect.defineMetadata(
      REDUCER_CONSTANT,
      [
        ...old,
        {
          type,
          name,
        },
      ],
      target.constructor
    );
  };
}
