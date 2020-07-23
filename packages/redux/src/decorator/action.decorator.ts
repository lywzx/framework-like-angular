import { REDUX_SERVICE } from './redux-service.decorator';

export const ACTION_CONSTANT = Symbol('__action__constant__');

export function Action(type: string | symbol) {
  return function (target: Record<string, any>, name: string) {
    const old = Reflect.getMetadata(ACTION_CONSTANT, target.constructor) || [];
    Reflect.defineMetadata(REDUX_SERVICE, true, target.constructor);
    Reflect.defineMetadata(
      ACTION_CONSTANT,
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
