import {InjectBaseInterface} from "./inject-base.interface";

export interface InjectFactoryInterface<T> extends InjectBaseInterface {
    inject?: Array<string | Symbol | ObjectConstructor>,
    factory: (...args: any[]) => T
}
