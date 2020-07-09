import 'reflect-metadata';

export const optionalKey = Symbol('optional');

export interface InjectReflectOptionalInterface {
  optional: boolean;
  index: number;
}

export function Optional<T>(target: ObjectConstructor, name: string, index: number) {
  const old: InjectReflectOptionalInterface[] = Reflect.getMetadata(optionalKey, target, name) || [];
  const newValue = [
    ...old,
    {
      optional: true,
      index,
    },
  ];
  Reflect.defineMetadata(optionalKey, newValue, target, name);
}
