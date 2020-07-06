export interface InjectConstructorInterface<T extends Record<string, unknown>> {
  new (...args: any[]): T;
}
