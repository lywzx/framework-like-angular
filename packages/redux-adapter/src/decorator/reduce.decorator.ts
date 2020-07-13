import { REDUX_SERVICE } from './redux-service.decorator';

export const REDUCER_CONSTANT = Symbol('__reducer_constant__');

export function Reducer(type: string) {
  return function(target: Record<string, any>, name: string) {
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
