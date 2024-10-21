import { SyncHook } from "tapable";
export function tap<T extends object>(
  input: T
): T & {
  hooks: {
    get: SyncHook<[string]>;
    set: SyncHook<[string]>;
    del: SyncHook<[string]>;
    has: SyncHook<[string]>;
    exe: SyncHook<[string]>;
    new: SyncHook<[string]>;
  };
} {
  const hooks = {
    get: new SyncHook(["get"]),
    set: new SyncHook(["set"]),
    del: new SyncHook(["del"]),
    has: new SyncHook(["has"]),
    exe: new SyncHook(["exe"]),
    new: new SyncHook(["new"]),
  };
  const proxy = new Proxy(input, {
    get(target, prop, ...args) {
      if (prop === "hooks") return hooks;
      return Reflect.get(target, prop, ...args);
    },
    set(target, prop, value, ...args) {
      return Reflect.set(target, prop, value, ...args);
    },
    has(target, prop, ...args) {
      return Reflect.has(target, prop, ...args);
    },
    construct(target, argArray, newTarget, ...args) {
      if (typeof target === "function") {
        return Reflect.construct(target, argArray, newTarget, ...args);
      }
    },
    deleteProperty(target, prop) {
      return Reflect.deleteProperty(target, prop);
    },
    apply(target, thisArg, args) {
      if (typeof target === "function") {
        return Reflect.apply(target, thisArg, args);
      }
    },
  });
  return proxy as any;
}
