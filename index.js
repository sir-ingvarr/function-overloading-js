module.exports = class OverloadedFunction extends Function {
  constructor(options) {
    super();
    this.options = options;
    this.function = (...args) => {
      const argsSignature = args.map(val => typeof val).join(',') || 0;
      if(this.availableHandlers[argsSignature]) return this.availableHandlers[argsSignature].call(null, ...args);
      else throw new Error(`no available handler for ${argsSignature} arguments`);
    };

    this.function.__proto__ = this;
    this.availableHandlers = {};
    return this.function;
  }

  _canAdd(key) {
    return (key && !this.availableHandlers[key]) || this.options.rewriteOld;
  }

  _makePrimaryValidations(argsTypes, handler){
    if(!Array.isArray(argsTypes))throw new Error('first argument should be of \'array\' type');
    if(!!handler && typeof handler !== 'function') throw 'second argument should be of type \'function\' or not defined';

    return (argsTypes && argsTypes.join(",")) || 0;
  }

  overload(parameterTypes, handler) {
    try {
      let key = this._makePrimaryValidations(parameterTypes, handler);
      if(this._canAdd(key)) {
        Object.defineProperty(this.availableHandlers, key, {
          enumerable: false,
          value: handler.bind(null),          
        });
      }
    } catch (e) {
      console.error(e);
    }
    return this;
  }
}