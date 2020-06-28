export interface Type<T> extends Function {
    new (...args: any[]): T
}

export interface TypeProvider<T> extends Type<T> {
    // 继承自 core/Type
    new (...args: any[]): T
}

export interface ValueSansProvider {
    useValue: any
}

export interface ValueProvider extends ValueSansProvider {
    provide: any
    multi?: boolean

    // 继承自 core/ValueSansProvider
    useValue: any
}

export interface ClassSansProvider {
    useClass: Type<any>
}

export interface ClassProvider extends ClassSansProvider {
    provide: any
    multi?: boolean

    // 继承自 core/ClassSansProvider
    useClass: Type<any>
}

export interface ConstructorSansProvider {
    deps?: any[]
}

export interface ConstructorProvider extends ConstructorSansProvider {
    provide: Type<any>
    multi?: boolean

    // 继承自 core/ConstructorSansProvider
    deps?: any[]
}

export interface ExistingSansProvider {
    useExisting: any
}

export interface ExistingProvider extends ExistingSansProvider {
    provide: any
    multi?: boolean

    // 继承自 core/ExistingSansProvider
    useExisting: any
}

export interface FactorySansProvider {
    useFactory: Function
    deps?: any[]
}

export interface FactoryProvider extends FactorySansProvider {
    provide: any
    multi?: boolean

    // 继承自 core/FactorySansProvider
    useFactory: Function
    deps?: any[]
}

export type Provider =  TypeProvider<any> | ValueProvider | ClassProvider | ConstructorProvider | ExistingProvider | FactoryProvider | any[];
