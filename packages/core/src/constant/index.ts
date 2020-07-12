/**
 * 模块初始化时，注册钩子
 */
export const MODULE_INIT = Symbol('__module_init');
/**
 * 当前APP
 */
export const MODULE_APP = Symbol('__module_app__');
/**
 * 获取当前组件所属模块的引用
 */
export const MODULE_REF = Symbol('__module_ref__');

/**
 * Injectable装饰器的key
 */
export const INJECTABLE_KEY = Symbol('__injectable__');

/**
 * 可选参数装饰器
 */
export const OPTIONAL_KEY = Symbol('__optional__');

/**
 * 获取当前注入配置信息的key
 */
export const INJECT_KEY = Symbol('__inject__');

/**
 * 通过这个，可以获取到当前的注入器
 */
export const INJECTOR_KEY = Symbol('__injector__');

/**
 *
 */
export const INJECT_EXISTS_MODULE_KEY = Symbol('__inject_exists_module_key__');
