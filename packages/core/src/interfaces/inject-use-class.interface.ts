import {Constructor} from "../types";
import {InjectBaseInterface} from "./inject-base.interface";

export interface InjectUseClassInterface<T> extends InjectBaseInterface {
    useClass: Constructor<T>,
}
