import { OPTIONAL_KEY } from '../constant';
import { JsCoreObject } from '../interfaces';

export interface InjectReflectOptionalInterface {
  optional: boolean;
  index?: number;
}

/**
 * 可选参数装饰器
 * @param optional
 */
export function Optional<T>(optional = true): ParameterDecorator | PropertyDecorator {
  return function(target: JsCoreObject, name: string | symbol, index?: number) {
    const old: InjectReflectOptionalInterface[] = Reflect.getMetadata(OPTIONAL_KEY, target, name) || [];
    const newValue = [
      ...old,
      {
        optional,
        index,
      },
    ];
    Reflect.defineMetadata(OPTIONAL_KEY, newValue, target, name);
  };
}
