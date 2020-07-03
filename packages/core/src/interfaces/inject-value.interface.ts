import {InjectBaseInterface} from "./inject-base.interface";

export interface InjectValueInterface<T = any> extends InjectBaseInterface {
    useValue: T;
}
